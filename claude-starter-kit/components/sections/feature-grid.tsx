import { Layers, MonitorSmartphone, Moon, Paintbrush, Rocket, ShieldCheck } from "lucide-react"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Rocket,
    title: "빠른 시작",
    description: "Next.js App Router 기반으로 바로 개발을 시작할 수 있습니다.",
  },
  {
    icon: Layers,
    title: "계층형 컴포넌트",
    description: "ui, common, layout, sections로 역할을 나눠 재사용성을 높였습니다.",
  },
  {
    icon: Paintbrush,
    title: "shadcn/ui 테마",
    description: "oklch 토큰 기반 테마를 그대로 가져와 커스터마이징이 쉽습니다.",
  },
  {
    icon: Moon,
    title: "다크 모드",
    description: "시스템 설정을 따르며 깜빡임 없이 라이트/다크를 전환합니다.",
  },
  {
    icon: MonitorSmartphone,
    title: "반응형 레이아웃",
    description: "모바일 드로어 내비와 컨테이너가 기본으로 포함됩니다.",
  },
  {
    icon: ShieldCheck,
    title: "접근성 고려",
    description: "스킵 링크, 라벨 연결, 에러 알림 등 기본 접근성을 갖췄습니다.",
  },
]

export function FeatureGrid() {
  return (
    <section aria-labelledby="features-heading" className="space-y-6">
      <h2 id="features-heading" className="text-2xl font-bold tracking-tight">
        주요 특징
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <Card key={title}>
            <CardHeader>
              <Icon className="text-muted-foreground size-5" aria-hidden />
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
