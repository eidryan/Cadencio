import type { Metadata } from "next"

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ProblemSection } from "@/components/problem-section"
import { FeaturesPrimary } from "@/components/features-primary"
import { Philosophy } from "@/components/philosophy"
import { HowItWorks } from "@/components/how-it-works"
import { Pricing } from "@/components/pricing"
import { Footer } from "@/components/footer"
import { JsonLdScript } from "@/components/guides/JsonLdScript"
import { absoluteUrl } from "@/lib/site"
import { buildOrganizationJsonLd, buildSoftwareJsonLd } from "@/lib/structured-data"

export const metadata: Metadata = {
  alternates: {
    canonical: absoluteUrl("/"),
  },
}

export default function Home() {
  return (
    <div className="film-grain">
      <JsonLdScript data={[buildOrganizationJsonLd(), buildSoftwareJsonLd()]} />
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <FeaturesPrimary />
        <Philosophy />
        <HowItWorks />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
