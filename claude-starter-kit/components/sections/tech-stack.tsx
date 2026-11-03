import { Badge } from "@/components/ui/badge"

const stack = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "shadcn/ui",
  "Base UI",
  "Lucide Icons",
  "next-themes",
  "clsx · tailwind-merge",
]

export function TechStack() {
  return (
    <section aria-labelledby="stack-heading" className="space-y-4">
      <h2 id="stack-heading" className="text-2xl font-bold tracking-tight">
        기술 스택
      </h2>
      <div className="flex flex-wrap gap-2">
        {stack.map((item) => (
          <Badge key={item} variant="outline" className="px-3 py-1 text-sm">
            {item}
          </Badge>
        ))}
      </div>
    </section>
  )
}
