# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**개인 개발 블로그**: Notion을 CMS로 사용해 Notion에서 글을 쓰면 자동 반영되는 개인 기술 블로그입니다. `claude-nextjs-starters` 템플릿을 정리해 만든 프로젝트이며, 홈·글 상세·카테고리 목록까지 구현되어 있고 현재 배포 준비 단계입니다.

📋 요구사항은 `@/docs/PRD.md`, 단계별 작업과 진행 상태는 `@/docs/ROADMAP.md`를 따릅니다. 작업을 시작하기 전에 ROADMAP에서 현재 Task와 "결정 필요" 항목을 확인하세요.

## 명령어

```bash
npm run dev          # 개발 서버 (Turbopack)
npm run build        # 프로덕션 빌드 (Turbopack)
npm run check-all    # typecheck + lint + format:check (작업 완료 전 필수)
npm run typecheck    # tsc --noEmit
npm run lint:fix     # ESLint 자동 수정
npm run format       # Prettier 자동 포맷
npx shadcn@latest add <component>   # shadcn/ui 컴포넌트 추가
```

- **테스트 러너가 없습니다.** 검증은 `check-all`, `build`, Playwright MCP(`.mcp.json`) 수동 확인으로 합니다.
- `check-all`에는 `build`가 포함되지 않으므로 완료 전 `npm run build`도 따로 실행합니다.
- 커밋 시 Husky가 `lint-staged`(ESLint --fix, Prettier)를 실행합니다.

## 아키텍처

- 레이아웃: `src/app/layout.tsx`(ThemeProvider, Toaster, `lang="ko"`, title 템플릿) → `components/layout/{header,footer,container}` + `components/navigation/*`.
- 페이지: 홈 `src/app/page.tsx`(게시됨 글 목록, ISR 60초), 글 상세 `src/app/posts/[id]/page.tsx`(동적 렌더링, 없는 글·초안은 `notFound()`), 카테고리 `src/app/category/[name]/page.tsx`(ISR 60초, 없는 카테고리는 200 + 빈 상태). `loading/error/not-found.tsx`가 공통 상태 화면입니다.
- **Notion 연동**은 `src/lib/notion/{client,mapper,posts}.ts`(모두 `server-only`)와 `src/lib/schemas/post.ts`(Zod 스키마)에 있습니다. API 2025-09-03의 data source 모델을 쓰므로 `databases.query`가 아니라 `databases.retrieve` → `dataSources.query` 순서입니다. Notion 호출은 서버에서만 하고 API 키가 클라이언트 번들에 들어가면 안 됩니다.
- Status 값은 `초안` / `게시됨` 두 가지이며 필터는 `Status = 게시됨`입니다. 상태 용어는 이 두 가지로만 통일하고 다른 표현으로 바꿔 쓰지 않습니다(날짜 속성 `Published`는 별개).
- **`src/lib/env.ts`**: `NOTION_API_KEY`, `NOTION_DATABASE_ID`를 Zod로 검증하며, **값이 없으면 import 시점에 throw**합니다. 서버 전용 모듈에서만 import하세요. 저장소에 `.env.example`은 없으므로 `.env.local`을 직접 만들어 두 값을 넣습니다(gitignore 대상).
- 본문은 `notion-to-md`로 Markdown 문자열을 만들고 `components/posts/post-body.tsx`(react-markdown + remark-gfm + rehype-pretty-code/shiki, 원시 HTML 미허용)로 렌더링합니다. 본문 이미지는 Notion S3 URL(1시간 만료)이라 상세를 동적 렌더링하고 `next.config.ts`의 `remotePatterns`에 등록했습니다. 결정 이력은 ROADMAP D-1~D-5를 보세요.
- `src/components/ui/*`는 shadcn/ui 생성 코드입니다(일부는 아직 쓰이지 않지만 향후 사용 가능성이 있어 보존, 미사용 의존성 정리 결과는 ROADMAP 5단계 참고). 직접 수정보다 `shadcn add`로 추가·갱신합니다.
- 경로 별칭은 `@/*` → `src/*` 입니다.

## 저장소 환경 (비자명한 점)

- Git 루트는 상위 폴더 `claude-study`이고 이 프로젝트는 그 하위 `invoice-web/` 입니다. git 명령의 경로는 이를 고려하세요.
- Windows 환경이며 `.prettierrc`가 `endOfLine: lf` 입니다. `.gitattributes`(`eol=lf`)로 줄바꿈을 LF로 통일하므로, CRLF 파일이 있으면 `format:check`가 실패합니다.
- `.claude/hooks/*.sh`는 `.env`의 Slack 웹훅을 읽는 알림 훅용 스크립트입니다. `settings.local.json`은 gitignore 대상이며 Stop 훅은 제거된 상태입니다.
- 커밋 메시지는 `<이모지> <타입>: <설명>` 한국어 컨벤션을 따르고, Claude 서명은 넣지 않습니다(`/git:commit` 참조).

## 📚 개발 가이드

- **🗺️ 개발 로드맵**: `@/docs/ROADMAP.md`
- **📋 프로젝트 요구사항**: `@/docs/PRD.md`
- **📁 프로젝트 구조**: `@/docs/guides/project-structure.md`
- **🎨 스타일링 가이드**: `@/docs/guides/styling-guide.md`
- **🧩 컴포넌트 패턴**: `@/docs/guides/component-patterns.md`
- **⚡ Next.js 15.5.3 전문 가이드**: `@/docs/guides/nextjs-15.md`
- **📝 폼 처리 완전 가이드**: `@/docs/guides/forms-react-hook-form.md`

💡 **상세 규칙은 위 개발 가이드 문서들을 참조하세요**
