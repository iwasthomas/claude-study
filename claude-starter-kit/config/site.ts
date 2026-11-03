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
  /** 상단 메뉴의 "샘플" 항목에 마우스를 올리면 나오는 예제 목록 */
  sampleNav: [
    { title: "버튼", href: "/examples/buttons" },
    { title: "컨트롤", href: "/examples/controls" },
    { title: "그리드", href: "/examples/grid" },
    { title: "레이아웃", href: "/examples/layouts" },
  ] satisfies NavItem[],
}

export const dashboardNav = [
  { title: "개요", href: "/dashboard", icon: LayoutDashboard },
  { title: "설정", href: "/dashboard/settings", icon: Settings },
] as const
