import { cache } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { Container } from '@/components/layout/container'
import { PostBody } from '@/components/posts/post-body'
import { PostMeta } from '@/components/posts/post-meta'
import { getPostById } from '@/lib/notion/posts'

// D-4: 상세는 동적 렌더링 (Notion 이미지 URL이 1시간 뒤 만료되므로 캐시하지 않음)
export const dynamic = 'force-dynamic'

// generateMetadata와 페이지가 같은 요청 안에서 Notion을 한 번만 호출하도록 메모이즈
const loadPost = cache(getPostById)

interface PostPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { id } = await params
  const post = await loadPost(id)
  if (!post) return { title: '글을 찾을 수 없습니다' }
  return { title: post.title }
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params
  const post = await loadPost(id)
  if (!post) notFound()

  return (
    <Container>
      <article className="py-12">
        <div className="mx-auto w-full max-w-prose min-w-0">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            목록으로
          </Link>
          <header className="mb-10">
            <h1 className="text-3xl leading-tight font-bold tracking-tight [overflow-wrap:anywhere] break-keep">
              {post.title}
            </h1>
            <PostMeta
              className="mt-4"
              linkCategory
              category={post.category}
              published={post.published}
              tags={post.tags}
            />
          </header>
        </div>
        <PostBody content={post.content} />
      </article>
    </Container>
  )
}
