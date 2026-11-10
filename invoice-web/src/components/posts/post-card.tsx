import Link from 'next/link'

import { PostMeta } from '@/components/posts/post-meta'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { PostSummary } from '@/lib/schemas/post'

// 글 카드: 카드 전체가 상세 페이지 링크
interface PostCardProps {
  post: PostSummary
  className?: string
}

export function PostCard({ post, className }: PostCardProps) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className={cn(
        'focus-visible:ring-ring/50 focus-visible:border-ring group block h-full rounded-xl outline-none focus-visible:ring-[3px]',
        className
      )}
    >
      <Card className="group-hover:border-foreground/30 h-full gap-4 transition-[border-color,box-shadow] group-hover:shadow-md">
        <CardHeader>
          <CardTitle className="line-clamp-3 text-lg leading-snug [overflow-wrap:anywhere] break-keep">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-auto">
          <PostMeta
            category={post.category}
            published={post.published}
            tags={post.tags}
          />
        </CardContent>
      </Card>
    </Link>
  )
}
