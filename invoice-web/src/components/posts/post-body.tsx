/* eslint-disable @typescript-eslint/no-unused-vars -- react-markdown이 넘기는 node prop을 DOM에 전달하지 않으려고 구조분해로 제거 */
import type { ComponentProps } from 'react'
import Image from 'next/image'
import { MarkdownAsync } from 'react-markdown'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import { bundledLanguages } from 'shiki'

import { cn } from '@/lib/utils'

// 글 본문 렌더러: Notion(notion-to-md)이 만든 Markdown 문자열을 표시하는 서버 컴포넌트
// - 원시 HTML은 허용하지 않음(rehype-raw 미사용). Markdown으로 표현되지 않는
//   Notion 블록(콜아웃·토글·임베드·child_page 등)은 일반 문단/링크/텍스트로만 나오거나 생략됨
// - 코드 하이라이트는 서버에서 shiki(rehype-pretty-code)로 처리, 색상은 globals.css의 CSS 변수로 전환

interface PostBodyProps {
  // Markdown 본문
  content: string
  className?: string
}

const CODE_THEMES = { light: 'github-light', dark: 'github-dark' } as const

// 코드 펜스 언어 정규화: `plain text` 같은 공백 포함 값이나 shiki가 모르는 언어는 text로 대체
const FENCE_OPEN = /^([ \t]*)(`{3,}|~{3,})([^\n`]*)$/gm
const PLAIN_LANGS = new Set(['text', 'plain', 'plaintext', 'plain text', ''])

function normalizeCodeFences(markdown: string): string {
  return markdown.replace(
    FENCE_OPEN,
    (_match, indent: string, fence: string, info: string) => {
      const lang = info.trim().toLowerCase()
      if (lang === '') return `${indent}${fence}`
      if (PLAIN_LANGS.has(lang)) return `${indent}${fence}text`
      return lang in bundledLanguages
        ? `${indent}${fence}${lang}`
        : `${indent}${fence}text`
    }
  )
}

// 이미지 alt 복원: 캡션이 없으면 URL 인코딩된 파일명이 오므로 디코딩하고, 파일명 형태면 비움
const FILENAME_LIKE = /\.(png|jpe?g|gif|webp|svg|avif|heic|bmp)$/i

function normalizeAlt(alt: string | undefined): string {
  if (!alt) return ''
  let decoded = alt
  try {
    decoded = decodeURIComponent(alt)
  } catch {
    // 잘못된 인코딩은 원본 유지
  }
  return FILENAME_LIKE.test(decoded.trim()) ? '' : decoded
}

// next.config.ts의 images.remotePatterns와 같은 호스트
const NOTION_IMAGE_HOSTS = new Set([
  'prod-files-secure.s3.us-west-2.amazonaws.com',
  'file.notion.so',
])

function isNotionImage(url: string): boolean {
  try {
    const u = new URL(url)
    return u.protocol === 'https:' && NOTION_IMAGE_HOSTS.has(u.hostname)
  } catch {
    return false
  }
}

const components: ComponentProps<typeof MarkdownAsync>['components'] = {
  h1: ({ node: _node, className, ...props }) => (
    <h1
      className={cn(
        'mt-10 mb-4 text-3xl leading-tight font-bold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h2: ({ node: _node, className, ...props }) => (
    <h2
      className={cn(
        'mt-10 mb-4 border-b pb-2 text-2xl leading-snug font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h3: ({ node: _node, className, ...props }) => (
    <h3
      className={cn(
        'mt-8 mb-3 text-xl leading-snug font-semibold first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h4: ({ node: _node, className, ...props }) => (
    <h4
      className={cn(
        'mt-6 mb-2 text-lg leading-snug font-semibold first:mt-0',
        className
      )}
      {...props}
    />
  ),
  p: ({ node: _node, className, ...props }) => (
    <p className={cn('my-5 leading-8 first:mt-0', className)} {...props} />
  ),
  a: ({ node: _node, className, href, ...props }) => {
    const isExternal = !!href && /^https?:\/\//i.test(href)
    return (
      <a
        href={href}
        className={cn(
          'text-primary decoration-muted-foreground/50 hover:decoration-foreground underline underline-offset-4 transition-colors',
          className
        )}
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : undefined)}
        {...props}
      />
    )
  },
  ul: ({ node: _node, className, ...props }) => (
    <ul
      className={cn(
        'my-5 list-disc space-y-2 pl-6 [&_ol]:my-2 [&_ul]:my-2',
        className
      )}
      {...props}
    />
  ),
  ol: ({ node: _node, className, ...props }) => (
    <ol
      className={cn(
        'my-5 list-decimal space-y-2 pl-6 [&_ol]:my-2 [&_ul]:my-2',
        className
      )}
      {...props}
    />
  ),
  li: ({ node: _node, className, ...props }) => (
    <li
      className={cn('marker:text-muted-foreground leading-8', className)}
      {...props}
    />
  ),
  blockquote: ({ node: _node, className, ...props }) => (
    <blockquote
      className={cn(
        'border-border text-muted-foreground my-6 border-l-4 pl-4 [&>p]:my-2',
        className
      )}
      {...props}
    />
  ),
  hr: ({ node: _node, className, ...props }) => (
    <hr className={cn('border-border my-10', className)} {...props} />
  ),
  // GFM 표: 가로 스크롤은 래퍼에만 적용
  table: ({ node: _node, className, ...props }) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border" tabIndex={0}>
      <table
        className={cn('w-full border-collapse text-sm break-normal', className)}
        {...props}
      />
    </div>
  ),
  thead: ({ node: _node, className, ...props }) => (
    <thead className={cn('bg-muted/60', className)} {...props} />
  ),
  tr: ({ node: _node, className, ...props }) => (
    <tr className={cn('border-b last:border-b-0', className)} {...props} />
  ),
  th: ({ node: _node, className, ...props }) => (
    <th
      className={cn(
        'px-4 py-2 text-left font-semibold whitespace-nowrap',
        className
      )}
      {...props}
    />
  ),
  td: ({ node: _node, className, ...props }) => (
    <td
      className={cn('min-w-28 px-4 py-2 align-top break-keep', className)}
      {...props}
    />
  ),
  // 코드 블록 래퍼(rehype-pretty-code가 만드는 figure): 가로 스크롤은 pre에서만 발생
  figure: ({ node: _node, className, ...props }) => (
    <figure className={cn('my-6 min-w-0', className)} {...props} />
  ),
  pre: ({ node: _node, className, ...props }) => (
    <pre
      className={cn(
        'post-code-block overflow-x-auto rounded-lg border p-4 text-sm leading-6 break-normal [overflow-wrap:normal] whitespace-pre',
        className
      )}
      tabIndex={0}
      {...props}
    />
  ),
  // data-theme가 있으면 하이라이트된 코드 블록 내부, 없으면 인라인 코드
  code: ({ node: _node, className, ...props }) => {
    if ('data-theme' in props) {
      return (
        <code
          className={cn('grid font-mono text-[0.875em]', className)}
          {...props}
        />
      )
    }
    return (
      <code
        className={cn(
          'bg-muted rounded px-1.5 py-0.5 font-mono text-[0.875em] break-words',
          className
        )}
        {...props}
      />
    )
  },
  strong: ({ node: _node, className, ...props }) => (
    <strong className={cn('font-semibold', className)} {...props} />
  ),
  // 이미지: Notion 호스트는 next/image(최적화), 그 외 외부 URL은 설정 없이도 깨지지 않도록 <img> 사용
  img: ({ node: _node, className, src, alt }) => {
    const url = typeof src === 'string' ? src : undefined
    const imgClass = cn(
      'my-6 block h-auto max-w-full rounded-lg border',
      className
    )
    if (url && isNotionImage(url)) {
      return (
        <Image
          src={url}
          alt={normalizeAlt(alt)}
          width={1200}
          height={675}
          sizes="(min-width: 768px) 672px, 100vw"
          className={imgClass}
        />
      )
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element -- next.config에 등록되지 않은 외부 호스트
      <img
        src={url}
        alt={normalizeAlt(alt)}
        loading="lazy"
        decoding="async"
        className={imgClass}
      />
    )
  },
}

export async function PostBody({ content, className }: PostBodyProps) {
  return (
    <div
      className={cn(
        'text-foreground mx-auto w-full max-w-prose min-w-0 text-base [overflow-wrap:anywhere] break-keep',
        className
      )}
    >
      <MarkdownAsync
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          [
            rehypePrettyCode,
            {
              theme: CODE_THEMES,
              defaultColor: false,
              keepBackground: false,
              defaultLang: { block: 'text', inline: 'text' },
            },
          ],
        ]}
        components={components}
      >
        {normalizeCodeFences(content)}
      </MarkdownAsync>
    </div>
  )
}
