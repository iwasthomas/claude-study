import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Container } from '@/components/layout/container'
import { PostList } from '@/components/posts/post-list'
import { getPostsByCategory } from '@/lib/notion/posts'

// D-4: 목록 계열 페이지는 ISR 5분
export const revalidate = 300

interface CategoryPageProps {
  params: Promise<{ name: string }>
}

// URL 세그먼트(한글은 퍼센트 인코딩)를 카테고리 이름으로 복원. 잘못된 인코딩이면 null
function decodeCategory(name: string): string | null {
  try {
    const category = decodeURIComponent(name).trim()
    return category === '' ? null : category
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { name } = await params
  const category = decodeCategory(name)
  return { title: category ? `${category} 카테고리` : '카테고리' }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { name } = await params
  const category = decodeCategory(name)
  if (!category) notFound()

  const posts = await getPostsByCategory(category)

  return (
    <Container>
      <section className="py-12">
        <p className="text-muted-foreground mb-2 text-sm">카테고리</p>
        <h1 className="mb-8 text-3xl font-bold tracking-tight [overflow-wrap:anywhere] break-keep">
          {category}
        </h1>
        {/* 없는 카테고리나 게시됨 글이 없는 카테고리는 404가 아니라 빈 상태로 보여 준다 */}
        <PostList
          posts={posts}
          emptyMessage="이 카테고리에 게시된 글이 없습니다."
        />
      </section>
    </Container>
  )
}
