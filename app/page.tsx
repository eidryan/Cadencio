import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { FeaturesPrimary } from "@/components/features-primary"
import { Philosophy } from "@/components/philosophy"
import { HowItWorks } from "@/components/how-it-works"
import { Pricing } from "@/components/pricing"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="film-grain">
      <Navbar />
      <main>
        <Hero />
        <FeaturesPrimary />
        <Philosophy />
        <HowItWorks />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
