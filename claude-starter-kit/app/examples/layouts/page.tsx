import type { Metadata } from "next"
import type { ReactNode } from "react"

import { ExampleSection } from "@/components/common/example-section"
import { PageHeader } from "@/components/common/page-header"
import { Container } from "@/components/layout/container"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "레이아웃 예제" }

/** 레이아웃의 한 영역을 표시하는 데모용 박스. */
function Area({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "bg-muted text-muted-foreground flex items-center justify-center rounded-md border p-3 text-sm font-medium",
        className
      )}
    >
      {children}
    </div>
  )
}

export default function LayoutsExamplePage() {
  return (
    <Container className="space-y-10 py-10">
      <PageHeader
        title="레이아웃"
        description="사이드바, 헤더-본문-푸터, 2단 분할 등 페이지 레이아웃 예제입니다."
      />

      <ExampleSection
        title="사이드바 + 콘텐츠"
        description="좁은 화면에서는 세로로 쌓이고, md 이상에서 고정 너비 사이드바가 생깁니다."
        previewClassName="grid gap-4 md:grid-cols-[12rem_1fr]"
        code={`<div className="grid gap-4 md:grid-cols-[12rem_1fr]">
  <aside>사이드바</aside>
  <main>콘텐츠</main>
</div>`}
      >
        <Area className="min-h-24 md:min-h-56">사이드바</Area>
        <Area className="min-h-56">콘텐츠</Area>
      </ExampleSection>

      <ExampleSection
        title="헤더 - 본문 - 푸터"
        description="본문이 남는 높이를 채웁니다. flex-col과 flex-1을 씁니다."
        previewClassName="flex h-72 flex-col gap-3"
        code={`<div className="flex min-h-screen flex-col">
  <header />
  <main className="flex-1" />
  <footer />
</div>`}
      >
        <Area>헤더</Area>
        <Area className="flex-1">본문 (flex-1)</Area>
        <Area>푸터</Area>
      </ExampleSection>

      <ExampleSection
        title="헤더 - 사이드바 - 본문 - 푸터 (Holy Grail)"
        description="전통적인 3단 구성입니다. 그리드 영역 이름으로 배치하기 쉽습니다."
        previewClassName="grid h-80 grid-cols-[8rem_1fr_8rem] grid-rows-[auto_1fr_auto] gap-3"
        code={`<div className="grid grid-cols-[8rem_1fr_8rem] grid-rows-[auto_1fr_auto] gap-3">
  <header className="col-span-3" />
  <nav /><main /><aside />
  <footer className="col-span-3" />
</div>`}
      >
        <Area className="col-span-3">헤더</Area>
        <Area>내비게이션</Area>
        <Area>본문</Area>
        <Area>보조</Area>
        <Area className="col-span-3">푸터</Area>
      </ExampleSection>

      <ExampleSection
        title="2단 분할"
        description="같은 비율로 나누거나 한쪽을 더 넓게 줄 수 있습니다."
        previewClassName="space-y-4"
        code={`<div className="grid gap-4 md:grid-cols-[2fr_1fr]">...</div>`}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Area className="min-h-28">1 : 1</Area>
          <Area className="min-h-28">1 : 1</Area>
        </div>
        <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
          <Area className="min-h-28">2</Area>
          <Area className="min-h-28">1</Area>
        </div>
      </ExampleSection>

      <ExampleSection
        title="중앙 정렬 단일 컬럼"
        description="글 읽기에 알맞은 최대 너비를 주고 가운데에 둡니다."
        code={`<div className="mx-auto w-full max-w-2xl">...</div>`}
      >
        <div className="mx-auto w-full max-w-md">
          <Area className="min-h-32">max-w-md 가운데 정렬</Area>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Sticky 사이드 패널"
        description="아래 상자 안을 스크롤하면 오른쪽 패널이 상단에 고정됩니다."
        previewClassName="p-0"
        code={`<aside className="sticky top-4 self-start">...</aside>`}
      >
        <div className="h-72 overflow-y-auto p-4">
          <div className="grid items-start gap-4 md:grid-cols-[1fr_12rem]">
            <Area className="min-h-[40rem]">긴 콘텐츠 (스크롤해 보세요)</Area>
            <Area className="bg-primary text-primary-foreground sticky top-0 min-h-24">
              고정 패널
            </Area>
          </div>
        </div>
      </ExampleSection>
    </Container>
  )
}
