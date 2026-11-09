import { Container } from '@/components/layout/container'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container>
          <section className="py-12">
            <h1 className="text-3xl font-bold tracking-tight">최근 글</h1>
            <p className="text-muted-foreground mt-4">
              아직 발행된 글이 없습니다.
            </p>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
