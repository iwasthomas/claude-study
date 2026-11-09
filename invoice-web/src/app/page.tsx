import { Container } from '@/components/layout/container'

export default function Home() {
  return (
    <Container>
      <section className="py-12">
        <h1 className="text-3xl font-bold tracking-tight">최근 글</h1>
        <p className="text-muted-foreground mt-4">아직 발행된 글이 없습니다.</p>
      </section>
    </Container>
  )
}
