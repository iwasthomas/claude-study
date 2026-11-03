"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { siteConfig } from "@/config/site"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="메뉴 열기" />}
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>{siteConfig.name}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4" aria-label="모바일 메뉴">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="hover:bg-muted rounded-md px-3 py-2 text-sm font-medium"
            >
              {item.title}
            </Link>
          ))}
          <p className="text-muted-foreground px-3 pt-3 pb-1 text-xs font-medium">샘플</p>
          {siteConfig.sampleNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="hover:bg-muted rounded-md px-3 py-2 pl-6 text-sm font-medium"
            >
              {item.title}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="hover:bg-muted mt-2 rounded-md border-t px-3 py-2 pt-3 text-sm font-medium"
          >
            로그인 <span className="text-muted-foreground text-xs">(샘플)</span>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
