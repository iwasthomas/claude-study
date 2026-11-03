"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { siteConfig } from "@/config/site"

/** 상단 메뉴의 "샘플" 항목. 마우스를 올리면 예제 목록이 열립니다. */
export function SampleMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        openOnHover
        delay={100}
        className="text-muted-foreground hover:text-foreground aria-expanded:text-foreground inline-flex items-center gap-1 transition-colors outline-none focus-visible:underline"
      >
        샘플
        <ChevronDown className="size-3.5" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-40">
        {siteConfig.sampleNav.map((item) => (
          <DropdownMenuItem key={item.href} render={<Link href={item.href} />}>
            {item.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
