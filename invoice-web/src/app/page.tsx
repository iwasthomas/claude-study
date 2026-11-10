import { Container } from '@/components/layout/container'
import { PostList } from '@/components/posts/post-list'
import { getPublishedPosts } from '@/lib/notion/posts'

// D-4: 목록은 ISR, 60초마다 재검증
export const revalidate = 60

export default async function Home() {
  const posts = await getPublishedPosts()

  return (
    <Container>
      <section className="py-12">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">최근 글</h1>
        <PostList posts={posts} />
      </section>
    </Container>
  )
}
