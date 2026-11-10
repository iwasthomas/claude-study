import 'server-only'

import { Client } from '@notionhq/client'

import { env } from '@/lib/env'

// 서버 전용 Notion 클라이언트 (API 키가 클라이언트 번들에 포함되지 않도록 server-only 사용)
export const notion = new Client({ auth: env.NOTION_API_KEY })
