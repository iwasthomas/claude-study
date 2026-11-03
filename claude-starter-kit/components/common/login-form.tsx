"use client"

import { useRef, useState, type FormEvent } from "react"
import { toast } from "sonner"

import { FormField } from "@/components/common/form-field"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** 이메일/비밀번호 로그인 카드. 인증 기능이 없는 샘플 화면입니다. */
export function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [alert, setAlert] = useState<{ field: "email" | "password"; message: string }>({
    field: "email",
    message: "",
  })
  const [alertOpen, setAlertOpen] = useState(false)

  // 닫힌 뒤에도 alert 내용을 유지해야 닫을 때 올바른 입력으로 포커스가 돌아갑니다.
  function showAlert(field: "email" | "password", message: string) {
    setAlert({ field, message })
    setAlertOpen(true)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get("email") ?? "").trim()
    const password = String(data.get("password") ?? "")

    // 브라우저 기본 검증 말풍선 대신 다이얼로그로 첫 번째 오류만 알립니다.
    if (!email) {
      showAlert("email", "이메일을 입력해 주세요.")
    } else if (!EMAIL_PATTERN.test(email)) {
      showAlert("email", "올바른 이메일 형식이 아닙니다.")
    } else if (!password) {
      showAlert("password", "비밀번호를 입력해 주세요.")
    } else {
      toast.info("샘플 화면입니다. 실제 로그인은 동작하지 않습니다.")
    }
  }

  return (
    <Card className="w-full max-w-sm shadow-sm [--card-spacing:--spacing(6)]">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">로그인</CardTitle>
        <CardDescription>이메일과 비밀번호를 입력해 로그인하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} noValidate className="grid gap-5">
          <FormField id="email" label="이메일" required>
            <Input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              aria-required
            />
          </FormField>
          <FormField id="password" label="비밀번호" required>
            <Input
              ref={passwordRef}
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              autoComplete="current-password"
              aria-required
            />
          </FormField>
          <Button type="submit" size="lg" className="w-full">
            로그인하기
          </Button>
        </form>
        <p className="text-muted-foreground mt-6 text-center text-sm">
          계정이 없으신가요?{" "}
          <Dialog>
            <DialogTrigger
              render={
                <button
                  type="button"
                  className="text-foreground font-medium underline-offset-4 hover:underline"
                />
              }
            >
              회원가입
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>구현 예정</DialogTitle>
                <DialogDescription>
                  회원가입 기능은 아직 구현되지 않았습니다. 샘플 화면입니다.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" type="button" />}>확인</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </p>
      </CardContent>

      <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
        <DialogContent finalFocus={alert.field === "password" ? passwordRef : emailRef}>
          <DialogHeader>
            <DialogTitle>입력 확인</DialogTitle>
            <DialogDescription>{alert.message}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button type="button" />}>확인</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
