import { EmptyState } from '@/components/posts/empty-state'
import { PostCard } from '@/components/posts/post-card'
import type { PostSummary } from '@/lib/schemas/post'

// 글 목록: 비어 있으면 빈 상태 표시
interface PostListProps {
  posts: PostSummary[]
  emptyMessage?: string
}

export function PostList({ posts, emptyMessage }: PostListProps) {
  if (posts.length === 0) {
    return <EmptyState message={emptyMessage} />
  }

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {posts.map(post => (
        <li key={post.id} className="min-w-0">
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}
