"use client"

import type { MouseEvent } from "react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

const TRANSITION_DURATION = 500

/**
 * 클릭하면 라이트/다크 모드를 전환하는 버튼.
 * View Transitions를 지원하면 클릭한 위치에서 원이 퍼지며 전환하고,
 * 미지원이거나 모션 줄이기 설정이면 즉시 전환합니다.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  async function handleClick(event: MouseEvent<HTMLButtonElement>) {
    const next = resolvedTheme === "dark" ? "light" : "dark"
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!document.startViewTransition || reduceMotion) {
      setTheme(next)
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next))
    })

    await transition.ready
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
      {
        duration: TRANSITION_DURATION,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }

  return (
    <Button variant="ghost" size="icon" aria-label="테마 변경" onClick={handleClick}>
      {/* 아이콘은 CSS로만 전환해 SSR/하이드레이션 불일치를 피합니다. */}
      <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  )
}
