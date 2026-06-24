import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Breadcrumbs } from "@/components/guides/Breadcrumbs"
import { JsonLdScript } from "@/components/guides/JsonLdScript"
import { TrialCtaBand } from "@/components/guides/TrialCtaBand"
import { VideoDemoPanel } from "@/components/guides/VideoDemoPanel"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { getDemoBySlug, getGuideBySlug, guides, type Guide } from "@/lib/organic-content"
import { absoluteUrl, TRIAL_CTA } from "@/lib/site"
import { buildBreadcrumbJsonLd, buildGuideJsonLd } from "@/lib/structured-data"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlug(slug)

  if (!guide) {
    return {}
  }

  return {
    title: `${guide.title} | Cadencio`,
    description: guide.description,
    alternates: {
      canonical: absoluteUrl(`/guias/${guide.slug}`),
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: absoluteUrl(`/guias/${guide.slug}`),
      siteName: "Cadencio",
      locale: "pt_BR",
      type: "article",
    },
  }
}

function formatGuideDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`))
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)

  if (!guide) {
    notFound()
  }

  const demo = getDemoBySlug(guide.demoSlug)
  const relatedGuides = guide.relatedGuides
    .map((relatedSlug) => getGuideBySlug(relatedSlug))
    .filter((item): item is Guide => Boolean(item))

  const breadcrumbItems = [
    { name: "Início", path: "/" },
    { name: "Guias", path: "/guias" },
    { name: guide.title, path: `/guias/${guide.slug}` },
  ]

  return (
    <div className="film-grain">
      <Navbar />
      <main className="bg-white pt-32">
        <JsonLdScript data={[...buildGuideJsonLd(guide), buildBreadcrumbJsonLd(breadcrumbItems)]} />

        <article>
          <header className="border-b border-gray-200 bg-gray-50 py-16">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <Breadcrumbs
                items={[
                  { label: "Início", href: "/" },
                  { label: "Guias", href: "/guias" },
                ]}
              />
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-brand-700">{guide.primaryKeyword}</p>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">{guide.title}</h1>
              <p className="mt-6 text-xl leading-relaxed text-gray-600">{guide.heroSummary}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm font-semibold text-gray-500">
                <span>{guide.readingTime}</span>
                <span>Atualizado em {formatGuideDate(guide.updatedAt)}</span>
              </div>
              <a href={TRIAL_CTA.href} className="btn-paper-cut mt-8 inline-flex">
                {TRIAL_CTA.label}
              </a>
            </div>
          </header>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
            <div className="mx-auto max-w-3xl">
              {guide.sections.map((section, index) => (
                <section key={section.heading} className="mb-12">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">{section.heading}</h2>
                  <div className="mt-5 space-y-4 text-lg leading-relaxed text-gray-600">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {index === 0 && demo ? (
                    <div className="mt-10">
                      <VideoDemoPanel demo={demo} framed />
                    </div>
                  ) : null}
                </section>
              ))}

              <section className="mb-12 rounded-sm border border-gray-200 bg-gray-50 p-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Perguntas frequentes</h2>
                <div className="mt-6 divide-y divide-gray-200">
                  {guide.faq.map((item) => (
                    <div key={item.question} className="py-5">
                      <h3 className="font-bold text-gray-900">{item.question}</h3>
                      <p className="mt-2 text-gray-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>

              <TrialCtaBand />
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-sm border border-gray-200 bg-white p-6 shadow-lg">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-700">Próximos guias</p>
                <div className="mt-5 space-y-4">
                  {relatedGuides.map((relatedGuide) => (
                    <a
                      key={relatedGuide.slug}
                      href={`/guias/${relatedGuide.slug}`}
                      className="block text-sm font-bold leading-snug text-gray-900 hover:text-brand-700"
                    >
                      {relatedGuide.title}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
