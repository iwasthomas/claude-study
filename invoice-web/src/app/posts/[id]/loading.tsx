import { Container } from '@/components/layout/container'
import { Skeleton } from '@/components/ui/skeleton'

// 글 상세 로딩 화면
export default function PostLoading() {
  return (
    <Container>
      <section
        className="mx-auto w-full max-w-prose py-12"
        aria-busy="true"
        aria-label="불러오는 중"
      >
        <Skeleton className="mb-8 h-4 w-20" />
        <Skeleton className="h-9 w-4/5" />
        <div className="mt-4 flex gap-3">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="mt-10 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </section>
    </Container>
  )
}
