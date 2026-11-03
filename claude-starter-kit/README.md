# Starter Kit

Next.js 16 · TypeScript · Tailwind CSS v4 · shadcn/ui · Lucide Icons 기반의 웹 개발 스타터킷입니다. 레이아웃, 다크 모드, 공통 컴포넌트, 대시보드 예시가 준비되어 있어 바로 기능 개발에 집중할 수 있습니다.

## 시작하기

```bash
npm install
cp .env.example .env.local   # 필요한 환경 변수가 있을 때만
npm run dev                  # http://localhost:3000
```

## 스크립트

| 명령어                 | 설명                                  |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | 개발 서버 실행                        |
| `npm run build`        | 프로덕션 빌드                         |
| `npm run start`        | 빌드 결과 실행                        |
| `npm run lint`         | ESLint 검사                           |
| `npm run typecheck`    | TypeScript 타입 검사 (`tsc --noEmit`) |
| `npm run format`       | Prettier로 전체 포맷                  |
| `npm run format:check` | 포맷 위반 여부만 검사                 |

## 폴더 구조

```
app/                    라우트와 페이지 (layout, page, not-found, error, loading)
app/(dashboard)/        대시보드 라우트 그룹 (앱 셸 레이아웃 적용)
components/
  ui/                   shadcn/ui 원자 컴포넌트 (직접 수정은 최소화)
  common/               ui를 조합한 재사용 블록 (ThemeToggle, PageHeader, FormField 등)
  layout/               페이지 골격 (SiteHeader, SiteFooter, AppShell, AppSidebar 등)
  sections/             페이지 단위 섹션 (Hero, FeatureGrid, TechStack 등)
config/site.ts          사이트 이름, 설명, 네비게이션 설정
hooks/                  커스텀 훅 (use-mobile 등)
lib/utils.ts            cn() 유틸리티
providers/              Context Provider (ThemeProvider)
```

## 컴포넌트 계층 규칙

의존 방향은 위 레벨에서 아래 레벨로만 허용합니다. 하위 레벨은 상위 레벨을 import하지 않습니다.

```
Level 5  app/          라우트 조립
Level 4  sections/     페이지 섹션
Level 3  layout/       페이지 골격
Level 2  common/       재사용 블록
Level 1  ui/           shadcn 원자 컴포넌트
```

예를 들어 `components/ui/` 안의 파일이 `components/common/`을 import하면 안 됩니다. 새 기능을 만들 때는 먼저 어느 레벨인지 정한 뒤 그 폴더에 둡니다.

## 컴포넌트 추가하기

shadcn/ui 컴포넌트는 CLI로 추가합니다.

```bash
npx shadcn@latest add <컴포넌트 이름>
```

설치 후 확인할 점:

- 기존 파일을 덮어쓰라는 질문에는 보통 `n`을 선택합니다. 이미 수정한 파일이 사라질 수 있습니다.
- 생성된 파일의 `cn` import가 `"cn"` 패키지가 아니라 `@/lib/utils`인지 확인합니다.

직접 만든 컴포넌트는 역할에 맞는 레벨 폴더에 둡니다. 예를 들어 여러 페이지에서 쓰는 입력 묶음이라면 `components/common/`에 둡니다.

## 테마

- 다크 모드는 `next-themes`로 구현되어 있으며, `app/layout.tsx`의 `ThemeProvider`가 시스템 설정을 기본으로 따릅니다.
- 색상 토큰은 `app/globals.css`의 `:root`(라이트)와 `.dark`(다크)에 정의되어 있습니다. 브랜드 색을 바꿀 때는 이 값들을 수정합니다.
- 컴포넌트에서는 `bg-background`, `text-foreground`, `bg-primary` 같은 의미 기반 클래스를 사용합니다. 특정 색 값(`bg-blue-500`)을 직접 쓰면 다크 모드와 테마 전환이 깨질 수 있습니다.
- 테마 토글 버튼은 `components/common/theme-toggle.tsx`에 있습니다.

## 사이트 설정

`config/site.ts`에서 다음 항목을 관리합니다.

- `name`, `description`: 메타데이터와 헤더, 푸터에 사용됩니다.
- `url`: `NEXT_PUBLIC_SITE_URL` 환경 변수를 읽고, 없으면 `http://localhost:3000`을 사용합니다.
- `nav`: 상단 헤더와 모바일 메뉴의 링크
- `dashboardNav`: 대시보드 사이드바의 링크와 아이콘

## 페이지 추가 예시

새 페이지는 `app/` 아래에 폴더를 만들고 `page.tsx`를 둡니다. 대시보드 안에 만들면 앱 셸 레이아웃이 자동으로 적용됩니다.

```
app/(dashboard)/dashboard/reports/page.tsx   →  /dashboard/reports
```

사이드바에 메뉴를 추가하려면 `config/site.ts`의 `dashboardNav`에 항목을 넣습니다.

## 환경 변수

| 변수                   | 설명               | 기본값                  |
| ---------------------- | ------------------ | ----------------------- |
| `NEXT_PUBLIC_SITE_URL` | 사이트의 공개 주소 | `http://localhost:3000` |

실제 값은 `.env.local`에 두고, 저장소에는 `.env.example`만 올립니다.

## 기술 스택

- Next.js 16 (App Router, Cache Components)
- React 19, TypeScript
- Tailwind CSS v4
- shadcn/ui (Base UI 기반, base-nova 스타일)
- Lucide Icons, next-themes, Sonner
- clsx, tailwind-merge
- Prettier (`prettier-plugin-tailwindcss`로 클래스 순서 정렬)
