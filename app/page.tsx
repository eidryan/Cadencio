import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ProblemSection } from "@/components/problem-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorks } from "@/components/how-it-works"
import { BetaAccess } from "@/components/beta-access"
import { SocialProof } from "@/components/social-proof"
import { FaqSection } from "@/components/faq-section"
import { FinalCta } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { WhatsappFab } from "@/components/whatsapp-fab"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorks />
        <BetaAccess />
        <SocialProof />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
      <WhatsappFab />
    </>
  )
}
