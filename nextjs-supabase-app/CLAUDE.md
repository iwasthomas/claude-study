# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 저장소 구조

git 루트(`claude-study/`)에는 여러 독립 프로젝트(`claude-starter-kit`, `claude-study-1`, `invoice-web`, `nextjs-supabase-app`)가 함께 있다. 이 문서는 `nextjs-supabase-app/`(Supabase 인증 테스트용 Next.js 앱)만 다룬다. 모든 명령은 이 디렉터리에서 실행하며, git 명령은 상위 루트 기준으로 동작한다.

## 명령어

```bash
npm run dev     # 개발 서버 (localhost:3000)
npm run build   # 프로덕션 빌드
npm run lint    # eslint .
```

테스트 러너는 설정되어 있지 않다. 환경변수는 `.env.local`에 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`가 필요하다(레거시 anon 키 값도 같은 변수에 사용 가능).

## 아키텍처

Next.js App Router + `@supabase/ssr` 쿠키 기반 세션 + shadcn/ui(Tailwind 3). 경로 별칭은 `@/*` → 프로젝트 루트.

### 인증 흐름 (여러 파일에 걸쳐 있음)

- `proxy.ts`(루트): Next.js의 middleware 후속 규약인 `proxy` 파일이다. 모든 요청에서 `lib/supabase/proxy.ts`의 `updateSession`을 호출한다.
- `updateSession`은 요청마다 세션 쿠키를 갱신하고 `supabase.auth.getClaims()`로 사용자를 확인한다. 로그인하지 않은 사용자는 `/`, `/login*`, `/auth*`를 제외한 모든 경로에서 `/auth/login`으로 리다이렉트한다. `createServerClient`와 `getClaims()` 사이에 다른 코드를 넣거나 `getClaims()`를 제거하면 사용자가 무작위로 로그아웃될 수 있다. 반환하는 `supabaseResponse`는 그대로 유지해야 한다(새 응답을 만들 때는 쿠키 복사 필요).
- `lib/supabase/server.ts`(서버 컴포넌트/액션/라우트 핸들러용)와 `lib/supabase/client.ts`(브라우저용)가 클라이언트 팩토리다. 서버 클라이언트는 전역 변수에 두지 말고 함수 호출마다 새로 만든다(Fluid compute).
- `app/auth/*`: login, sign-up, sign-up-success, forgot-password, update-password, error 페이지와 이메일 확인용 `confirm/route.ts`. 폼 로직은 `components/*-form.tsx`에 있다.
- `app/protected/*`: 로그인 필요 영역의 예시 레이아웃과 페이지.
- `lib/utils.ts`의 `hasEnvVars`가 false면 proxy는 인증 검사를 건너뛴다.

### 설정 특이점

- `next.config.ts`에서 `cacheComponents: true`가 켜져 있어 Cache Components 규칙(캐시 가능한 영역에서 동적 데이터 접근 제한 등)을 따라야 한다.
- `package.json`의 `next`, `@supabase/*`가 `latest`로 지정되어 있어 `eslint-config-next`(15.3.1)와 버전이 어긋날 수 있다.
- `components/tutorial/*`, `deploy-button.tsx`, `hero.tsx` 등은 Supabase 스타터 템플릿의 예시 코드다.

## Supabase 데이터베이스

- 스키마 변경은 `supabase/migrations/<버전>_<이름>.sql`에 기록한다. 현재 `20261111134831_create_profiles_table.sql`이 `public.profiles`(`auth.users`와 1:1, RLS로 본인 조회/수정만 허용, 가입 시 `handle_new_user` 트리거로 자동 생성)를 정의한다.
- 프로젝트 범위 MCP 서버 `supabase`가 `.mcp.json`에 등록되어 있다(`project_ref` 고정). MCP로 `apply_migration`을 실행하면 원격 DB에 바로 적용되므로, 적용한 SQL은 파일명 버전을 `list_migrations`의 버전과 맞춰 `supabase/migrations/`에 함께 남긴다.
- 새 테이블은 RLS를 켜고, 변경 후에는 `get_advisors`(security)로 점검한다. `profiles`에는 INSERT/DELETE 정책이 없다(트리거가 생성, FK cascade가 삭제).

## 커밋 규칙

커밋 메시지는 `✨ feat: 한글 설명`처럼 이모지 + 타입 + 한글 요약 형식을 쓴다(gitmoji 스타일, 이력 참고).
