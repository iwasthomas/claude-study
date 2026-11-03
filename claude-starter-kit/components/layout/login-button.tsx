"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

/** 헤더 우측 로그인 진입 버튼. hover/포커스 시 샘플 페이지임을 안내합니다. */
export function LoginButton() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link href="/login" />}
          />
        }
      >
        로그인
      </TooltipTrigger>
      <TooltipContent side="bottom">샘플 페이지</TooltipContent>
    </Tooltip>
  )
}
