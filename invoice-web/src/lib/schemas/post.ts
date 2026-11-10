import { z } from 'zod'

// 글 상태: Notion DB의 Status 옵션(초안/게시됨)과 일치
export const postStatusSchema = z.enum(['초안', '게시됨'])

// 글 목록용 요약 스키마 (slug 없음, 상세 경로는 id 기반)
export const postSummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  published: z.string(), // ISO 날짜 문자열
  status: postStatusSchema,
})

// 글 상세 스키마: 요약 + Markdown 본문
export const postDetailSchema = postSummarySchema.extend({
  content: z.string(),
})

export type PostStatus = z.infer<typeof postStatusSchema>
export type PostSummary = z.infer<typeof postSummarySchema>
export type PostDetail = z.infer<typeof postDetailSchema>
