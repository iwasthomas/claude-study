import { Settings } from "lucide-react"

import { Breadcrumbs } from "@/components/common/breadcrumbs"
import { EmptyState } from "@/components/common/empty-state"
import { PageHeader } from "@/components/common/page-header"

export default function SettingsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { title: "홈", href: "/" },
          { title: "대시보드", href: "/dashboard" },
          { title: "설정" },
        ]}
      />
      <PageHeader title="설정" description="계정과 서비스 설정을 관리합니다." />
      <EmptyState
        icon={Settings}
        title="설정 항목 준비 중"
        description="필요한 설정 화면을 이 페이지에 추가해 사용하세요."
      />
    </>
  )
}
