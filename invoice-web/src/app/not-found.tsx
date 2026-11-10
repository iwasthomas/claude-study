import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <Container>
      <section className="py-12">
        <h1 className="text-3xl font-bold tracking-tight">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-muted-foreground mt-4">
          주소가 잘못되었거나 게시되지 않은 글입니다.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </section>
    </Container>
  )
}
