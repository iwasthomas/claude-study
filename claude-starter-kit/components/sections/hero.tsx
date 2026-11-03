import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Badge variant="secondary">Next.js 16 · TypeScript · Tailwind CSS v4</Badge>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          빠르게 시작하는 웹 개발 스타터킷
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          레이아웃, 테마, 공통 컴포넌트가 준비되어 있어 바로 기능 개발에 집중할 수 있습니다.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" nativeButton={false} render={<Link href="/dashboard" />}>
            대시보드 보기
            <ArrowRight />
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<a href="https://ui.shadcn.com" target="_blank" rel="noreferrer" />}
          >
            shadcn/ui 문서
          </Button>
        </div>
      </Container>
    </section>
  )
}
