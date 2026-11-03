"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="테마 변경" />}>
        {/* 아이콘은 CSS로만 전환해 SSR/하이드레이션 불일치를 피합니다. */}
        <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>라이트</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>다크</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>시스템</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
