"use client"

import { flushSync } from "react-dom"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

/**
 * 클릭하면 라이트/다크 모드를 전환하는 버튼.
 * View Transitions를 지원하면 화면 전체가 부드럽게 크로스페이드되고(globals.css),
 * 미지원이거나 모션 줄이기 설정이면 즉시 전환합니다.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  function handleClick() {
    const next = resolvedTheme === "dark" ? "light" : "dark"
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!document.startViewTransition || reduceMotion) {
      setTheme(next)
      return
    }

    document.startViewTransition(() => {
      flushSync(() => setTheme(next))
    })
  }

  return (
    <Button variant="ghost" size="icon" aria-label="라이트/다크 모드 전환" onClick={handleClick}>
      {/* 아이콘은 CSS로만 전환해 SSR/하이드레이션 불일치를 피합니다. */}
      <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  )
}
