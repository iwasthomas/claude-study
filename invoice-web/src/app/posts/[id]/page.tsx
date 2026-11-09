import { Container } from '@/components/layout/container'

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <Container>
      <section className="py-12">
        <h1 className="text-3xl font-bold tracking-tight">글 상세</h1>
        <p className="text-muted-foreground mt-4 break-all">id: {id}</p>
      </section>
    </Container>
  )
}
