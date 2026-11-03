import type { ReactNode } from "react"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type FormFieldProps = {
  id: string
  label: string
  children: ReactNode
  required?: boolean
  description?: string
  error?: string
  className?: string
}

/**
 * Label, 입력 컨트롤, 설명, 에러 메시지를 묶는 폼 필드 래퍼.
 * children에는 id가 같은 Input/Textarea/Select 등을 넣습니다.
 */
export function FormField({
  id,
  label,
  children,
  required,
  description,
  error,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={id}>
        {label}
        {required && (
          <span className="text-destructive" aria-hidden>
            *
          </span>
        )}
      </Label>
      {children}
      {description && !error && (
        <p id={`${id}-description`} className="text-muted-foreground text-sm">
          {description}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-destructive text-sm">
          {error}
        </p>
      )}
    </div>
  )
}
