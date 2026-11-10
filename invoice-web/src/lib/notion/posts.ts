import 'server-only'

import { APIErrorCode, APIResponseError, isFullPage } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

import { env } from '@/lib/env'
import { notion } from '@/lib/notion/client'
import { toPlainMarkdown } from '@/lib/notion/markdown'
import { mapPageToSummary, mapPagesToSummaries } from '@/lib/notion/mapper'
import type { PostDetail, PostSummary } from '@/lib/schemas/post'

// select 속성 equals 필터 한 건
type SelectEqualsFilter = {
  property: string
  select: { equals: string }
}

// 공개 대상 글의 Status 값 (PRD 6절)
const PUBLISHED_STATUS = '게시됨'

// 한국 시간(KST) 기준 오늘 날짜 (YYYY-MM-DD). 발행일이 오늘 이전인 글만 공개한다 (미래 날짜 글은 예약 게시로 숨김)
function todayInSeoul(): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul' }).format(
    new Date()
  )
}

// 하이픈 유무·대소문자 차이를 무시하고 Notion ID를 비교하기 위한 정규화
function normalizeId(id: string): string {
  return id.replace(/-/g, '').toLowerCase()
}

// data source ID 메모 (프로세스 단위 캐시, 실패 시에는 저장하지 않음)
let dataSourceIdPromise: Promise<string> | null = null

function getDataSourceId(): Promise<string> {
  if (!dataSourceIdPromise) {
    dataSourceIdPromise = notion.databases
      .retrieve({ database_id: env.NOTION_DATABASE_ID })
      .then(database => {
        if (!('data_sources' in database) || !database.data_sources[0]) {
          throw new Error(
            '[notion] 데이터베이스에서 data source를 찾지 못했습니다.'
          )
        }
        return database.data_sources[0].id
      })
      .catch(error => {
        dataSourceIdPromise = null
        throw error
      })
  }
  return dataSourceIdPromise
}

// 게시됨 글을 발행일 내림차순으로 조회하는 공통 헬퍼 (추가 필터는 AND 결합)
async function queryPublishedPosts(
  extraFilters: SelectEqualsFilter[] = []
): Promise<PostSummary[]> {
  const dataSourceId = await getDataSourceId()
  const filter = {
    and: [
      { property: 'Status', select: { equals: PUBLISHED_STATUS } },
      { property: 'Published', date: { on_or_before: todayInSeoul() } },
      ...extraFilters,
    ],
  }

  const pages = []
  let cursor: string | undefined
  do {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter,
      sorts: [{ property: 'Published', direction: 'descending' }],
      start_cursor: cursor,
    })
    pages.push(...response.results)
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
  } while (cursor)

  return mapPagesToSummaries(pages)
}

// 게시됨 글 전체 목록 (발행일 내림차순)
export async function getPublishedPosts(): Promise<PostSummary[]> {
  return queryPublishedPosts()
}

// 카테고리별 게시됨 글 목록 (발행일 내림차순)
// Notion은 존재하지 않는 select 옵션으로 필터하면 400(validation_error)을 반환하므로 빈 목록으로 처리한다
export async function getPostsByCategory(
  category: string
): Promise<PostSummary[]> {
  try {
    return await queryPublishedPosts([
      { property: 'Category', select: { equals: category } },
    ])
  } catch (error) {
    if (
      APIResponseError.isAPIResponseError(error) &&
      error.code === APIErrorCode.ValidationError
    ) {
      return []
    }
    throw error
  }
}

// 없는 글/잘못된 id 형식에 해당하는 Notion 오류인지 판별 (그 외 오류는 호출자에게 전파)
function isNotFoundLikeError(error: unknown): boolean {
  return (
    APIResponseError.isAPIResponseError(error) &&
    (error.code === APIErrorCode.ObjectNotFound ||
      error.code === APIErrorCode.ValidationError ||
      error.code === APIErrorCode.InvalidRequestURL)
  )
}

/**
 * id로 글 상세를 조회한다. 없는 글, 초안, 이 블로그 DB에 속하지 않는 페이지는 null.
 * 인증 실패·네트워크·rate limit 등 그 외 오류는 throw한다.
 */
export async function getPostById(id: string): Promise<PostDetail | null> {
  let page
  try {
    page = await notion.pages.retrieve({ page_id: id })
  } catch (error) {
    if (isNotFoundLikeError(error)) return null
    throw error
  }

  if (!isFullPage(page)) return null

  // 워크스페이스의 다른 페이지가 노출되지 않도록 부모가 이 블로그 DB인지 확인
  const dataSourceId = await getDataSourceId()
  const parent = page.parent
  const belongsToBlog =
    (parent.type === 'data_source_id' &&
      normalizeId(parent.data_source_id) === normalizeId(dataSourceId)) ||
    (parent.type === 'database_id' &&
      normalizeId(parent.database_id) === normalizeId(env.NOTION_DATABASE_ID))
  if (!belongsToBlog) return null

  const summary = mapPageToSummary(page)
  if (!summary || summary.status !== PUBLISHED_STATUS) return null
  // 미래 날짜 글은 직접 URL로도 접근할 수 없다 (YYYY-MM-DD 문자열은 사전순 비교로 날짜 비교 가능)
  if (summary.published.slice(0, 10) > todayInSeoul()) return null

  // 하위 블록과 100개 초과 블록 페이지네이션은 notion-to-md가 처리한다
  const n2m = new NotionToMarkdown({ notionClient: notion })
  const mdBlocks = await n2m.pageToMarkdown(page.id)
  const content = toPlainMarkdown(n2m.toMarkdownString(mdBlocks).parent ?? '')

  return { ...summary, content }
}
