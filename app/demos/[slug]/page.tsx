import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Breadcrumbs } from "@/components/guides/Breadcrumbs"
import { GuideCard } from "@/components/guides/GuideCard"
import { JsonLdScript } from "@/components/guides/JsonLdScript"
import { TrialCtaBand } from "@/components/guides/TrialCtaBand"
import { VideoDemoPanel } from "@/components/guides/VideoDemoPanel"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { demos, getDemoBySlug, getGuideBySlug, type Guide } from "@/lib/organic-content"
import { absoluteUrl } from "@/lib/site"
import { buildDemoJsonLd } from "@/lib/structured-data"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return demos.map((demo) => ({ slug: demo.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const demo = getDemoBySlug(slug)

  if (!demo) {
    return {}
  }

  return {
    title: `${demo.title} | Cadencio`,
    description: demo.description,
    alternates: {
      canonical: absoluteUrl(`/demos/${demo.slug}`),
    },
    openGraph: {
      title: demo.title,
      description: demo.description,
      url: absoluteUrl(`/demos/${demo.slug}`),
      siteName: "Cadencio",
      locale: "pt_BR",
      type: "website",
    },
  }
}

export default async function DemoPage({ params }: PageProps) {
  const { slug } = await params
  const demo = getDemoBySlug(slug)

  if (!demo) {
    notFound()
  }

  const relatedGuides = demo.relatedGuides
    .map((guideSlug) => getGuideBySlug(guideSlug))
    .filter((guide): guide is Guide => Boolean(guide))

  return (
    <div className="film-grain">
      <Navbar />
      <main className="bg-white pt-32">
        <JsonLdScript data={buildDemoJsonLd(demo)} />

        <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Início", href: "/" },
              { label: "Demos", href: "/demos" },
            ]}
          />
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-brand-700">{demo.relatedFeature}</p>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">{demo.title}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-gray-600">{demo.description}</p>

          <div className="mt-10">
            <VideoDemoPanel demo={demo} framed />
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-16 lg:px-8">
          <div className="rounded-sm border border-gray-200 bg-gray-50 p-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">O que esta demo mostra</h2>
            <ol className="mt-6 space-y-4">
              {demo.transcript.map((line, index) => (
                <li key={line} className="flex gap-4 text-gray-600">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-brand-600 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {relatedGuides.length > 0 ? (
          <section className="bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900">Guias relacionados</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {relatedGuides.map((guide) => (
                  <GuideCard key={guide.slug} guide={guide} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <TrialCtaBand />
        </section>
      </main>
      <Footer />
    </div>
  )
}
