# Development Guidelines

## 프로젝트 개요

- Notion을 CMS로 쓰는 개인 기술 블로그. 스택: Next.js 15.5.3 App Router, React 19, TypeScript 5, TailwindCSS v4, shadcn/ui, Zod 4.
- 현재 구현 범위: 레이아웃 골격(`layout.tsx`, `components/layout`, `components/navigation`)과 홈 자리표시뿐. Notion 연동 코드는 없다.
- 계획 패키지: `@notionhq/client`, `notion-to-md`, `server-only` (**미설치**, 사용 전 `npm i`로 설치).
- 사용자 대상 문구, 문서, 커밋 메시지는 **한국어**로 작성한다.

## 작업 시작 전 필수 확인

- **MUST** `docs/ROADMAP.md`에서 현재 단계와 "결정 현황" 표를 먼저 확인한다.
- **MUST** 요구사항은 `docs/PRD.md`를 기준으로 한다. PRD와 충돌하는 구현을 하지 않는다.
- 확정된 결정(변경 금지): D-1 카테고리 MVP 포함 / D-2 글 상세 경로는 Notion `id` / D-3 본문은 `notion-to-md` + Markdown 렌더러.
- **D-4(캐싱/재검증 주기)는 미결정.** 임의로 정하지 않는다. `revalidate`, `revalidateTag`, `dynamic`, `fetch` 캐시 옵션을 추가해야 하면 사용자에게 결정을 요청한다.

## 디렉터리와 파일 규칙

| 경로                                      | 규칙                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------ |
| `src/app/posts/[id]/page.tsx`             | 글 상세. `params: Promise<{ id: string }>` 형태(Next.js 15)              |
| `src/app/category/[name]/page.tsx`        | 카테고리 목록. 한글 이름은 `decodeURIComponent` 처리                     |
| `src/lib/env.ts`                          | Zod 환경 변수 검증. 값이 없으면 import 시점에 throw                      |
| `src/lib/notion/{client,posts,mapper}.ts` | Notion 전용 서버 모듈 (모두 `import 'server-only'`)                      |
| `src/lib/schemas/post.ts`                 | `PostSummary`, `PostDetail` 타입과 Zod 스키마. slug 필드를 만들지 않는다 |
| `src/components/posts/*`                  | 글 카드·메타·목록·본문·빈 상태 컴포넌트                                  |
| `src/components/ui/*`                     | shadcn/ui 생성 코드                                                      |

- 경로 별칭은 `@/*` → `src/*`. 상대 경로 대신 별칭을 쓴다.
- 파일명은 kebab-case, 컴포넌트는 PascalCase 이름으로 export한다.
- 이 프로젝트의 git 루트는 상위 폴더 `claude-study`다. git 명령의 경로에 `invoice-web/` 접두사를 고려한다.

## Notion / 서버 전용 규칙

- **MUST** Notion 호출은 Server Component 또는 서버 전용 모듈에서만 한다.
- **MUST** `@/lib/env`는 서버 전용 모듈에서만 import한다. 클라이언트 컴포넌트(`'use client'`)에서 import하면 안 된다.
- **MUST** `NOTION_API_KEY`에 `NEXT_PUBLIC_` 접두사를 붙이지 않는다.
- **MUST** `src/lib/notion/*` 파일 첫 줄에 `import 'server-only'`를 둔다.
- 초안 글(`Status !== 게시됨`)은 목록과 상세 모두에서 제외한다. 초안/없는 글 ID는 `notFound()`로 처리한다.
- Zod 검증에 실패한 Notion 글은 결과에서 제외하고 서버 로그에 경고를 남긴다.
- 설치된 `@notionhq/client` 버전의 DB 조회 API(`databases.query` vs `dataSources.query`)를 확인한 뒤 코드를 작성하고, ROADMAP 1단계 항목에 결과를 기록한다.

## shadcn/ui 규칙

- `src/components/ui/*`는 직접 수정하지 않는다. 추가·갱신은 `npx shadcn@latest add <component>`로 한다.
- 사용하지 않는 ui 컴포넌트(`form`, `checkbox`, `dialog` 등)도 **삭제하지 않는다**(의도적 보존). 정리는 ROADMAP 5단계 작업으로만 한다.
- 새 UI는 기존 `Card`, `Badge`, `Skeleton`을 우선 재사용한다.

## 코드 스타일

- Prettier 설정을 따른다: 세미콜론 없음, 작은따옴표, 2칸 들여쓰기, `printWidth: 80`, `trailingComma: es5`, `arrowParens: avoid`, **`endOfLine: lf`**.
- 파일은 반드시 LF 줄바꿈으로 저장한다. CRLF가 있으면 `format:check`가 실패한다.
- Tailwind 클래스 정렬은 `prettier-plugin-tailwindcss`에 맡긴다. 수동 정렬하지 않는다.
- 기본은 Server Component. 상태·이벤트가 필요할 때만 `'use client'`를 쓰고 범위를 작게 유지한다.

## 문서 연동 규칙

- 단계 작업을 끝내면 **MUST** `docs/ROADMAP.md`의 체크박스와 단계 상태(✅/🔄/⏳)를 함께 갱신한다.
- 새 결정이 생기면 ROADMAP "결정 현황" 표에 행을 추가한다.
- 라우트·폴더 구조를 바꾸면 `CLAUDE.md`의 "아키텍처" 절도 함께 갱신한다.
- `docs/guides/project-structure.md`는 삭제된 스타터 구조(`login/`, `signup/`, `sections/`, `login-form.tsx`)를 설명하는 **낡은 문서**다. 현재 구조의 근거로 쓰지 말고, 구조를 바꿀 때 함께 정정한다.

## 검증 워크플로

1. 작업 후 `npm run check-all`(typecheck + lint + format:check)을 실행한다.
2. `check-all`에는 build가 없으므로 `npm run build`도 따로 실행한다.
3. 화면 동작은 Playwright MCP(`.mcp.json`)로 수동 확인한다. **테스트 러너는 없다**: Jest/Vitest를 임의로 추가하지 않는다.
4. 서버 전용 규칙 검증: 빌드 후 `.next/static`에서 `NOTION_API_KEY` 값이 검색되지 않아야 한다.

## 커밋 규칙

- 형식: `<이모지> <타입>: <설명>` (한국어). 예: `✨ feat: 홈 글 목록 구현`, `📝 docs: ROADMAP 1단계 갱신`.
- 사용자 승인 없이 커밋하지 않는다. 단계 작업은 검증 후 커밋, 개별 수정은 승인 후 커밋한다.
- `.env.local`, `.env`는 커밋하지 않는다. `git status`에 나타나면 중단한다.
- 커밋은 Husky + `lint-staged`(ESLint --fix, Prettier)를 통과해야 한다. `--no-verify`를 쓰지 않는다.

## AI 의사결정 기준

- 요구사항이 모호하면: PRD → ROADMAP → CLAUDE.md 순으로 확인하고, 그래도 불명확하면 사용자에게 묻는다.
- 새 의존성이 필요하면: ROADMAP에 명시된 패키지인지 확인 → 아니면 사용자 승인 후 추가한다. Markdown 렌더러 패키지는 미정이므로 선택 근거(React 19 호환)를 기록한다.
- 앞 단계 완료 기준이 충족되지 않았으면 다음 단계 작업을 시작하지 않는다.

## 금지 사항

- ❌ 클라이언트 컴포넌트에서 `@/lib/env`, `@/lib/notion/*`, `@notionhq/client` import
- ❌ API 키·DB ID를 코드, 문서, 로그, 커밋에 하드코딩
- ❌ slug 필드 추가, `/posts/[slug]` 경로 사용 (D-2 위반)
- ❌ D-4 결정 전 캐시/재검증 주기 임의 확정
- ❌ `src/components/ui/*` 직접 수정 또는 미사용 컴포넌트 삭제
- ❌ 스타터킷의 로그인/회원가입/랜딩 코드 복원
- ❌ `check-all`·`build` 실행 없이 작업 완료 선언
- ❌ Claude 서명(Co-Authored-By 등)을 커밋 메시지에 추가 — 이 프로젝트 규칙이 우선한다
