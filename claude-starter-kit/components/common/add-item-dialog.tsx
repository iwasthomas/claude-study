"use client"

import * as React from "react"
import { toast } from "sonner"

import { FormField } from "@/components/common/form-field"
import { Button } from "@/components/ui/button"
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
import { Plus } from "lucide-react"

/** 다이얼로그 + 폼 조합 예시. 제출하면 토스트를 띄웁니다. */
export function AddItemDialog() {
  const [title, setTitle] = React.useState("")
  const [error, setError] = React.useState<string>()
  const [open, setOpen] = React.useState(false)

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!title.trim()) {
      setError("제목을 입력해 주세요.")
      return
    }
    toast.success(`"${title}" 항목을 추가했습니다.`)
    setTitle("")
    setError(undefined)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Plus />새 항목
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} noValidate>
          <DialogHeader>
            <DialogTitle>새 항목 추가</DialogTitle>
            <DialogDescription>제목을 입력하고 추가 버튼을 누르세요.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <FormField id="item-title" label="제목" required error={error}>
              <Input
                id="item-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                aria-invalid={!!error}
                placeholder="예: 로그인 페이지 작업"
              />
            </FormField>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" type="button" />}>취소</DialogClose>
            <Button type="submit">추가</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
