import { Container } from '@/components/layout/container'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const category = decodeURIComponent(name)

  return (
    <Container>
      <section className="py-12">
        <h1 className="text-3xl font-bold tracking-tight">{category}</h1>
        <p className="text-muted-foreground mt-4">카테고리별 글 목록</p>
      </section>
    </Container>
  )
}
