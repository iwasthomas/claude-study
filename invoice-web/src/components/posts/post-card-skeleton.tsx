import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

// 글 카드 로딩 스켈레톤
export function PostCardSkeleton() {
  return (
    <Card className="h-full gap-4" aria-hidden="true">
      <CardHeader>
        <Skeleton className="h-6 w-4/5" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  )
}
