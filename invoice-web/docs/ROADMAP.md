# 개인 개발 블로그 개발 로드맵

Notion에서 `Status`를 `게시됨`으로 바꾸기만 하면 코드 수정·재배포 없이 글이 반영되는 개인 기술 블로그.

- 참조 문서: `docs/PRD.md`(요구사항), `CLAUDE.md`(스택·명령어), `docs/guides/*`(구조·패턴)
- 기술 스택: Next.js 15.5.3 App Router, React 19, TypeScript 5, TailwindCSS v4, shadcn/ui, Zod, `@notionhq/client`, `notion-to-md`, Vercel
- 소요 시간은 1인 개발 기준 **추정치**이며, 실제 Notion 데이터와 연동하며 달라질 수 있다.

## 개발 순서 한눈에 보기

| 단계 | 이름           | 한 줄 요약                                       | 예상 소요 | 상태    |
| ---- | -------------- | ------------------------------------------------ | --------- | ------- |
| 1    | 프로젝트 골격  | 구조·환경 설정·외부 서비스(Notion) 준비          | 0.5~1일   | ✅ 완료 |
| 2    | 공통 모듈      | 타입·Notion 클라이언트·데이터 계층·공통 UI       | 2~3일     | ✅ 완료 |
| 3    | 핵심 기능      | 글 목록(홈) + 글 상세 (블로그의 존재 이유)       | 1~2일     | ⏳ 대기 |
| 4    | 추가 기능      | 카테고리 필터링 (MVP 포함 확정), 검색은 MVP 이후 | 1~1.5일   | ⏳ 대기 |
| 5    | 최적화 및 배포 | 반응형·다크모드 점검, 본문 스타일, 성능, Vercel  | 1~2일     | ⏳ 대기 |

> 합계 약 **5.5~9.5일**. 단계는 위에서 아래로 진행하고, 앞 단계의 완료 기준을 만족해야 다음 단계를 시작한다.

## 결정 현황 (PRD 13절)

| ID  | 결정 사항                               | 상태                                                    | 결정 시점 |
| --- | --------------------------------------- | ------------------------------------------------------- | --------- |
| D-1 | 카테고리 필터링(FR-006)의 MVP 포함 여부 | ✅ **MVP에 포함**                                       | 완료      |
| D-2 | 글 상세 경로 식별자                     | ✅ **Notion `id` 사용** (Slug 속성 없음)                | 완료      |
| D-3 | 본문 블록 렌더링 방식                   | ✅ **`notion-to-md` + Markdown 렌더러** (렌더러는 D-5)  | 완료      |
| D-4 | 캐싱/재검증 주기                        | ✅ **목록 ISR 5분 + 글 상세 동적 렌더링**               | 완료      |
| D-5 | Markdown 렌더러 패키지                  | ✅ **react-markdown + remark-gfm + rehype-pretty-code** | 완료      |

**D-4 근거**: Notion 호스팅 이미지 URL은 S3 서명 URL(`X-Amz-Expires=3600`)이라 1시간 뒤 만료된다. 시간 기반 캐시는 방문이 뜸하면 만료된 URL이 담긴 캐시를 첫 방문자에게 먼저 보여 줄 수 있으므로, 이미지가 없는 목록(홈·카테고리)만 `revalidate = 300`으로 캐시하고 이미지가 있는 글 상세는 요청마다 Notion을 조회한다. 게시 후 목록 반영은 최대 5분이다.

**D-5 근거**: `react-markdown` 10.1.0은 React 19(`react >=18`)와 호환된다. 코드 하이라이트는 `rehype-pretty-code`(shiki)로 서버에서 처리해 클라이언트 JS를 늘리지 않고, 라이트/다크 듀얼 테마로 다크모드(FR-005)를 맞춘다. `notion-to-md`가 코드 펜스 언어를 `plain text`(공백 포함)로 내보내므로 렌더러에서 언어 정규화가 필요하고, 이미지 alt는 캡션이 없으면 URL 인코딩된 파일명이 나오므로 디코딩하거나 비운다.

---

## 1단계: 프로젝트 골격 (구조, 환경 설정)

**예상 소요**: 0.5~1일

### 왜 이 순서인가?

모든 코드는 실행 환경 위에서 동작한다. 라우트 구조와 환경 변수, Notion 데이터베이스·API 키가 먼저 있어야 이후 단계의 코드를 **실제로 실행하고 검증**할 수 있다. 특히 Notion DB 준비는 사람이 직접 해야 하는 수동 작업이라 가장 먼저 시작해야 뒤에서 막히지 않는다.

### 작업

- [x] 스타터킷 정리: 로그인/회원가입/랜딩 제거, 홈 자리표시 교체, `src/lib/env.ts`(Notion 환경 변수 스키마), `.env.example` 추가
- [x] D-1(카테고리 MVP 포함), D-2(`id` 사용), D-3(`notion-to-md` + Markdown 렌더러) 결정
- [x] 패키지 설치: `@notionhq/client`, `notion-to-md`, `server-only` (설치 버전의 DB 조회 API가 `databases.query`인지 `dataSources.query`인지 확인해 기록)
  - 설치 버전: `@notionhq/client` 5.31.1, `notion-to-md` 3.1.9. `Client.d.ts` 기준 `databases`에는 `query`가 없고 **`dataSources.query({ data_source_id, ... })`로 조회**한다 (`databases.retrieve`로 data source ID 확인 필요)
- [x] 라우트 골격: `src/app/posts/[id]/page.tsx`, `src/app/category/[name]/page.tsx`, `not-found.tsx`, `error.tsx`, `loading.tsx` (Next.js 15 규칙 `params: Promise<...>`)
- [x] Notion DB 생성(작성자 수동): `Title, Category, Tags, Published, Status(초안/게시됨)` 속성, Integration 생성 후 DB에 연결
- [x] `.env.local`에 `NOTION_API_KEY`, `NOTION_DATABASE_ID` 입력 (커밋 금지, `.gitignore` 확인)
- [x] 테스트용 글 3개 이상 작성: 게시됨 2개(발행일·카테고리 상이, 문단/제목/코드/목록/이미지 포함), 초안 1개

### 완료 기준

- [x] `npm run check-all`, `npm run build` 통과
- [x] `npm run dev`로 `/`, `/posts/임의값`, `/category/임의값`, 존재하지 않는 경로(404)가 헤더·푸터 레이아웃 안에서 열림
- [x] Notion Integration으로 DB 조회가 가능한 상태 (키·DB ID 유효)
- [x] `git status`에 `.env.local`이 나타나지 않음

---

## 2단계: 공통 모듈 (모든 기능에서 쓰는 것들)

**예상 소요**: 2~3일

### 왜 이 순서인가?

목록·상세·카테고리는 모두 **같은 글 데이터와 같은 카드·메타 UI**를 쓴다. 데이터 타입, Notion 클라이언트, 데이터 계층, 공통 컴포넌트를 먼저 만들어 두면 3·4단계 기능은 이를 **조합만** 하면 되고, 같은 코드를 기능마다 복사하거나 나중에 뜯어고치는 일을 막는다. 데이터 계층 인터페이스를 먼저 고정하면 UI는 더미 데이터로 먼저 만들 수 있어 Notion 연동과 병렬로 진행할 수 있다.

### 작업

**데이터 모듈**

- [x] 도메인 타입·Zod 스키마: `src/lib/schemas/post.ts` (`id, title, category, tags, published, status`, slug 필드 없음), `PostSummary`(목록)·`PostDetail`(본문은 Markdown 문자열) 구분
- [x] 서버 전용 Notion 클라이언트: `src/lib/notion/client.ts` (`import 'server-only'` + `env` 사용)
- [x] 데이터 계층: `src/lib/notion/posts.ts` — `getPublishedPosts`(게시됨 필터 + 발행일 내림차순 + `has_more` 페이지네이션), `getPostById`(초안·없는 글은 `null`), `getPostsByCategory`
- [x] 응답 변환·검증: `src/lib/notion/mapper.ts` (Zod 검증 실패 글은 제외하고 서버 로그에 경고)
- [x] 본문 변환: `notion-to-md`로 블록을 Markdown으로 변환 (하위 블록·페이지네이션 포함)
- [x] **D-4 결정**: 목록 ISR 5분 + 글 상세 동적 렌더링 (Notion 이미지 URL 1시간 만료 근거, 위 결정 현황 참고). 실제 적용은 3단계 홈·상세 구현 때 `revalidate`/`dynamic` 설정으로 한다

**공통 UI 모듈**

- [x] 더미 데이터: `src/lib/dummy-posts.ts` (타입 만족, 초안 포함) — Notion 연동 전 UI 확인용
- [x] 글 카드·메타·목록·빈 상태: `src/components/posts/{post-card,post-meta,post-list,empty-state}.tsx` (기존 shadcn `Card`, `Badge`, `Skeleton` 재사용, 발행일 표기 통일)
- [x] 본문 렌더러: `src/components/posts/post-body.tsx` — Markdown 렌더러 패키지 선정(설치 시점의 최신 버전과 React 19 호환 확인), 코드 블록 하이라이트·미지원 블록 처리 방침 기록. 코드는 서버에서 shiki(rehype-pretty-code, github-light/dark 듀얼 테마)로 하이라이트하고 `plain text`·미지원 언어는 `text`로 정규화한다. 원시 HTML은 비허용이라 콜아웃·토글·임베드 등 Markdown으로 표현되지 않는 블록은 일반 텍스트로 나오거나 생략된다

### 완료 기준

- [x] `npm run check-all`, `npm run build` 통과
- [x] 데이터 계층 호출 시 초안 글이 제외되고 발행일 내림차순으로 반환됨 (임시 서버 코드 또는 로그로 확인)
- [x] 모든 Notion 접근 코드가 `server-only`이고 클라이언트 컴포넌트에서 import되지 않음
- [x] 더미 데이터로 카드·빈 상태·Skeleton·본문(Markdown) 컴포넌트가 화면에 정상 표시됨
- [x] D-4 결정과 근거가 이 문서에 기록됨

---

## 3단계: 핵심 기능 (가장 중요한 기능)

**예상 소요**: 1~2일

### 왜 이 순서인가?

블로그의 존재 이유는 **글을 쓰면 보인다**는 것(PRD 2절 성공 지표)이다. 홈 목록과 글 상세만 동작해도 서비스는 이미 쓸 수 있다. 공통 모듈이 준비된 지금이 이를 **실데이터에 연결**하기 가장 쉬운 시점이며, 카테고리 같은 부가 기능은 이 핵심 흐름(홈 → 상세) 위에 얹어야 문제 위치를 좁힐 수 있다.

### 작업

- [ ] 홈 글 목록 (FR-001, FR-002): Server Component에서 `getPublishedPosts` 호출, 0개일 때 빈 상태, D-4 재검증 설정 적용
- [ ] 글 상세 (FR-001, FR-003): 제목·카테고리·태그·발행일·본문 표시, 없는 글·초안 글은 `notFound()`, `generateMetadata`로 글 제목을 `<title>`에 반영
- [ ] 이미지 처리: 원격 이미지 도메인(`next.config.ts`) 설정, 이미지 URL 만료 대응 확인
- [ ] 오류 처리: Notion 호출 실패 시 `error.tsx` 표시, 서버 프로세스 유지
- [ ] 공통 상태 화면 다듬기 (2단계에서 이월): `not-found.tsx`, `error.tsx`, `loading.tsx`의 문구·스타일을 실데이터 화면 기준으로 정리

### 완료 기준

- [ ] 홈에 Notion의 **발행된 글만 최신순**으로 표시됨 (FR-002 인수 조건)
- [ ] 홈 카드 클릭 → 상세에서 본문 표시, **2클릭 이내** (PRD 2절)
- [ ] 초안 글 ID로 직접 접근 시 404, 잘못된 ID도 404 (FR-003 인수 조건)
- [ ] Notion에서 `Status`를 바꾸면 D-4 주기 안에 반영됨
- [ ] `npm run build` 후 `.next/static`에서 `NOTION_API_KEY` 값 검색 결과 0건, 브라우저 네트워크에서 Notion API 직접 호출 없음 (FR-001 인수 조건)
- [ ] Playwright MCP 시나리오(홈 → 상세 → 뒤로가기, 404, 빈 상태) 통과

---

## 4단계: 추가 기능 (부가적인 기능)

**예상 소요**: 1~1.5일 (검색은 MVP 이후)

### 왜 이 순서인가?

카테고리 필터링과 검색은 **글 목록 UI와 데이터 계층을 재사용**하는 기능이다. 핵심 기능이 안정된 뒤에 추가해야 목록 컴포넌트를 수정할 때 영향 범위가 작고, 문제가 생겼을 때 핵심 기능 때문인지 추가 기능 때문인지 구분할 수 있다. 카테고리는 PRD 화면 구성(카테고리 화면)에 있고 D-1로 MVP에 포함됐으므로 MVP 릴리스 전에 끝낸다.

### 작업

- [ ] **카테고리별 글 목록 (FR-006, MVP)**: `src/app/category/[name]/page.tsx`, 카테고리 Badge를 링크화(`post-meta.tsx`), `Category` + `Status = 게시됨` 필터, 한글 카테고리명 URL 인코딩/디코딩, 없는 카테고리는 빈 상태 또는 404(정책 기록)
- [ ] **제목 키워드 검색 (FR-007, MVP 이후)**: 검색 방식 선택·기록(Notion `title contains` vs 캐시된 목록에서 필터링), `src/app/search/page.tsx`, 헤더 검색 진입점, 결과 없음 상태

### 완료 기준

- [ ] 카테고리 Badge 클릭 → 해당 카테고리 글만 표시, 초안 글 제외 (FR-006 인수 조건)
- [ ] 존재하지 않는 카테고리 경로 처리 확인
- [ ] (검색 진행 시) 키워드 입력 → 제목에 포함된 글만 표시, 빈 검색어·특수문자·결과 없음 처리 확인 (FR-007 인수 조건)
- [ ] `npm run check-all`, `npm run build` 통과

---

## 5단계: 최적화 및 배포

**예상 소요**: 1~2일

### 왜 이 순서인가?

최적화는 **무엇이 느리고 어디가 깨지는지 알아야** 할 수 있어서, 기능이 모두 갖춰진 뒤에 한다. 미리 최적화하면 이후 기능 변경으로 다시 해야 하는 낭비가 생긴다. 배포는 마지막에 하지만, 환경 변수와 Notion 연동 같은 **배포 환경 고유의 문제**는 여기서 처음 드러나므로 충분한 시간을 둔다.

### 작업

- [ ] 반응형·다크모드 점검 (FR-004, FR-005): 360/768/1280px에서 가로 스크롤 없음(긴 제목·긴 코드 줄 포함), 라이트/다크 전환 시 본문·메타·Badge·코드 블록 대비, 모바일 내비게이션 동작
- [ ] 본문 스타일링: 본문 폭·행간·제목 간격·코드 블록(가로 스크롤 영역 한정), 이미지 비율 유지·지연 로딩
- [ ] 기본 SEO: 사이트 `title` 템플릿·`description` 메타데이터
- [ ] 성능 점검: Lighthouse 성능·접근성 점수 기록(기준선 확보), 불필요한 클라이언트 번들 확인
- [ ] 미사용 의존성 정리 검토 (`react-hook-form`, `@hookform/resolvers`, `@radix-ui/react-checkbox` 등, shadcn 컴포넌트 보존 여부 판단)
- [ ] Vercel 배포: 프로젝트 연결, `NOTION_API_KEY`, `NOTION_DATABASE_ID` 환경 변수 등록

### 완료 기준

- [ ] 배포 URL에서 360/768/1280px, 라이트/다크 최종 확인 (PRD 성공 지표 3)
- [ ] 배포 환경에서 Notion 글 발행 → 코드 수정·재배포 없이 D-4 주기 내 반영 (PRD 성공 지표 1)
- [ ] 배포 URL 대상 Playwright MCP E2E(3단계 시나리오 + 카테고리) 통과
- [ ] `npm run check-all`, `npm run build` 통과, 콘솔 오류 없음

---

## PRD 기능 추적표

| 기능   | 내용            | 단계                                       |
| ------ | --------------- | ------------------------------------------ |
| FR-001 | Notion 연동     | 1단계(설치·키) → 2단계(모듈) → 3단계(검증) |
| FR-002 | 글 목록         | 2단계(공통 UI·데이터) → 3단계(홈)          |
| FR-003 | 글 상세         | 2단계(본문 렌더러) → 3단계(상세)           |
| FR-004 | 반응형 디자인   | 2단계(컴포넌트) → 5단계(점검)              |
| FR-005 | 기본 스타일링   | 2단계(컴포넌트) → 5단계(점검)              |
| FR-006 | 카테고리 필터링 | 4단계 (MVP)                                |
| FR-007 | 검색            | 4단계 (MVP 이후)                           |

## 작업 방식

1. 단계 순서대로 진행하고, 단계 완료 기준을 모두 `[x]`로 바꾼 뒤 다음 단계로 넘어간다.
2. 작업 후 `npm run check-all`과 `npm run build`를 실행한다 (`check-all`에는 build가 포함되지 않는다).
3. 완료한 작업은 이 문서의 체크박스와 단계 상태(✅/🔄/⏳)를 갱신한다.
4. 구현 중 새 결정이 필요하면 결정 현황 표에 추가한다.

## 백로그 (PRD 12절, 미배정)

- 태그별 목록, RSS 피드, SEO 확장(Open Graph 이미지, sitemap)
