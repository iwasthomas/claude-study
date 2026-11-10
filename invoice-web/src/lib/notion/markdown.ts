// notion-to-md가 만든 Markdown을 "원시 HTML 없는 순수 Markdown"으로 정리하는 후처리.
// post-body는 rehype-raw를 쓰지 않으므로 <details>, <u> 같은 HTML은 그대로 깨져 보인다.
// 코드 펜스 안의 내용은 글쓴이가 쓴 그대로 보존해야 하므로 펜스 밖에서만 바꾼다.

const FENCE_SPLIT =
  /(^[ \t]*(?:`{3,}|~{3,})[^\n]*\n[\s\S]*?\n[ \t]*(?:`{3,}|~{3,})[ \t]*$)/gm

// <details><summary>제목</summary>본문</details> → **제목** + 본문 (중첩 토글은 안쪽부터 반복 처리)
const TOGGLE = /<details>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/

// notion-to-md는 북마크·임베드 링크 텍스트를 블록 타입명으로 고정한다 → URL 호스트명으로 교체
const TYPE_LINK = /\[(bookmark|embed|link_preview)\]\((https?:\/\/[^)\s]+)\)/g

function hostLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function transformText(text: string): string {
  let out = text

  // 토글: 가장 안쪽 것부터 평탄화
  for (let i = 0; i < 20 && TOGGLE.test(out); i++) {
    out = out.replace(
      TOGGLE,
      (_m, summary: string, body: string) =>
        `\n\n**${summary.trim()}**\n\n${body.trim()}\n\n`
    )
  }

  // 밑줄: Markdown에 밑줄이 없으므로 태그만 제거(텍스트는 유지)
  out = out.replace(/<\/?u>/g, '')

  out = out.replace(
    TYPE_LINK,
    (_m, _type: string, url: string) => `[${hostLabel(url)}](${url})`
  )

  return out
}

export function toPlainMarkdown(markdown: string): string {
  // split + 캡처 그룹: 홀수 인덱스가 코드 펜스
  return markdown
    .split(FENCE_SPLIT)
    .map((part, i) => (i % 2 === 1 ? part : transformText(part)))
    .join('')
    .replace(/\n{3,}/g, '\n\n')
}
