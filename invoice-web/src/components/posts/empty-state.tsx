import { FileText } from 'lucide-react'

import { cn } from '@/lib/utils'

// 글이 없을 때 표시하는 빈 상태
interface EmptyStateProps {
  message?: string
  className?: string
}

export function EmptyState({
  message = '아직 게시된 글이 없습니다.',
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-4 py-16 text-center',
        className
      )}
    >
      <FileText className="text-muted-foreground size-8" aria-hidden="true" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  )
}
