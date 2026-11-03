import type { ReactNode } from "react"

import { ThemeToggle } from "@/components/common/theme-toggle"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

/**
 * 사이드바 + 상단 바 + 콘텐츠 영역으로 구성된 앱형 레이아웃.
 * 사이트 헤더/푸터는 루트 layout이 담당하므로 이 셸은 그 안쪽 본문 영역에 들어갑니다.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
          </div>
          <ThemeToggle />
        </header>
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
