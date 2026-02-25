import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { SocialProof } from "@/components/social-proof"
import { ProblemSection } from "@/components/problem-section"
import { FeaturesPrimary } from "@/components/features-primary"
import { FeaturesSecondary } from "@/components/features-secondary"
import { HowItWorks } from "@/components/how-it-works"
import { DashboardPreview } from "@/components/dashboard-preview"
import { StatsSection } from "@/components/stats-section"
import { Pricing } from "@/components/pricing"
import { FaqSection } from "@/components/faq-section"
import { FinalCta } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { ScrollBirds } from "@/components/scroll-birds"
import { EdgeDecorations } from "@/components/edge-decorations"

export default function Home() {
  return (
    <div className="film-grain">
      <ScrollBirds />
      <EdgeDecorations />
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <ProblemSection />
        <FeaturesPrimary />
        <FeaturesSecondary />
        <HowItWorks />
        <DashboardPreview />
        <StatsSection />
        <Pricing />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
