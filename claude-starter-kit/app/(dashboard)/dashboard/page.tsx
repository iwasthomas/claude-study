import { CircleCheck, Clock, FolderKanban, Users } from "lucide-react"

import { AddItemDialog } from "@/components/common/add-item-dialog"
import { Breadcrumbs } from "@/components/common/breadcrumbs"
import { PageHeader } from "@/components/common/page-header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const stats = [
  { title: "전체 항목", value: "12", icon: FolderKanban },
  { title: "진행 중", value: "5", icon: Clock },
  { title: "완료", value: "7", icon: CircleCheck },
  { title: "팀원", value: "8", icon: Users },
]

type Status = "진행 중" | "완료"

const items: { id: number; title: string; status: Status; owner: string }[] = [
  { id: 1, title: "랜딩 페이지 디자인", status: "완료", owner: "김디자인" },
  { id: 2, title: "로그인 기능 구현", status: "진행 중", owner: "이개발" },
  { id: 3, title: "API 명세 작성", status: "완료", owner: "박기획" },
  { id: 4, title: "대시보드 차트 추가", status: "진행 중", owner: "이개발" },
  { id: 5, title: "접근성 점검", status: "진행 중", owner: "최QA" },
]

function ItemTable({ rows }: { rows: typeof items }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">번호</TableHead>
          <TableHead>제목</TableHead>
          <TableHead>담당자</TableHead>
          <TableHead className="text-right">상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell className="font-medium">{row.title}</TableCell>
            <TableCell>{row.owner}</TableCell>
            <TableCell className="text-right">
              <Badge variant={row.status === "완료" ? "secondary" : "outline"}>{row.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function DashboardPage() {
  return (
    <>
      <Breadcrumbs items={[{ title: "홈", href: "/" }, { title: "대시보드" }]} />
      <PageHeader
        title="개요"
        description="프로젝트 현황을 한눈에 확인하세요."
        actions={<AddItemDialog />}
      />

      <section aria-label="요약 지표" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} size="sm">
            <CardHeader>
              <CardDescription>{stat.title}</CardDescription>
              <CardTitle className="flex items-center justify-between text-2xl">
                {stat.value}
                <stat.icon className="text-muted-foreground size-5" aria-hidden />
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>항목 목록</CardTitle>
          <CardDescription>상태별로 필터링해서 볼 수 있습니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="progress">진행 중</TabsTrigger>
              <TabsTrigger value="done">완료</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-4">
              <ItemTable rows={items} />
            </TabsContent>
            <TabsContent value="progress" className="pt-4">
              <ItemTable rows={items.filter((i) => i.status === "진행 중")} />
            </TabsContent>
            <TabsContent value="done" className="pt-4">
              <ItemTable rows={items.filter((i) => i.status === "완료")} />
            </TabsContent>
          </Tabs>

          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" text="이전" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" text="다음" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </>
  )
}
