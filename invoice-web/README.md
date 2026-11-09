# 개발 블로그

Notion에서 글을 쓰면 자동으로 반영되는 개인 기술 블로그입니다. 별도 관리자 화면이나 DB 없이 Notion을 CMS로 사용합니다.

## 🎯 프로젝트 개요

**목적**: Notion 작성 → 블로그 반영을 자동화해 글 작성과 발행 부담을 줄인다.
**범위**: 글 목록, 글 상세, 반응형/다크모드 UI (MVP). 카테고리 필터링과 검색은 MVP 이후.
**사용자**: 작성자(Notion에서 글을 쓰는 블로그 주인), 독자(링크/검색으로 방문하는 개발자)

## 📱 주요 페이지

1. **홈** (`/`) - 최근 글 목록 (제목, 카테고리, 태그, 발행일)
2. **글 상세** (`/posts/[id]`) - 제목, 메타 정보, 본문
3. **카테고리** (`/category/[name]`) - 카테고리별 글 목록 (MVP 이후, 확인 필요)

## ⚡ 핵심 기능

- Notion 연동: `@notionhq/client`로 서버 사이드에서 DB 조회 (API 키는 환경 변수)
- 글 목록: `Status = 발행됨` 글을 `Published` 최신순으로 표시
- 글 상세: 제목, 카테고리, 태그, 발행일, 본문 표시, 없는 글은 404
- 반응형 디자인 및 다크모드 지원

## 🛠️ 기술 스택

- Framework: Next.js 15.5.3 (App Router + Turbopack)
- Runtime: React 19.1.0
- Language: TypeScript 5
- Styling: TailwindCSS v4 + shadcn/ui
- CMS: Notion API
- Validation: Zod
- Icons: Lucide React
- Deployment: Vercel

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local   # NOTION_API_KEY, NOTION_DATABASE_ID 입력

# 개발 서버 실행
npm run dev

# 검사 / 빌드
npm run check-all
npm run build
```

## 📋 개발 상태

- ✅ 스타터킷 정리 및 기본 레이아웃/테마 구성
- ⏳ Notion API 연동 (`@notionhq/client` 설치, 환경 설정)
- ⏳ 글 목록 / 글 상세 페이지
- ⏳ 스타일링 및 최적화

## 📖 문서

- [PRD 문서](./docs/PRD.md) - 상세 요구사항
- [개발 가이드](./CLAUDE.md) - 개발 지침
