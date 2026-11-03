import { LayoutDashboard, Settings } from "lucide-react"

export type NavItem = {
  title: string
  href: string
}

export const siteConfig = {
  name: "Starter Kit",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description: "Next.js 16, TypeScript, Tailwind CSS, shadcn/ui로 만든 웹 개발 스타터킷",
  nav: [
    { title: "홈", href: "/" },
    { title: "대시보드", href: "/dashboard" },
  ] satisfies NavItem[],
}

export const dashboardNav = [
  { title: "개요", href: "/dashboard", icon: LayoutDashboard },
  { title: "설정", href: "/dashboard/settings", icon: Settings },
] as const
