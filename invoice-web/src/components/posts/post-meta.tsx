import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { formatDate } from '@/components/posts/format-date'
import type { PostSummary } from '@/lib/schemas/post'

// 글 메타 정보 (카테고리, 발행일, 태그)
interface PostMetaProps {
  category: PostSummary['category']
  published: PostSummary['published']
  tags?: PostSummary['tags']
  // true면 카테고리 Badge가 /category/{이름} 링크가 됨 (상세 페이지용)
  linkCategory?: boolean
  className?: string
}

export function PostMeta({
  category,
  published,
  tags = [],
  linkCategory = false,
  className,
}: PostMetaProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {/* 카드 전체가 링크라 카드 안에서는 링크 중첩(<a> 안의 <a>)을 피해 linkCategory=false */}
        {linkCategory ? (
          <Badge asChild variant="secondary">
            <Link href={`/category/${encodeURIComponent(category)}`}>
              {category}
            </Link>
          </Badge>
        ) : (
          <Badge variant="secondary">{category}</Badge>
        )}
        <time dateTime={published} className="text-muted-foreground text-sm">
          {formatDate(published)}
        </time>
      </div>
      {tags.length > 0 && (
        <ul
          aria-label="태그"
          className="text-muted-foreground flex flex-wrap gap-x-2 gap-y-1 text-xs"
        >
          {tags.map(tag => (
            <li key={tag} className="max-w-full break-all">
              #{tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
