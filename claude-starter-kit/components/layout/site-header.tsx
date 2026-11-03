import Link from "next/link"

import { Logo } from "@/components/common/logo"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { Container } from "@/components/layout/container"
import { MobileNav } from "@/components/layout/mobile-nav"
import { siteConfig } from "@/config/site"

export function SiteHeader() {
  return (
    <header className="bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur">
      <Container className="flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MobileNav />
          <Logo />
        </div>

        <nav className="hidden items-center gap-6 text-sm md:flex" aria-label="주 메뉴">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
        </div>
      </Container>
    </header>
  )
}
