import { Container } from "@/components/layout/container"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="mt-auto">
      <Separator />
      <Container className="text-muted-foreground flex flex-col items-center justify-between gap-2 py-6 text-sm sm:flex-row">
        <p>{siteConfig.name}</p>
        <p>{siteConfig.description}</p>
      </Container>
    </footer>
  )
}
