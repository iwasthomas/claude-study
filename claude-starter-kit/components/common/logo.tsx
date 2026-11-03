import Link from "next/link"
import { Boxes } from "lucide-react"

import { siteConfig } from "@/config/site"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold">
      <Boxes className="size-5" aria-hidden />
      <span>{siteConfig.name}</span>
    </Link>
  )
}
