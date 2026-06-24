import type { Metadata } from "next"

import { DemoCard } from "@/components/guides/DemoCard"
import { JsonLdScript } from "@/components/guides/JsonLdScript"
import { TrialCtaBand } from "@/components/guides/TrialCtaBand"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { demos } from "@/lib/organic-content"
import { absoluteUrl } from "@/lib/site"
import { buildOrganizationJsonLd, buildSoftwareJsonLd } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "Demos Cadencio | Roteiros de Demonstração",
  description: "Conheça os roteiros de demonstração do Cadencio para presença, turmas, planilhas e histórico em estúdios de dança.",
  alternates: {
    canonical: absoluteUrl("/demos"),
  },
  openGraph: {
    title: "Demos Cadencio",
    description: "Veja como o Cadencio ajuda estúdios de dança a sair do caderno e da planilha.",
    url: absoluteUrl("/demos"),
    siteName: "Cadencio",
    locale: "pt_BR",
    type: "website",
  },
}

export default function DemosPage() {
  return (
    <div className="film-grain">
      <Navbar />
      <main className="bg-white pt-32">
        <JsonLdScript data={[buildOrganizationJsonLd(), buildSoftwareJsonLd()]} />

        <section className="relative overflow-hidden border-b border-gray-200 bg-gray-50 pb-20 pt-16">
          <div className="absolute inset-0 opacity-70" style={{ background: "var(--gradient-aurora)" }} />
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-brand-700">Demos Cadencio</p>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-gray-900 md:text-6xl">
              Veja como o Cadencio resolve a rotina do estúdio.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              Roteiros curtos para entender chamada, turmas, importação e histórico antes de começar o teste grátis.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-700">Demos em produção</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Escolha a rotina que você quer conhecer</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {demos.map((demo) => (
              <DemoCard key={demo.slug} demo={demo} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <TrialCtaBand />
        </section>
      </main>
      <Footer />
    </div>
  )
}
