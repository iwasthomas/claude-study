import { Home, Info, Inbox, Settings, TriangleAlert } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { AddItemDialog } from "@/components/common/add-item-dialog"
import { Breadcrumbs } from "@/components/common/breadcrumbs"
import { EmptyState } from "@/components/common/empty-state"
import { ExampleSection } from "@/components/common/example-section"
import { FormField } from "@/components/common/form-field"
import { PageHeader } from "@/components/common/page-header"
import { ToastExamples } from "@/components/common/toast-examples"
import { Container } from "@/components/layout/container"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export const metadata: Metadata = { title: "컨트롤 예제" }

const toc = [
  { id: "input", title: "Input" },
  { id: "textarea", title: "Textarea" },
  { id: "label", title: "Label" },
  { id: "checkbox", title: "Checkbox" },
  { id: "switch", title: "Switch" },
  { id: "select", title: "Select" },
  { id: "form-field", title: "FormField" },
  { id: "dialog", title: "Dialog" },
  { id: "sheet", title: "Sheet" },
  { id: "popover", title: "Popover" },
  { id: "tooltip", title: "Tooltip" },
  { id: "dropdown-menu", title: "DropdownMenu" },
  { id: "alert", title: "Alert" },
  { id: "toast", title: "Toast" },
  { id: "skeleton", title: "Skeleton" },
  { id: "empty-state", title: "EmptyState" },
  { id: "card", title: "Card" },
  { id: "avatar", title: "Avatar" },
  { id: "table", title: "Table" },
  { id: "separator", title: "Separator" },
  { id: "tabs", title: "Tabs" },
  { id: "pagination", title: "Pagination" },
  { id: "breadcrumb", title: "Breadcrumb" },
  { id: "sidebar", title: "Sidebar" },
]

const invoices = [
  { id: "INV-001", name: "홍길동", status: "결제 완료", amount: "120,000원" },
  { id: "INV-002", name: "김영희", status: "대기", amount: "85,000원" },
  { id: "INV-003", name: "이철수", status: "실패", amount: "42,000원" },
]

const sheetSides = [
  { side: "left", label: "왼쪽" },
  { side: "right", label: "오른쪽" },
  { side: "top", label: "위" },
  { side: "bottom", label: "아래" },
] as const

const roles = [
  { value: "developer", label: "개발자" },
  { value: "designer", label: "디자이너" },
  { value: "manager", label: "기획자" },
]

export default function ControlsExamplePage() {
  return (
    <Container className="space-y-10 py-10">
      <PageHeader
        title="컨트롤"
        description="폼, 오버레이, 피드백, 데이터 표시, 내비게이션 컨트롤 예제입니다."
      />

      <nav aria-label="예제 목차" className="flex flex-wrap gap-2">
        {toc.map((item) => (
          <Link
            key={item.id}
            href={`#${item.id}`}
            className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-md border px-2.5 py-1 text-xs transition-colors"
          >
            {item.title}
          </Link>
        ))}
      </nav>

      <h2 className="text-muted-foreground text-sm font-semibold">폼</h2>

      <ExampleSection
        id="input"
        title="Input"
        description="기본, 비활성, 오류 상태입니다. 오류는 aria-invalid로 표시합니다."
        previewClassName="grid gap-4 sm:grid-cols-3"
        code={`<Input placeholder="이름" aria-invalid />`}
      >
        <Input placeholder="기본" />
        <Input placeholder="비활성" disabled />
        <Input defaultValue="잘못된 값" aria-invalid />
      </ExampleSection>

      <ExampleSection
        id="textarea"
        title="Textarea"
        previewClassName="grid gap-4 sm:grid-cols-3"
        code={`<Textarea placeholder="내용을 입력하세요" />`}
      >
        <Textarea placeholder="기본" />
        <Textarea placeholder="비활성" disabled />
        <Textarea defaultValue="잘못된 값" aria-invalid />
      </ExampleSection>

      <ExampleSection
        id="label"
        title="Label"
        description="htmlFor와 입력의 id를 맞춰 클릭 시 포커스가 이동하게 합니다."
        previewClassName="grid max-w-sm gap-2"
        code={`<Label htmlFor="email">이메일</Label>
<Input id="email" type="email" />`}
      >
        <Label htmlFor="label-email">이메일</Label>
        <Input id="label-email" type="email" placeholder="you@example.com" />
      </ExampleSection>

      <ExampleSection
        id="checkbox"
        title="Checkbox"
        description="체크, 해제, 비활성 상태입니다."
        previewClassName="flex flex-wrap items-center gap-6"
        code={`<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">약관에 동의합니다</Label>
</div>`}
      >
        <div className="flex items-center gap-2">
          <Checkbox id="cb-default" />
          <Label htmlFor="cb-default">기본</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="cb-checked" defaultChecked />
          <Label htmlFor="cb-checked">체크됨</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="cb-disabled" disabled />
          <Label htmlFor="cb-disabled">비활성</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="cb-invalid" aria-invalid />
          <Label htmlFor="cb-invalid">오류</Label>
        </div>
      </ExampleSection>

      <ExampleSection
        id="switch"
        title="Switch"
        description="기본과 sm 크기, 켜짐, 비활성 상태입니다."
        previewClassName="flex flex-wrap items-center gap-6"
        code={`<Switch id="alarm" defaultChecked />`}
      >
        <div className="flex items-center gap-2">
          <Switch id="sw-default" />
          <Label htmlFor="sw-default">꺼짐</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="sw-on" defaultChecked />
          <Label htmlFor="sw-on">켜짐</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="sw-sm" size="sm" defaultChecked />
          <Label htmlFor="sw-sm">sm 크기</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="sw-disabled" disabled />
          <Label htmlFor="sw-disabled">비활성</Label>
        </div>
      </ExampleSection>

      <ExampleSection
        id="select"
        title="Select"
        description="items를 Root에 넘기면 선택한 값의 라벨이 트리거에 표시됩니다."
        previewClassName="flex flex-wrap items-center gap-4"
        code={`<Select items={roles} defaultValue="developer">
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {roles.map((r) => (
      <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
    ))}
  </SelectContent>
</Select>`}
      >
        <Select items={roles} defaultValue="developer">
          <SelectTrigger className="w-40" aria-label="역할 선택">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>역할</SelectLabel>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select items={roles}>
          <SelectTrigger size="sm" className="w-40" aria-label="역할 선택 (sm)">
            <SelectValue placeholder="sm 크기" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select items={roles} disabled>
          <SelectTrigger className="w-40" aria-label="역할 선택 (비활성)">
            <SelectValue placeholder="비활성" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </ExampleSection>

      <ExampleSection
        id="form-field"
        title="FormField"
        description="Label, 입력, 설명, 오류 메시지를 묶습니다. 오류가 있으면 설명 대신 오류가 보입니다."
        previewClassName="grid gap-6 sm:grid-cols-2"
        code={`<FormField id="name" label="이름" required error="이름을 입력해 주세요.">
  <Input id="name" aria-invalid />
</FormField>`}
      >
        <FormField id="ff-name" label="이름" required description="실명을 입력해 주세요.">
          <Input id="ff-name" placeholder="홍길동" />
        </FormField>
        <FormField id="ff-email" label="이메일" required error="올바른 이메일 형식이 아닙니다.">
          <Input id="ff-email" defaultValue="not-an-email" aria-invalid />
        </FormField>
        <FormField id="ff-bio" label="소개" description="최대 200자까지 쓸 수 있습니다.">
          <Textarea id="ff-bio" placeholder="자기소개" />
        </FormField>
        <FormField id="ff-disabled" label="아이디" description="변경할 수 없습니다.">
          <Input id="ff-disabled" defaultValue="starter" disabled />
        </FormField>
      </ExampleSection>

      <h2 className="text-muted-foreground text-sm font-semibold">오버레이</h2>

      <ExampleSection
        id="dialog"
        title="Dialog"
        description="트리거에는 render={<Button />}을 넘깁니다. 닫기 버튼은 DialogClose를 씁니다."
        previewClassName="flex flex-wrap items-center gap-3"
        code={`<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>열기</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>제목</DialogTitle>
      <DialogDescription>설명</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" />}>닫기</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      >
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>다이얼로그 열기</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>변경 사항을 저장할까요?</DialogTitle>
              <DialogDescription>저장하지 않으면 수정한 내용이 사라집니다.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>취소</DialogClose>
              <DialogClose render={<Button />}>저장</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <AddItemDialog />
      </ExampleSection>

      <ExampleSection
        id="sheet"
        title="Sheet"
        description="네 방향에서 열 수 있습니다. side 속성으로 지정합니다."
        previewClassName="flex flex-wrap items-center gap-3"
        code={`<SheetContent side="left">...</SheetContent>`}
      >
        {sheetSides.map(({ side, label }) => (
          <Sheet key={side}>
            <SheetTrigger render={<Button variant="outline" />}>{label}</SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetTitle>{label}에서 열린 시트</SheetTitle>
                <SheetDescription>side=&quot;{side}&quot; 예제입니다.</SheetDescription>
              </SheetHeader>
              <SheetFooter>
                <SheetClose render={<Button variant="outline" />}>닫기</SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))}
      </ExampleSection>

      <ExampleSection
        id="popover"
        title="Popover"
        description="트리거 근처에 작은 패널을 띄웁니다."
        previewClassName="flex flex-wrap items-center gap-3"
        code={`<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>열기</PopoverTrigger>
  <PopoverContent>...</PopoverContent>
</Popover>`}
      >
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>팝오버 열기</PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>알림 설정</PopoverTitle>
              <PopoverDescription>이메일로 받을 알림을 선택하세요.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </ExampleSection>

      <ExampleSection
        id="tooltip"
        title="Tooltip"
        description="마우스를 올리거나 키보드로 포커스하면 보입니다. 아이콘 버튼 설명에 알맞습니다."
        previewClassName="flex flex-wrap items-center gap-3"
        code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button variant="outline" />}>도움말</TooltipTrigger>
    <TooltipContent>설명</TooltipContent>
  </Tooltip>
</TooltipProvider>`}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>위</TooltipTrigger>
            <TooltipContent side="top">위쪽 툴팁</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>아래</TooltipTrigger>
            <TooltipContent side="bottom">아래쪽 툴팁</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>왼쪽</TooltipTrigger>
            <TooltipContent side="left">왼쪽 툴팁</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>오른쪽</TooltipTrigger>
            <TooltipContent side="right">오른쪽 툴팁</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ExampleSection>

      <ExampleSection
        id="dropdown-menu"
        title="DropdownMenu"
        description="일반 항목, 단축키, 체크 항목, 라디오 항목을 모두 보여줍니다."
        previewClassName="flex flex-wrap items-center gap-3"
        code={`<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>메뉴</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>항목</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>내 계정</DropdownMenuTrigger>
          <DropdownMenuContent className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuLabel>계정</DropdownMenuLabel>
              <DropdownMenuItem>
                프로필
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>설정</DropdownMenuItem>
              <DropdownMenuItem disabled>비활성 항목</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">로그아웃</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>보기 옵션</DropdownMenuTrigger>
          <DropdownMenuContent className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuLabel>표시</DropdownMenuLabel>
              <DropdownMenuCheckboxItem defaultChecked>상태 표시줄</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>미니맵</DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup defaultValue="comfortable">
              <DropdownMenuLabel>밀도</DropdownMenuLabel>
              <DropdownMenuRadioItem value="compact">좁게</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="comfortable">보통</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ExampleSection>

      <h2 className="text-muted-foreground text-sm font-semibold">피드백</h2>

      <ExampleSection
        id="alert"
        title="Alert"
        description="default와 destructive 두 가지입니다. 아이콘을 앞에 두면 자동 정렬됩니다."
        previewClassName="space-y-3"
        code={`<Alert variant="destructive">
  <TriangleAlert />
  <AlertTitle>오류</AlertTitle>
  <AlertDescription>설명</AlertDescription>
</Alert>`}
      >
        <Alert>
          <Info />
          <AlertTitle>알림</AlertTitle>
          <AlertDescription>새 버전을 사용할 수 있습니다.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <TriangleAlert />
          <AlertTitle>오류</AlertTitle>
          <AlertDescription>결제 정보를 확인해 주세요.</AlertDescription>
        </Alert>
      </ExampleSection>

      <ExampleSection
        id="toast"
        title="Toast (sonner)"
        description="toast()를 호출합니다. Toaster는 루트 레이아웃에 이미 있습니다."
        previewClassName="flex flex-wrap items-center gap-3"
        code={`import { toast } from "sonner"

toast.success("저장했습니다.")`}
      >
        <ToastExamples />
      </ExampleSection>

      <ExampleSection
        id="skeleton"
        title="Skeleton"
        description="로딩 중 자리를 잡아 두는 표시입니다. 실제 콘텐츠와 같은 크기로 맞춥니다."
        code={`<Skeleton className="h-4 w-48" />`}
      >
        <div className="flex items-center gap-4">
          <Skeleton className="size-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        id="empty-state"
        title="EmptyState"
        description="데이터가 없을 때 안내와 다음 행동을 보여줍니다."
        code={`<EmptyState icon={Inbox} title="항목이 없습니다" action={<Button>추가</Button>} />`}
      >
        <EmptyState
          icon={Inbox}
          title="아직 항목이 없습니다"
          description="첫 항목을 추가해서 시작해 보세요."
          action={<AddItemDialog />}
        />
      </ExampleSection>

      <h2 className="text-muted-foreground text-sm font-semibold">데이터 표시</h2>

      <ExampleSection
        id="card"
        title="Card"
        description="헤더, 액션, 본문, 푸터로 구성합니다."
        previewClassName="grid gap-4 md:grid-cols-2"
        code={`<Card>
  <CardHeader>
    <CardTitle>제목</CardTitle>
    <CardDescription>설명</CardDescription>
  </CardHeader>
  <CardContent>본문</CardContent>
</Card>`}
      >
        <Card>
          <CardHeader>
            <CardTitle>프로젝트 현황</CardTitle>
            <CardDescription>이번 주 진행 상황입니다.</CardDescription>
            <CardAction>
              <Badge variant="secondary">진행 중</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            작업 12건 중 8건을 완료했습니다.
          </CardContent>
          <CardFooter className="gap-2">
            <Button size="sm">자세히</Button>
            <Button size="sm" variant="outline">
              공유
            </Button>
          </CardFooter>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>작은 카드</CardTitle>
            <CardDescription>size=&quot;sm&quot; 예제입니다.</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            여백이 더 좁은 카드입니다.
          </CardContent>
        </Card>
      </ExampleSection>

      <ExampleSection
        id="avatar"
        title="Avatar"
        description="이미지가 없으면 AvatarFallback이 보입니다. AvatarGroup으로 겹쳐 놓을 수 있습니다."
        previewClassName="flex flex-wrap items-center gap-6"
        code={`<Avatar>
  <AvatarFallback>홍</AvatarFallback>
</Avatar>`}
      >
        <Avatar>
          <AvatarFallback>홍</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>김</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallback>이</AvatarFallback>
        </Avatar>
        <AvatarGroup>
          <Avatar>
            <AvatarFallback>홍</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>김</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>이</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+3</AvatarGroupCount>
        </AvatarGroup>
      </ExampleSection>

      <ExampleSection
        id="table"
        title="Table"
        description="캡션, 헤더, 본문을 사용합니다. 좁은 화면에서는 가로로 스크롤됩니다."
        code={`<Table>
  <TableHeader>
    <TableRow><TableHead>이름</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>홍길동</TableCell></TableRow>
  </TableBody>
</Table>`}
      >
        <Table>
          <TableCaption>최근 결제 내역</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>번호</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">금액</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.name}</TableCell>
                <TableCell>
                  <Badge variant={invoice.status === "실패" ? "destructive" : "secondary"}>
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{invoice.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ExampleSection>

      <ExampleSection
        id="separator"
        title="Separator"
        description="가로와 세로 구분선입니다."
        previewClassName="space-y-4"
        code={`<Separator orientation="vertical" className="h-4" />`}
      >
        <div className="space-y-1">
          <p className="text-sm font-medium">Starter Kit</p>
          <p className="text-muted-foreground text-sm">가로 구분선 위아래 영역</p>
        </div>
        <Separator />
        <div className="flex h-5 items-center gap-4 text-sm">
          <span>문서</span>
          <Separator orientation="vertical" />
          <span>예제</span>
          <Separator orientation="vertical" />
          <span>소스</span>
        </div>
      </ExampleSection>

      <h2 className="text-muted-foreground text-sm font-semibold">내비게이션</h2>

      <ExampleSection
        id="tabs"
        title="Tabs"
        description="default와 line 두 가지 스타일입니다."
        previewClassName="space-y-6"
        code={`<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">계정</TabsTrigger>
  </TabsList>
  <TabsContent value="account">내용</TabsContent>
</Tabs>`}
      >
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">계정</TabsTrigger>
            <TabsTrigger value="password">비밀번호</TabsTrigger>
            <TabsTrigger value="billing" disabled>
              결제
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="text-muted-foreground pt-3 text-sm">
            계정 정보를 수정하는 영역입니다.
          </TabsContent>
          <TabsContent value="password" className="text-muted-foreground pt-3 text-sm">
            비밀번호를 변경하는 영역입니다.
          </TabsContent>
        </Tabs>
        <Tabs defaultValue="overview">
          <TabsList variant="line">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="activity">활동</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="text-muted-foreground pt-3 text-sm">
            line 스타일 탭의 개요입니다.
          </TabsContent>
          <TabsContent value="activity" className="text-muted-foreground pt-3 text-sm">
            line 스타일 탭의 활동입니다.
          </TabsContent>
        </Tabs>
      </ExampleSection>

      <ExampleSection
        id="pagination"
        title="Pagination"
        description="PaginationLink는 a 태그로 렌더링되므로 href를 넘깁니다."
        code={`<PaginationLink href="?page=2" isActive>2</PaginationLink>`}
      >
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#pagination" text="이전" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#pagination">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#pagination" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#pagination">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#pagination" text="다음" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </ExampleSection>

      <ExampleSection
        id="breadcrumb"
        title="Breadcrumb"
        description="Breadcrumbs 컴포넌트에 항목 배열을 넘기면 마지막 항목이 현재 페이지로 표시됩니다."
        code={`<Breadcrumbs items={[{ title: "홈", href: "/" }, { title: "예제" }]} />`}
      >
        <Breadcrumbs
          items={[
            { title: "홈", href: "/" },
            { title: "예제", href: "/examples/controls" },
            { title: "Breadcrumb" },
          ]}
        />
      </ExampleSection>

      <ExampleSection
        id="sidebar"
        title="Sidebar"
        description="실제 사이드바는 SidebarProvider가 필요한 앱 셸에서 동작합니다. 아래는 구조를 보여 주는 미리보기이며, 실제 동작은 대시보드에서 확인하세요."
        previewClassName="space-y-4"
        code={`// app/(dashboard)/layout.tsx
<AppShell>{children}</AppShell>`}
      >
        <div className="grid h-48 grid-cols-[12rem_1fr] overflow-hidden rounded-lg border">
          <div className="bg-sidebar text-sidebar-foreground space-y-1 border-r p-2 text-sm">
            <div className="bg-sidebar-accent text-sidebar-accent-foreground flex items-center gap-2 rounded-md px-2 py-1.5">
              <Home className="size-4" />
              개요
            </div>
            <div className="flex items-center gap-2 rounded-md px-2 py-1.5">
              <Settings className="size-4" />
              설정
            </div>
          </div>
          <div className="text-muted-foreground p-4 text-sm">콘텐츠 영역</div>
        </div>
        <Button variant="outline" nativeButton={false} render={<Link href="/dashboard" />}>
          실제 사이드바 보기
        </Button>
      </ExampleSection>
    </Container>
  )
}
