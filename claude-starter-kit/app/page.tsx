import { Container } from "@/components/layout/container"
import { FeatureGrid } from "@/components/sections/feature-grid"
import { ComponentShowcase } from "@/components/sections/component-showcase"
import { Hero } from "@/components/sections/hero"
import { TechStack } from "@/components/sections/tech-stack"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Container className="space-y-16 pb-20">
        <FeatureGrid />
        <TechStack />
        <ComponentShowcase />
      </Container>
    </>
  )
}
