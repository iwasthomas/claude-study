"use client"

import type { FormEvent } from "react"
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

/** 이메일/비밀번호 로그인 카드. 인증 기능이 없는 샘플 화면입니다. */
export function LoginForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    toast.info("샘플 화면입니다. 실제 로그인은 동작하지 않습니다.")
  }

  return (
    <Card className="w-full max-w-sm shadow-sm [--card-spacing:--spacing(6)]">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">로그인</CardTitle>
        <CardDescription>이메일과 비밀번호를 입력해 로그인하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-5">
          <FormField id="email" label="이메일" required>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              required
            />
          </FormField>
          <FormField id="password" label="비밀번호" required>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              autoComplete="current-password"
              required
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
    </Card>
  )
}
