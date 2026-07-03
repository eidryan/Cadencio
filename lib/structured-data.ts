import type { Demo, Guide } from "@/lib/organic-content"
import { absoluteUrl, SITE_URL } from "@/lib/site"

const publisher = {
  "@type": "Organization",
  name: "Cadencio",
  url: SITE_URL,
  logo: absoluteUrl("/icon.svg"),
}

export function buildOrganizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cadencio",
    url: SITE_URL,
    logo: absoluteUrl("/icon.svg"),
  }
}

export function buildSoftwareJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Cadencio",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description: "Sistema de controle de presença, turmas e alunos para estúdios de dança.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
      description: "Teste grátis por 14 dias. Cancele quando quiser.",
    },
  }
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function buildGuideJsonLd(guide: Guide): Record<string, unknown>[] {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    inLanguage: "pt-BR",
    author: publisher,
    publisher,
    mainEntityOfPage: absoluteUrl(`/guias/${guide.slug}`),
  }

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return [article, faq]
}

export function buildDemoJsonLd(demo: Demo): Record<string, unknown>[] {
  const video = demo.videoUrl
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: demo.title,
        description: demo.description,
        thumbnailUrl: demo.thumbnail ? [absoluteUrl(demo.thumbnail)] : [absoluteUrl("/icon.svg")],
        uploadDate: "2026-07-03",
        duration: demo.durationIso,
        contentUrl: absoluteUrl(demo.videoUrl),
        transcript: demo.transcript.join(" "),
      }
    : null

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: "Demos", path: "/demos" },
    { name: demo.title, path: `/demos/${demo.slug}` },
  ])

  return video ? [video, breadcrumb] : [breadcrumb]
}
