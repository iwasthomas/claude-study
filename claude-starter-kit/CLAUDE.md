# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

- **기술 스택**: Next.js 16(App Router) + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui(Base UI 기반, base-nova) + Lucide Icons
- **주요 기능**: 공통 레이아웃(헤더/푸터/모바일 메뉴), 다크 모드(`next-themes`), 공통 컴포넌트, 대시보드 예시(사이드바 셸), 컴포넌트 예제 페이지(`/examples/*`). 인증 기능은 없습니다.
- **용도**: 바로 기능 개발에 들어갈 수 있는 웹 개발 스타터킷입니다. 새 프로젝트의 출발점으로 복사해 쓰는 것을 전제로 합니다.

## 먼저 읽을 것

`AGENTS.md`에 따르면 이 프로젝트의 Next.js(16.4.4)는 기존 지식과 다른 점이 있습니다. Next.js 코드를 쓰기 전에 `node_modules/next/dist/docs/01-app/` 아래의 관련 문서를 먼저 확인합니다. 예를 들어 `params`/`searchParams`는 Promise이고, `middleware`는 `proxy`로 바뀌었으며, 전역 헬퍼 타입 `PageProps<'/route'>`와 `LayoutProps<'/route'>`를 import 없이 쓸 수 있습니다.

## 명령어

```bash
npm run dev            # 개발 서버 (http://localhost:3000)
npm run build          # 프로덕션 빌드
npm run lint           # ESLint
npm run typecheck      # tsc --noEmit
npm run format         # Prettier 전체 포맷
npm run format:check   # 포맷 위반 검사만
npx shadcn@latest add <이름>   # shadcn/ui 컴포넌트 추가
```

테스트 러너는 설정되어 있지 않습니다. 변경 후에는 `typecheck`, `lint`, `format:check`로 검증하고, UI는 `.mcp.json`에 등록된 Playwright MCP로 직접 확인할 수 있습니다.

## 아키텍처

### 컴포넌트 계층 (의존 방향 강제)

의존은 위 레벨에서 아래 레벨로만 허용합니다. 하위 레벨이 상위 레벨을 import하면 안 됩니다.

```
Level 5  app/                   라우트 조립
Level 4  components/sections/   페이지 섹션 (Hero, FeatureGrid ...)
Level 3  components/layout/     페이지 골격 (SiteHeader, AppShell, AppSidebar ...)
Level 2  components/common/     ui를 조합한 재사용 블록
Level 1  components/ui/         shadcn 원자 컴포넌트 (직접 수정 최소화)
```

새 컴포넌트는 먼저 레벨을 정한 뒤 해당 폴더에 둡니다.

### 레이아웃과 라우팅

- `app/layout.tsx`가 `ThemeProvider` → `SkipLink` → `SiteHeader` → `<main id="main-content">` → `SiteFooter` → `Toaster` 순으로 감쌉니다. 따라서 모든 페이지(대시보드 포함)에 사이트 헤더와 푸터가 보입니다.
- `app/(dashboard)/layout.tsx`는 route group 레이아웃으로 `AppShell`(사이드바)을 적용합니다. 대시보드 하위 페이지는 이 그룹 안에 둡니다.
- 상단 메뉴는 `config/site.ts`의 `siteConfig.nav` 하나로 데스크톱 헤더(`site-header.tsx`)와 모바일 시트(`mobile-nav.tsx`)에 동시에 반영됩니다. 대시보드 사이드바는 `dashboardNav`(아이콘 포함)를 씁니다.
- `SiteHeader`는 서버 컴포넌트라 `usePathname`을 쓸 수 없습니다. 활성 링크 표시가 필요하면 client 컴포넌트로 분리해야 하며, `app-sidebar.tsx`가 참고 예시입니다.

### shadcn/ui는 Base UI 기반 (base-nova)

Radix가 아니므로 `asChild`가 없습니다. 대신 `render` prop을 씁니다.

- 트리거에 Button을 쓸 때: `<SheetTrigger render={<Button />}>` (이때는 진짜 `<button>`이므로 `nativeButton` 지정 불필요)
- Button이 `Link`나 `<a>`로 렌더링될 때는 반드시 `nativeButton={false}`를 줍니다. 빠뜨리면 Base UI 경고가 납니다.

```tsx
<Button nativeButton={false} render={<Link href="/dashboard" />}>
  대시보드
</Button>
```

### 스타일과 테마

- Tailwind v4 CSS-first 방식으로 `tailwind.config`가 없습니다. 토큰은 `app/globals.css`의 `:root`/`.dark`(oklch)와 `@theme inline`에 있습니다.
- 다크 모드는 `next-themes`의 class 방식입니다. `bg-background`, `text-foreground`, `bg-muted` 같은 의미 기반 클래스만 쓰고 `bg-blue-500` 같은 고정 색은 피합니다(다크 모드가 깨집니다).
- 클래스 병합은 `lib/utils.ts`의 `cn()`을 씁니다.

## 코드 컨벤션

- Prettier: 큰따옴표, 세미콜론 없음, 들여쓰기 2칸, `prettier-plugin-tailwindcss`가 클래스를 정렬합니다.
- 파일/폴더는 kebab-case, 컴포넌트는 PascalCase 이름 있는 `export function`입니다. default export는 페이지와 레이아웃만 씁니다.
- import는 `@/` 별칭을 쓰고, 외부 패키지 다음에 빈 줄을 두고 내부 모듈을 둡니다.
- 서버 컴포넌트가 기본이며, 상호작용이 필요한 파일만 최상단에 `"use client"`를 둡니다.
- UI 문구, `aria-label`, 주석은 한국어로 씁니다(`html lang="ko"`). 브랜드명과 기술명은 영어 그대로 둡니다.
- `shadcn add`로 생성된 파일은 `cn` import가 `"cn"` 패키지가 아닌 `@/lib/utils`인지 확인합니다. 기존 파일 덮어쓰기 질문에는 보통 `n`을 선택합니다.

## 환경 변수

`NEXT_PUBLIC_SITE_URL`(기본 `http://localhost:3000`)만 사용합니다. 실제 값은 `.env.local`에 두고 저장소에는 `.env.example`만 올립니다.
