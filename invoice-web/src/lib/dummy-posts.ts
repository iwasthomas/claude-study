import type { PostSummary } from '@/lib/schemas/post'

// 더미 글 목록 (Notion 연동 전 UI 확인용)
export const dummyPosts: PostSummary[] = [
  {
    id: 'dummy-1',
    title: 'Next.js 15 App Router로 개인 블로그 만들기',
    category: 'Next.js',
    tags: ['nextjs', 'app-router', 'typescript'],
    published: '2026-11-08',
    status: '게시됨',
  },
  {
    id: 'dummy-2',
    title: 'Tailwind CSS v4 달라진 점 정리',
    category: 'CSS',
    tags: ['tailwind'],
    published: '2026-10-21',
    status: '게시됨',
  },
  {
    id: 'dummy-3',
    title:
      'Notion을 CMS로 사용하면서 마주친 수많은 문제들과 그것을 하나씩 해결해 나간 아주아주 긴 기록: 블록 변환, 이미지 만료, 캐싱 전략까지 한 번에 정리하기',
    category: 'Notion',
    tags: ['notion', 'cms', 'isr', 'caching'],
    published: '2026-09-30',
    status: '게시됨',
  },
  {
    id: 'dummy-4',
    title: 'TypeScript 유틸리티 타입 치트시트',
    category: 'Next.js',
    tags: [],
    published: '2026-09-02',
    status: '게시됨',
  },
  {
    id: 'dummy-5',
    title: 'shadcn/ui 다크모드 색상 토큰 다루기 (작성 중)',
    category: 'CSS',
    tags: ['shadcn', 'dark-mode'],
    published: '2026-08-15',
    status: '초안',
  },
  {
    id: 'dummy-6',
    title: 'Vercel 배포 체크리스트',
    category: 'Notion',
    tags: ['vercel', 'deploy'],
    published: '2026-07-04',
    status: '초안',
  },
]
