import type { Metadata } from "next"

import { LoginForm } from "@/components/common/login-form"

export const metadata: Metadata = {
  title: "로그인",
}

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-10 sm:py-16">
      <LoginForm />
    </div>
  )
}
