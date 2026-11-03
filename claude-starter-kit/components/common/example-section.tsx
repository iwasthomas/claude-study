import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type ExampleSectionProps = {
  id?: string
  title: string
  description?: string
  children: ReactNode
  /** 복사해서 쓸 수 있도록 미리보기 아래에 보여줄 코드 */
  code?: string
  className?: string
  /** 미리보기 영역에 적용할 클래스 */
  previewClassName?: string
}

/** 예제 한 건(제목, 설명, 미리보기, 코드)을 감싸는 공용 블록. */
export function ExampleSection({
  id,
  title,
  description,
  children,
  code,
  className,
  previewClassName,
}: ExampleSectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-20 space-y-3", className)}>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
      <div className={cn("bg-card rounded-xl border p-6", previewClassName)}>{children}</div>
      {code && (
        <pre className="bg-muted overflow-x-auto rounded-lg border p-4 text-sm">
          <code>{code}</code>
        </pre>
      )}
    </section>
  )
}
