import 'server-only'

import { isFullPage } from '@notionhq/client'

import { postSummarySchema, type PostSummary } from '@/lib/schemas/post'

// Notion 조회 결과(페이지 또는 부분 객체)를 모두 받을 수 있는 입력 타입
type NotionObject = Parameters<typeof isFullPage>[0]
type PageProperties = Extract<
  NotionObject,
  { object: 'page'; properties: unknown }
>['properties']

// 속성 이름으로 값을 안전하게 꺼내는 헬퍼들 (타입이 다르거나 비어 있으면 undefined/[])
function getTitle(props: PageProperties): string | undefined {
  const prop = props['Title']
  if (prop?.type !== 'title') return undefined
  const text = prop.title.map(item => item.plain_text).join('')
  return text || undefined
}

function getSelect(props: PageProperties, name: string): string | undefined {
  const prop = props[name]
  return prop?.type === 'select' ? prop.select?.name : undefined
}

function getMultiSelect(props: PageProperties, name: string): string[] {
  const prop = props[name]
  return prop?.type === 'multi_select'
    ? prop.multi_select.map(option => option.name)
    : []
}

function getDateStart(props: PageProperties, name: string): string | undefined {
  const prop = props[name]
  return prop?.type === 'date' ? (prop.date?.start ?? undefined) : undefined
}

/**
 * Notion 페이지를 PostSummary로 변환한다.
 * 전체 페이지가 아니거나 스키마 검증에 실패하면 null을 반환하고 서버 로그에 경고를 남긴다.
 */
export function mapPageToSummary(page: NotionObject): PostSummary | null {
  if (!isFullPage(page)) {
    console.warn(`[notion] 전체 페이지 객체가 아니어서 건너뜁니다: ${page.id}`)
    return null
  }

  const props = page.properties
  const result = postSummarySchema.safeParse({
    id: page.id,
    title: getTitle(props),
    category: getSelect(props, 'Category'),
    tags: getMultiSelect(props, 'Tags'),
    published: getDateStart(props, 'Published'),
    status: getSelect(props, 'Status'),
  })

  if (!result.success) {
    // 값 자체는 로그에 남기지 않고 실패한 필드 경로와 사유만 요약한다
    const reason = result.error.issues
      .map(issue => `${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('; ')
    console.warn(`[notion] 글 변환 실패 (id: ${page.id}) - ${reason}`)
    return null
  }

  return result.data
}

// 여러 페이지를 변환하고 변환에 실패한 항목(null)은 제외한다
export function mapPagesToSummaries(pages: NotionObject[]): PostSummary[] {
  return pages.flatMap(page => {
    const summary = mapPageToSummary(page)
    return summary ? [summary] : []
  })
}
