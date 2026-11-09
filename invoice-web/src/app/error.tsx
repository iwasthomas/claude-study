'use client'

import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <Container>
      <section className="py-12">
        <h1 className="text-3xl font-bold tracking-tight">
          문제가 발생했습니다
        </h1>
        <p className="text-muted-foreground mt-4">
          잠시 후 다시 시도해 주세요.
        </p>
        <Button onClick={reset} className="mt-6">
          다시 시도
        </Button>
      </section>
    </Container>
  )
}
