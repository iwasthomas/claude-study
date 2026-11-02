# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# 프로젝트 개요
React + TypeScript 기반 할일 관리 앱

# 기술 스택
- React 19 + TypeScript
- Tailwind CSS
- Zustand (상태관리)

# 빌드 & 실행 명령어
- 개발 서버: npm run dev
- 빌드: npm run build
- 테스트: npm run test

# 코드 컨벤션
- 컴포넌트 파일명: PascalCase (예: TodoList.tsx)
- 훅 파일명: use로 시작 (예: useTodos.ts)
- 타입 정의는 types/ 디렉토리에 모아서 관리

# 프로젝트 구조
- src/components/ : UI 컴포넌트
- src/hooks/ : 커스텀 훅
- src/types/ : TypeScript 타입 정의
- src/stores/ : Zustand 스토어

# 커뮤니케이션
- 코드 변경 시 무엇을 왜 바꿨는지 간단히 설명
- 파일을 새로 만들 때는 먼저 계획을 말해주고 진행

# 코딩 스타일
- 들여쓰기는 2칸 스페이스
- 함수는 30줄 이하로 유지, 길어지면 분리 제안
- 매직 넘버 사용 금지, 상수로 정의