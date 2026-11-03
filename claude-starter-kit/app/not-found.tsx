import Link from "next/link"

import { Container } from "@/components/layout/container"
import { buttonVariants } from "@/components/ui/button"

export default function NotFound() {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-muted-foreground text-sm font-medium">404</p>
      <h1 className="text-3xl font-bold tracking-tight">페이지를 찾을 수 없습니다</h1>
      <p className="text-muted-foreground">요청하신 주소가 없거나 이동되었을 수 있습니다.</p>
      <Link href="/" className={buttonVariants({ className: "mt-2" })}>
        홈으로 돌아가기
      </Link>
    </Container>
  )
}
