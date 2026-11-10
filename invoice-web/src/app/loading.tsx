import { Container } from '@/components/layout/container'
import { PostCardSkeleton } from '@/components/posts/post-card-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

// 목록 계열 페이지(홈, 카테고리)의 로딩 화면
export default function Loading() {
  return (
    <Container>
      <section className="py-12" aria-busy="true" aria-label="불러오는 중">
        <Skeleton className="mb-8 h-9 w-40" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </Container>
  )
}
