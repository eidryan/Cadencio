import type { Metadata } from "next"

import { DemoCard } from "@/components/guides/DemoCard"
import { GuideCard } from "@/components/guides/GuideCard"
import { JsonLdScript } from "@/components/guides/JsonLdScript"
import { TrialCtaBand } from "@/components/guides/TrialCtaBand"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { demos, guides } from "@/lib/organic-content"
import { absoluteUrl } from "@/lib/site"
import { buildOrganizationJsonLd, buildSoftwareJsonLd } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "Guias Cadencio | Gestão para Estúdios de Dança",
  description: "Guias práticos para organizar presença, turmas, horários e histórico em estúdios de dança.",
  alternates: {
    canonical: absoluteUrl("/guias"),
  },
  openGraph: {
    title: "Guias Cadencio",
    description: "Aprenda a organizar a rotina do seu estúdio de dança com guias e demos do Cadencio.",
    url: absoluteUrl("/guias"),
    siteName: "Cadencio",
    locale: "pt_BR",
    type: "website",
  },
}

export default function GuiasPage() {
  return (
    <div className="film-grain">
      <Navbar />
      <main className="bg-white pt-32">
        <JsonLdScript data={[buildOrganizationJsonLd(), buildSoftwareJsonLd()]} />

        <section className="relative overflow-hidden border-b border-gray-200 bg-gray-50 pb-20 pt-16">
          <div className="absolute inset-0 opacity-70" style={{ background: "var(--gradient-aurora)" }} />
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-brand-700">Guias Cadencio</p>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-gray-900 md:text-6xl">
              Gestão prática para estúdios de dança que querem sair do caderno.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              Sistema de controle de presença, turmas e alunos para estúdios de dança.
            </p>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-gray-600">
              Conteúdos diretos sobre presença, turmas, planilhas e histórico, sempre com demos para ver o Cadencio em
              ação.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-700">Comece por aqui</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Guias essenciais</h2>
            </div>
            <a href="/demos" className="font-bold text-brand-700 hover:text-brand-600">
              Ver demos
            </a>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-700">Veja demos</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Veja o fluxo antes de testar</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {demos.map((demo) => (
                <DemoCard key={demo.slug} demo={demo} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <TrialCtaBand />
        </section>
      </main>
      <Footer />
    </div>
  )
}
