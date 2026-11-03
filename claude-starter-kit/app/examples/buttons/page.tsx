import { ArrowRight, Download, Loader2, Mail, Plus, Settings, Trash2 } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { ExampleSection } from "@/components/common/example-section"
import { PageHeader } from "@/components/common/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

export const metadata: Metadata = { title: "버튼 예제" }

const variants = ["default", "outline", "secondary", "ghost", "destructive", "link"] as const
const sizes = ["xs", "sm", "default", "lg"] as const
const iconSizes = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const

export default function ButtonsExamplePage() {
  return (
    <Container className="space-y-10 py-10">
      <PageHeader title="버튼" description="Button과 Badge의 variant, 크기, 상태 예제입니다." />

      <ExampleSection
        title="Variant"
        description="6가지 스타일입니다. 기본값은 default입니다."
        previewClassName="flex flex-wrap items-center gap-3"
        code={`<Button variant="outline">outline</Button>`}
      >
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </ExampleSection>

      <ExampleSection
        title="크기"
        description="xs, sm, default, lg 네 가지 텍스트 버튼 크기입니다."
        previewClassName="flex flex-wrap items-center gap-3"
        code={`<Button size="lg">lg</Button>`}
      >
        {sizes.map((size) => (
          <Button key={size} size={size}>
            {size}
          </Button>
        ))}
      </ExampleSection>

      <ExampleSection
        title="아이콘 버튼"
        description="아이콘만 있는 정사각형 버튼입니다. 접근성을 위해 aria-label을 꼭 넣습니다."
        previewClassName="flex flex-wrap items-center gap-3"
        code={`<Button size="icon" aria-label="설정"><Settings /></Button>`}
      >
        {iconSizes.map((size) => (
          <Button key={size} size={size} variant="outline" aria-label={`설정 (${size})`}>
            <Settings />
          </Button>
        ))}
      </ExampleSection>

      <ExampleSection
        title="아이콘 + 텍스트"
        description="data-icon 속성으로 아이콘 쪽 여백이 자동 조정됩니다."
        previewClassName="flex flex-wrap items-center gap-3"
        code={`<Button>
  <Mail data-icon="inline-start" />
  메일 보내기
</Button>`}
      >
        <Button>
          <Mail data-icon="inline-start" />
          메일 보내기
        </Button>
        <Button variant="outline">
          다음
          <ArrowRight data-icon="inline-end" />
        </Button>
        <Button variant="secondary">
          <Download data-icon="inline-start" />
          다운로드
        </Button>
        <Button variant="destructive">
          <Trash2 data-icon="inline-start" />
          삭제
        </Button>
      </ExampleSection>

      <ExampleSection
        title="상태"
        description="비활성화와 로딩 상태입니다. 로딩은 disabled와 회전 아이콘을 함께 씁니다."
        previewClassName="flex flex-wrap items-center gap-3"
        code={`<Button disabled>
  <Loader2 className="animate-spin" />
  저장 중
</Button>`}
      >
        <Button disabled>비활성</Button>
        <Button variant="outline" disabled>
          비활성
        </Button>
        <Button disabled>
          <Loader2 className="animate-spin" data-icon="inline-start" />
          저장 중
        </Button>
        <Button variant="outline" aria-invalid>
          오류 상태
        </Button>
      </ExampleSection>

      <ExampleSection
        title="링크 버튼"
        description="Link나 a로 렌더링할 때는 render와 nativeButton={false}를 함께 씁니다."
        previewClassName="flex flex-wrap items-center gap-3"
        code={`<Button nativeButton={false} render={<Link href="/dashboard" />}>
  대시보드
</Button>`}
      >
        <Button nativeButton={false} render={<Link href="/dashboard" />}>
          내부 링크
          <ArrowRight data-icon="inline-end" />
        </Button>
        <Button
          variant="outline"
          nativeButton={false}
          render={<a href="https://ui.shadcn.com" target="_blank" rel="noreferrer" />}
        >
          외부 링크
        </Button>
        <Button variant="link" nativeButton={false} render={<Link href="/" />}>
          텍스트 링크
        </Button>
      </ExampleSection>

      <ExampleSection
        title="버튼 그룹"
        description="flex와 gap으로 묶습니다. 모바일에서는 세로로 쌓을 수 있습니다."
        previewClassName="space-y-4"
        code={`<div className="flex flex-col gap-2 sm:flex-row">...</div>`}
      >
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button>
            <Plus data-icon="inline-start" />
            추가
          </Button>
          <Button variant="outline">취소</Button>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="ghost">이전</Button>
          <Button variant="secondary">임시 저장</Button>
          <Button>저장</Button>
        </div>
        <Button className="w-full">전체 너비 버튼</Button>
      </ExampleSection>

      <ExampleSection
        title="Badge"
        description="상태나 분류를 표시합니다. variant는 Button과 같은 6종입니다."
        previewClassName="flex flex-wrap items-center gap-3"
        code={`<Badge variant="secondary">secondary</Badge>`}
      >
        {variants.map((variant) => (
          <Badge key={variant} variant={variant}>
            {variant}
          </Badge>
        ))}
        <Badge variant="outline">
          <Mail data-icon="inline-start" />
          아이콘 포함
        </Badge>
      </ExampleSection>
    </Container>
  )
}
