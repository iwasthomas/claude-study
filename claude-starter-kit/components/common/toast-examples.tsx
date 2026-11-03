"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

/** sonner 토스트 종류별 호출 예제. 루트 레이아웃의 Toaster가 렌더링합니다. */
export function ToastExamples() {
  return (
    <>
      <Button variant="outline" onClick={() => toast("기본 알림입니다.")}>
        기본
      </Button>
      <Button variant="outline" onClick={() => toast.success("저장했습니다.")}>
        성공
      </Button>
      <Button variant="outline" onClick={() => toast.error("저장하지 못했습니다.")}>
        오류
      </Button>
      <Button variant="outline" onClick={() => toast.info("새 소식이 있습니다.")}>
        정보
      </Button>
      <Button variant="outline" onClick={() => toast.warning("용량이 거의 찼습니다.")}>
        경고
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("항목을 삭제했습니다.", {
            description: "되돌리려면 실행 취소를 누르세요.",
            action: { label: "실행 취소", onClick: () => toast.success("복구했습니다.") },
          })
        }
      >
        액션 포함
      </Button>
    </>
  )
}
