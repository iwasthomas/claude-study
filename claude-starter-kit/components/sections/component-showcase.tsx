"use client"

import * as React from "react"
import { toast } from "sonner"

import { FormField } from "@/components/common/form-field"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Info } from "lucide-react"

const roles = [
  { value: "developer", label: "개발자" },
  { value: "designer", label: "디자이너" },
  { value: "planner", label: "기획자" },
]

/** 폼 컴포넌트 사용 예시. 실제 프로젝트에서는 이 파일을 참고해 복사해 쓰면 됩니다. */
export function ComponentShowcase() {
  const [name, setName] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [role, setRole] = React.useState("developer")
  const [agree, setAgree] = React.useState(false)
  const [notify, setNotify] = React.useState(true)
  const [errors, setErrors] = React.useState<{ name?: string; message?: string }>({})

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: typeof errors = {}
    if (!name.trim()) nextErrors.name = "이름을 입력해 주세요."
    if (message.trim().length < 5) nextErrors.message = "메시지는 5자 이상 입력해 주세요."
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    toast.success(`${name}님, 제출되었습니다.`)
  }

  return (
    <section aria-labelledby="showcase-heading" className="space-y-6">
      <div className="space-y-1">
        <h2 id="showcase-heading" className="text-2xl font-bold tracking-tight">
          컴포넌트 예시
        </h2>
        <p className="text-muted-foreground">
          shadcn/ui 컴포넌트와 FormField 래퍼를 조합한 예시입니다.
        </p>
      </div>

      <Alert>
        <Info />
        <AlertTitle>안내</AlertTitle>
        <AlertDescription>빈 값으로 제출하면 필드별 에러 메시지가 표시됩니다.</AlertDescription>
      </Alert>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>문의 폼</CardTitle>
            <CardDescription>입력 검증과 토스트 알림을 보여줍니다.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit} noValidate>
            <CardContent className="grid gap-4">
              <FormField id="name" label="이름" required error={errors.name}>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={!!errors.name}
                  placeholder="홍길동"
                />
              </FormField>

              <FormField id="role" label="직군" description="가장 가까운 직군을 선택하세요.">
                <Select value={role} onValueChange={(value) => setRole(value ?? "developer")}>
                  <SelectTrigger id="role" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField id="message" label="메시지" required error={errors.message}>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-invalid={!!errors.message}
                  placeholder="내용을 입력하세요"
                />
              </FormField>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="agree"
                  checked={agree}
                  onCheckedChange={(checked) => setAgree(checked === true)}
                />
                <label htmlFor="agree" className="text-sm">
                  개인정보 수집에 동의합니다
                </label>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="notify" className="text-sm">
                  답변 알림 받기
                </label>
                <Switch id="notify" checked={notify} onCheckedChange={setNotify} />
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button
                type="reset"
                variant="outline"
                onClick={() => {
                  setName("")
                  setMessage("")
                  setErrors({})
                }}
              >
                초기화
              </Button>
              <Button type="submit" disabled={!agree}>
                제출
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>표시 요소</CardTitle>
            <CardDescription>배지, 아바타 등 정보 표시용 컴포넌트입니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge>기본</Badge>
              <Badge variant="secondary">보조</Badge>
              <Badge variant="outline">외곽선</Badge>
              <Badge variant="destructive">위험</Badge>
            </div>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>SK</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">Starter Kit</p>
                <p className="text-muted-foreground">
                  {role === "developer" ? "개발자" : roles.find((r) => r.value === role)?.label}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => toast("토스트 알림 예시입니다.")}>
                토스트 띄우기
              </Button>
              <Button variant="ghost">고스트</Button>
              <Button variant="link">링크</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
