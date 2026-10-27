# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개요

공부/연습용 저장소입니다 (UI 텍스트와 커밋 메시지는 한국어). 현재 앱은 정적 개인 프로필 웹사이트인 `profile/` 하나뿐입니다. `bucket-list-main/`은 비어 있는 디렉터리이며, 공부를 위해 내용을 의도적으로 지운 것입니다 (git log 참고).

## 실행

빌드 시스템, 패키지 매니저, 린터, 테스트는 없습니다. `profile/index.html`을 브라우저에서 직접 열거나 아무 정적 서버로 폴더를 서빙하면 됩니다. Tailwind CSS와 Google Fonts를 런타임에 CDN에서 불러오므로 네트워크 연결이 필요합니다.

## 아키텍처 (`profile/`)

- `index.html` — 빈 컨테이너(`#info-panel`, `#stats`, `#tab-career`, `#skills-body`, `#project-grid` 등)만 있는 페이지 뼈대입니다. Tailwind는 인라인 `tailwind.config`로 설정합니다 (커스텀 `brand` 색상, `display`/`body` 폰트).
- `script.js` — 모든 콘텐츠가 파일 상단의 `profile` 데이터 객체에 있습니다 ("이 부분만 수정하면 됩니다": 사이트 내용을 바꾸려면 이 부분만 수정). 섹션별 `render*()` 함수가 Tailwind 클래스가 들어간 템플릿 문자열 HTML을 컨테이너에 주입하고, `setup*()` 함수가 인터랙션(모바일 메뉴, About 탭, 스크롤에 따른 헤더 그림자와 활성 네비 링크, IntersectionObserver 기반 `.reveal` 페이드인)을 연결합니다. 모두 `DOMContentLoaded`에서 실행됩니다.
- `style.css` — Tailwind 유틸리티로 표현할 수 없는 것만 담습니다: `.pinstripe` 배경, `.section-title`, `.nav-link` 밑줄, `.tab-btn`/`.tab-active`, `.level-bar`, `.reveal`/`.is-visible`.

수정할 때 함께 맞춰야 할 것:
- `script.js`가 참조하는 요소 ID(`$("#...")`)는 `index.html`에 존재해야 하며, 탭 버튼의 `data-tab="x"`는 `#tab-x` 패널과 대응됩니다.
- 마크업이 JS에서 생성되므로, 여기서 쓰는 Tailwind 클래스는 CDN 런타임 빌드에서만 동작합니다. `profile` 값은 `textContent`를 쓰는 곳을 제외하면 `innerHTML`로 (이스케이프 없이) 삽입됩니다.
- 테마 색상 `#c30452`는 `tailwind.config`와 `style.css`에 중복되어 있습니다.
