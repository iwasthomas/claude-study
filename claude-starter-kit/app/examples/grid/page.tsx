import type { Metadata } from "next"

import { ExampleSection } from "@/components/common/example-section"
import { PageHeader } from "@/components/common/page-header"
import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "그리드 예제" }

/** 그리드 칸을 표시하는 데모용 박스. */
function Cell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "bg-muted text-muted-foreground flex min-h-16 items-center justify-center rounded-lg border text-sm font-medium",
        className
      )}
    >
      {children}
    </div>
  )
}

const range = (count: number) => Array.from({ length: count }, (_, i) => i + 1)

const features = [
  { title: "빠른 시작", description: "설정 없이 바로 개발을 시작합니다." },
  { title: "다크 모드", description: "시스템 설정을 따라가고 직접 전환할 수 있습니다." },
  { title: "접근성", description: "건너뛰기 링크와 aria 속성을 기본 제공합니다." },
  { title: "타입 안전", description: "TypeScript로 작성되어 있습니다." },
]

export default function GridExamplePage() {
  return (
    <Container className="space-y-10 py-10">
      <PageHeader title="그리드" description="반응형, 고정 열, 벤토, auto-fit 그리드 예제입니다." />

      <ExampleSection
        title="반응형 열"
        description="화면 너비에 따라 1열, 2열, 4열로 바뀝니다. 브라우저 너비를 조절해 보세요."
        previewClassName="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        code={`<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">...</div>`}
      >
        {range(8).map((n) => (
          <Cell key={n}>{n}</Cell>
        ))}
      </ExampleSection>

      <ExampleSection
        title="고정 열 (2 / 3 / 4)"
        description="grid-cols-N으로 열 개수를 고정합니다."
        previewClassName="space-y-4"
        code={`<div className="grid grid-cols-3 gap-4">...</div>`}
      >
        {[2, 3, 4].map((cols) => (
          <div key={cols} className="space-y-2">
            <Badge variant="outline">{cols}열</Badge>
            <div
              className={cn(
                "grid gap-4",
                cols === 2 && "grid-cols-2",
                cols === 3 && "grid-cols-3",
                cols === 4 && "grid-cols-4"
              )}
            >
              {range(cols).map((n) => (
                <Cell key={n}>{n}</Cell>
              ))}
            </div>
          </div>
        ))}
      </ExampleSection>

      <ExampleSection
        title="벤토 (col-span / row-span)"
        description="칸이 여러 열과 행을 차지하도록 합니다."
        previewClassName="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-3"
        code={`<div className="grid grid-cols-4 grid-rows-3 gap-4">
  <div className="col-span-2 row-span-2">큰 칸</div>
</div>`}
      >
        <Cell className="col-span-2 row-span-2 min-h-40">col-span-2 row-span-2</Cell>
        <Cell>1</Cell>
        <Cell>2</Cell>
        <Cell className="col-span-2">col-span-2</Cell>
        <Cell className="col-span-2 md:col-span-1 md:row-span-2">row-span-2</Cell>
        <Cell className="col-span-2">col-span-2</Cell>
        <Cell>3</Cell>
      </ExampleSection>

      <ExampleSection
        title="auto-fit (자동 채움)"
        description="칸 최소 너비만 정하면 열 개수가 자동으로 정해집니다. 미디어 쿼리가 필요 없습니다."
        previewClassName="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-4"
        code={`<div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-4">...</div>`}
      >
        {range(7).map((n) => (
          <Cell key={n}>{n}</Cell>
        ))}
      </ExampleSection>

      <ExampleSection
        title="간격 (gap)"
        description="gap, gap-x, gap-y로 간격을 조절합니다."
        previewClassName="space-y-4"
        code={`<div className="grid grid-cols-4 gap-x-8 gap-y-2">...</div>`}
      >
        {[
          { label: "gap-1", className: "gap-1" },
          { label: "gap-4", className: "gap-4" },
          { label: "gap-x-8 gap-y-2", className: "gap-x-8 gap-y-2" },
        ].map((item) => (
          <div key={item.label} className="space-y-2">
            <Badge variant="outline">{item.label}</Badge>
            <div className={cn("grid grid-cols-4", item.className)}>
              {range(8).map((n) => (
                <Cell key={n} className="min-h-10">
                  {n}
                </Cell>
              ))}
            </div>
          </div>
        ))}
      </ExampleSection>

      <ExampleSection
        title="카드 그리드"
        description="실제 화면에서 가장 많이 쓰는 형태입니다. 카드 높이가 같게 맞춰집니다."
        previewClassName="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        code={`<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  <Card>...</Card>
</div>`}
      >
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              카드 내용이 들어갑니다.
            </CardContent>
          </Card>
        ))}
      </ExampleSection>
    </Container>
  )
}
