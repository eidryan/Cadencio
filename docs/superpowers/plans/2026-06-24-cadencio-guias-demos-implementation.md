# Cadencio Guias + Demos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first Cadencio organic acquisition surface: a `Guias` hub, guide pages, demo library, demo detail pages, crawl metadata, and trial-focused navigation/CTA updates.

**Architecture:** Use static App Router routes backed by typed TypeScript content data. Keep the first release CMS-free and dependency-free so the landing site stays simple, fast, and easy to verify. Share display primitives across guides and demos, and centralize metadata/JSON-LD helpers so page routes stay focused.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, lucide-react, existing Cadencio design tokens/classes.

## Global Constraints

- All visitor-facing copy must be Brazilian Portuguese.
- The first organic target is estúdios de dança.
- Adjacent verticals such as academias de luta and pilates are future clusters, not phase 1 primary copy.
- Hub label and URL must use `Guias`.
- Primary CTA must be `Teste grátis por 14 dias`, supported by `Cancele quando quiser.`
- Demo assets should be real recorded and edited product videos when available.
- If video production is not ready, render explicit temporary demo slots without claiming that a playable video exists.
- No CMS, no new package dependency, and no programmatic SEO scale-out in this release.
- Structured data must match visible page content.
- Use Next.js App Router conventions for `generateMetadata`, `generateStaticParams`, `app/sitemap.ts`, and `app/robots.ts`.
- This project currently has no test runner. Verification for each task uses `npm run lint`, `npm run build`, and browser checks where UI changes are visible.

---

## File Structure

Create:

- `lib/site.ts`
  - Owns public site constants, app URLs, trial CTA copy, and absolute URL helpers.

- `lib/organic-content.ts`
  - Owns typed guide/demo data, slug lookup helpers, and route lists for sitemap generation.

- `lib/structured-data.ts`
  - Owns JSON-LD builders for Organization, Article, VideoObject, BreadcrumbList, FAQPage, and SoftwareApplication/Product-style commercial metadata.

- `components/guides/Breadcrumbs.tsx`
  - Small breadcrumb renderer for guides and demos.

- `components/guides/TrialCtaBand.tsx`
  - Shared CTA block using the 14-day trial message.

- `components/guides/VideoDemoPanel.tsx`
  - Shared video/fallback demo block for guide embeds and demo pages.

- `components/guides/GuideCard.tsx`
  - Reusable card for guide teasers.

- `components/guides/DemoCard.tsx`
  - Reusable card for demo teasers.

- `components/guides/JsonLdScript.tsx`
  - Safe script wrapper for JSON-LD output.

- `app/guias/page.tsx`
  - Main hub page.

- `app/guias/[slug]/page.tsx`
  - Individual guide pages.

- `app/demos/page.tsx`
  - Demo library page.

- `app/demos/[slug]/page.tsx`
  - Individual demo pages.

- `app/sitemap.ts`
  - Dynamic sitemap route.

- `app/robots.ts`
  - Dynamic robots route.

Modify:

- `components/navbar.tsx`
  - Add `Guias` link and update primary CTA copy to trial language.

- `components/footer.tsx`
  - Add `Guias` and `Demos` links; remove stale beta anchor.

- `app/layout.tsx`
  - Update default metadata/robots text to support the new organic surface.

- `tasks/todo.md`
  - Track implementation progress and verification evidence.

---

### Task 1: Content Model and Site Helpers

**Files:**
- Create: `lib/site.ts`
- Create: `lib/organic-content.ts`
- Modify: `tasks/todo.md`

**Interfaces:**
- Produces: `SITE_URL: string`
- Produces: `APP_URL: string`
- Produces: `TRIAL_CTA: { label: string; helper: string; href: string }`
- Produces: `absoluteUrl(path: string): string`
- Produces: `type Guide`
- Produces: `type Demo`
- Produces: `guides: Guide[]`
- Produces: `demos: Demo[]`
- Produces: `getGuideBySlug(slug: string): Guide | undefined`
- Produces: `getDemoBySlug(slug: string): Demo | undefined`
- Produces: `guideRoutes: string[]`
- Produces: `demoRoutes: string[]`

- [ ] **Step 1: Create the site helper module**

Create `lib/site.ts` with this complete content:

```ts
export const SITE_URL = "https://www.cadencio.app"
export const APP_URL = "https://my.cadencio.app"

export const TRIAL_CTA = {
  label: "Teste grátis por 14 dias",
  helper: "Cancele quando quiser. Sem compromisso.",
  href: `${APP_URL}/register`,
} as const

export function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}
```

- [ ] **Step 2: Create the typed content source**

Create `lib/organic-content.ts` with this complete content. Use this copy for the first release unless a later review deliberately rewrites it.

```ts
export type GuideCategory = "presenca" | "turmas" | "planilhas" | "historico"

export type GuideSection = {
  heading: string
  body: string[]
}

export type GuideFaq = {
  question: string
  answer: string
}

export type Guide = {
  title: string
  slug: string
  description: string
  category: GuideCategory
  intent: string
  primaryKeyword: string
  secondaryKeywords: string[]
  publishedAt: string
  updatedAt: string
  readingTime: string
  heroSummary: string
  demoSlug: string
  sections: GuideSection[]
  faq: GuideFaq[]
  relatedGuides: string[]
}

export type Demo = {
  title: string
  slug: string
  description: string
  durationLabel: string
  durationIso: string
  videoUrl: string | null
  thumbnail: string | null
  transcript: string[]
  relatedFeature: string
  relatedGuides: string[]
}

export const demos = [
  {
    title: "Como fazer chamada de uma turma em menos de 1 minuto",
    slug: "chamada-de-turma-em-1-minuto",
    description: "Veja como marcar presença e falta sem caderno, pelo navegador.",
    durationLabel: "1 min",
    durationIso: "PT1M",
    videoUrl: null,
    thumbnail: null,
    transcript: [
      "Abra a turma do dia no Cadencio.",
      "Confira a lista de alunas esperadas para a aula.",
      "Marque presente ou falta com um clique.",
      "O histórico fica salvo automaticamente para consulta depois.",
    ],
    relatedFeature: "Controle de presença",
    relatedGuides: ["controle-de-presenca-estudio-danca"],
  },
  {
    title: "Como cadastrar uma turma e definir horários",
    slug: "cadastrar-turma-e-horarios",
    description: "Monte a grade recorrente do estúdio sem depender de planilhas soltas.",
    durationLabel: "1 min 10 s",
    durationIso: "PT1M10S",
    videoUrl: null,
    thumbnail: null,
    transcript: [
      "Crie uma turma com nome, modalidade e capacidade.",
      "Defina os dias da semana e horários de aula.",
      "Salve a turma para que as aulas apareçam na rotina do estúdio.",
    ],
    relatedFeature: "Gestão de turmas",
    relatedGuides: ["organizar-turmas-horarios-escola-danca"],
  },
  {
    title: "Como importar alunos de uma planilha para o Cadencio",
    slug: "importar-alunos-planilha",
    description: "Entenda o fluxo para trazer os cadastros existentes para o sistema.",
    durationLabel: "1 min 20 s",
    durationIso: "PT1M20S",
    videoUrl: null,
    thumbnail: null,
    transcript: [
      "Separe a planilha com os dados das alunas.",
      "Use a importação para criar os cadastros no Cadencio.",
      "Revise os dados importados antes de começar a chamada.",
    ],
    relatedFeature: "Importação via planilha",
    relatedGuides: ["planilha-presenca-danca-quando-deixa-de-funcionar"],
  },
  {
    title: "Como consultar o histórico de presença de uma aluna",
    slug: "historico-de-presenca-aluna",
    description: "Veja como acompanhar faltas e presença sem refazer contas no fim do mês.",
    durationLabel: "55 s",
    durationIso: "PT55S",
    videoUrl: null,
    thumbnail: null,
    transcript: [
      "Abra o cadastro da aluna.",
      "Acesse o histórico de presença.",
      "Veja registros anteriores para entender frequência e faltas.",
    ],
    relatedFeature: "Histórico de presença",
    relatedGuides: ["acompanhar-faltas-historico-presenca-alunas"],
  },
] satisfies Demo[]

export const guides = [
  {
    title: "Como controlar presença em estúdio de dança sem caderno ou planilha",
    slug: "controle-de-presenca-estudio-danca",
    description: "Um guia prático para substituir listas de presença em papel por um fluxo simples, rastreável e pronto para a rotina do estúdio.",
    category: "presenca",
    intent: "Dono de estúdio que ainda usa caderno, lista impressa ou planilha para chamada.",
    primaryKeyword: "controle de presença para estúdio de dança",
    secondaryKeywords: ["lista de presença dança", "chamada de turma de dança", "presença de alunas"],
    publishedAt: "2026-06-24",
    updatedAt: "2026-06-24",
    readingTime: "6 min",
    heroSummary: "A presença precisa ser rápida na porta da sala e confiável no fim do mês. O Cadencio resolve esse intervalo.",
    demoSlug: "chamada-de-turma-em-1-minuto",
    sections: [
      {
        heading: "Por que o caderno começa a atrapalhar",
        body: [
          "No começo, a lista em papel parece suficiente. O problema aparece quando o estúdio cresce, troca professores, mistura reposições e precisa consultar o histórico de uma aluna.",
          "Quando a informação fica em folhas soltas, o fim do mês vira conferência manual. O dono perde tempo tentando descobrir quem veio, quem faltou e qual dado está correto.",
        ],
      },
      {
        heading: "O fluxo ideal para uma chamada de turma",
        body: [
          "A turma do dia deve abrir com a lista de alunas esperadas. A marcação precisa acontecer em poucos cliques, pelo celular ou computador, sem depender de instalação.",
          "Depois da aula, o registro precisa ficar salvo automaticamente. Assim, o histórico deixa de depender da memória de quem fez a chamada.",
        ],
      },
      {
        heading: "Como o Cadencio muda essa rotina",
        body: [
          "No Cadencio, a chamada fica ligada à turma, ao horário e à aluna. Isso transforma a presença em dado de gestão, não só em uma anotação.",
          "A equipe consegue consultar registros anteriores e manter a rotina organizada mesmo quando mais de uma pessoa ajuda na operação.",
        ],
      },
    ],
    faq: [
      {
        question: "Preciso instalar aplicativo para fazer chamada?",
        answer: "Não. O Cadencio funciona no navegador, pelo celular ou computador.",
      },
      {
        question: "Dá para testar antes de decidir?",
        answer: "Sim. O Cadencio tem teste grátis por 14 dias e pode ser cancelado quando quiser.",
      },
    ],
    relatedGuides: ["organizar-turmas-horarios-escola-danca", "acompanhar-faltas-historico-presenca-alunas"],
  },
  {
    title: "Como organizar turmas e horários em uma escola de dança",
    slug: "organizar-turmas-horarios-escola-danca",
    description: "Veja como sair da grade improvisada e montar uma rotina de turmas mais clara para gestão, professores e recepção.",
    category: "turmas",
    intent: "Dono de escola de dança organizando horários, modalidades e turmas recorrentes.",
    primaryKeyword: "organizar turmas de dança",
    secondaryKeywords: ["horários escola de dança", "gestão de turmas", "grade de aulas dança"],
    publishedAt: "2026-06-24",
    updatedAt: "2026-06-24",
    readingTime: "5 min",
    heroSummary: "Uma grade clara reduz desencontro, facilita chamada e evita depender de uma planilha que só uma pessoa entende.",
    demoSlug: "cadastrar-turma-e-horarios",
    sections: [
      {
        heading: "A grade é o centro da operação",
        body: [
          "Toda rotina do estúdio passa pelas turmas: horários, modalidades, professor responsável, presença e comunicação com alunas.",
          "Quando essa estrutura fica espalhada em agenda, planilha e conversa de WhatsApp, a operação depende de conferência constante.",
        ],
      },
      {
        heading: "O que uma turma precisa ter",
        body: [
          "Uma turma precisa de nome, modalidade, capacidade e horários recorrentes. Essas informações devem ser fáceis de revisar conforme a agenda muda.",
          "Com esse cadastro organizado, a chamada deixa de ser uma tarefa isolada e passa a fazer parte do fluxo normal de gestão.",
        ],
      },
      {
        heading: "Como o Cadencio ajuda",
        body: [
          "O Cadencio centraliza turmas, horários e alunas. Isso ajuda a recepção, os professores e a gestão a trabalharem com a mesma informação.",
          "O resultado é menos retrabalho e mais clareza sobre o que acontece em cada aula.",
        ],
      },
    ],
    faq: [
      {
        question: "Posso ter modalidades diferentes no mesmo estúdio?",
        answer: "Sim. As turmas podem representar diferentes modalidades e horários dentro do mesmo estúdio.",
      },
      {
        question: "Consigo usar no começo mesmo com poucas turmas?",
        answer: "Sim. A proposta é funcionar tanto para estúdios pequenos quanto para operações em crescimento.",
      },
    ],
    relatedGuides: ["controle-de-presenca-estudio-danca", "planilha-presenca-danca-quando-deixa-de-funcionar"],
  },
  {
    title: "Planilha de presença para dança: quando ela deixa de funcionar",
    slug: "planilha-presenca-danca-quando-deixa-de-funcionar",
    description: "Entenda os sinais de que a planilha deixou de ajudar e começou a criar retrabalho na gestão do estúdio.",
    category: "planilhas",
    intent: "Dono de estúdio comparando planilha com sistema de gestão.",
    primaryKeyword: "planilha de presença para dança",
    secondaryKeywords: ["controle de presença excel", "substituir planilha estúdio", "gestão sem planilha"],
    publishedAt: "2026-06-24",
    updatedAt: "2026-06-24",
    readingTime: "7 min",
    heroSummary: "Planilha resolve o começo. Depois, ela pode virar o gargalo que esconde dados importantes da operação.",
    demoSlug: "importar-alunos-planilha",
    sections: [
      {
        heading: "A planilha é útil até certo ponto",
        body: [
          "Excel e Google Sheets ajudam quando a operação ainda é pequena. O problema surge quando a planilha vira cadastro, chamada, financeiro manual e histórico ao mesmo tempo.",
          "Nesse momento, qualquer ajuste exige cuidado para não quebrar fórmulas, perder filtros ou duplicar informações.",
        ],
      },
      {
        heading: "Sinais de que a planilha virou gargalo",
        body: [
          "Se só uma pessoa entende o arquivo, se os professores não atualizam a informação na hora, ou se o fim do mês exige conferência manual, a planilha já está custando tempo.",
          "Outro sinal é quando existem versões diferentes do mesmo controle circulando entre computador, celular e mensagens.",
        ],
      },
      {
        heading: "Como migrar sem recomeçar do zero",
        body: [
          "A migração deve aproveitar o que já existe: nomes, contatos e vínculo com turmas. O Cadencio deve receber essa base e transformar a rotina em fluxo de sistema.",
          "Depois da importação, o cadastro deixa de ser um arquivo isolado e passa a sustentar chamada, histórico e organização de turmas.",
        ],
      },
    ],
    faq: [
      {
        question: "Preciso apagar minha planilha atual?",
        answer: "Não. A planilha pode servir como base de migração e continuar guardada como referência.",
      },
      {
        question: "O Cadencio substitui Excel para presença?",
        answer: "Sim para o fluxo de presença, turmas e histórico. A ideia é tirar a operação diária da planilha.",
      },
    ],
    relatedGuides: ["controle-de-presenca-estudio-danca", "organizar-turmas-horarios-escola-danca"],
  },
  {
    title: "Como acompanhar faltas e histórico de presença das alunas",
    slug: "acompanhar-faltas-historico-presenca-alunas",
    description: "Aprenda a transformar presença em histórico consultável para entender frequência, faltas e reposições.",
    category: "historico",
    intent: "Gestor que precisa consultar presença acumulada sem refazer contas.",
    primaryKeyword: "histórico de presença de alunas",
    secondaryKeywords: ["faltas em escola de dança", "frequência de alunos dança", "controle de reposição aula"],
    publishedAt: "2026-06-24",
    updatedAt: "2026-06-24",
    readingTime: "6 min",
    heroSummary: "A chamada só vira gestão quando o histórico fica fácil de consultar.",
    demoSlug: "historico-de-presenca-aluna",
    sections: [
      {
        heading: "Presença não deveria morrer no dia da aula",
        body: [
          "Marcar quem veio é só o primeiro passo. O valor aparece quando o estúdio consegue consultar esse histórico depois.",
          "Sem histórico organizado, faltas recorrentes, dúvidas de reposição e acompanhamento de frequência ficam espalhados em mensagens e lembranças.",
        ],
      },
      {
        heading: "O que observar no histórico",
        body: [
          "Um bom histórico deve mostrar registros por aluna, por turma e por período. Isso ajuda a responder perguntas simples sem abrir várias planilhas.",
          "Também ajuda a equipe a conversar com mais contexto quando uma aluna falta muito ou quando há dúvida sobre aulas realizadas.",
        ],
      },
      {
        heading: "Como o Cadencio deixa isso rastreável",
        body: [
          "Cada chamada registrada no Cadencio alimenta o histórico. Assim, o estúdio não depende de refazer conta no fim do mês.",
          "Esse histórico cria uma base mais confiável para acompanhar presença e tomar decisões operacionais.",
        ],
      },
    ],
    faq: [
      {
        question: "Consigo consultar presença depois da aula?",
        answer: "Sim. A proposta é manter o registro salvo para consulta posterior.",
      },
      {
        question: "Isso ajuda em reposição de aula?",
        answer: "Ajuda porque o estúdio passa a ter um histórico mais confiável para analisar faltas e presença.",
      },
    ],
    relatedGuides: ["controle-de-presenca-estudio-danca", "planilha-presenca-danca-quando-deixa-de-funcionar"],
  },
] satisfies Guide[]

export const guideRoutes = guides.map((guide) => `/guias/${guide.slug}`)
export const demoRoutes = demos.map((demo) => `/demos/${demo.slug}`)

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}

export function getDemoBySlug(slug: string) {
  return demos.find((demo) => demo.slug === slug)
}
```

- [ ] **Step 3: Run static verification**

Run: `npm run lint`

Expected: command exits 0. If lint reports pre-existing warnings outside the touched files, capture the output and continue only after confirming there is no syntax/type issue in `lib/site.ts` or `lib/organic-content.ts`.

- [ ] **Step 4: Update task tracking**

In `tasks/todo.md`, add an implementation checklist section with Task 1 marked complete after verification.

- [ ] **Step 5: Commit Task 1**

Run:

```bash
/usr/bin/git add lib/site.ts lib/organic-content.ts tasks/todo.md
/usr/bin/git commit -m "feat: add organic content model"
```

Expected: commit succeeds.

---

### Task 2: Structured Data Helpers

**Files:**
- Create: `lib/structured-data.ts`
- Test by command: `npm run lint`

**Interfaces:**
- Consumes: `Guide`, `Demo`, `absoluteUrl`
- Produces: `buildOrganizationJsonLd(): Record<string, unknown>`
- Produces: `buildSoftwareJsonLd(): Record<string, unknown>`
- Produces: `buildGuideJsonLd(guide: Guide): Record<string, unknown>[]`
- Produces: `buildDemoJsonLd(demo: Demo): Record<string, unknown>[]`
- Produces: `buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>): Record<string, unknown>`

- [ ] **Step 1: Create JSON-LD builders**

Create `lib/structured-data.ts` with these exact exported function names:

```ts
import type { Demo, Guide } from "@/lib/organic-content"
import { absoluteUrl, SITE_URL } from "@/lib/site"

const publisher = {
  "@type": "Organization",
  name: "Cadencio",
  url: SITE_URL,
  logo: absoluteUrl("/icon.svg"),
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cadencio",
    url: SITE_URL,
    logo: absoluteUrl("/icon.svg"),
  }
}

export function buildSoftwareJsonLd() {
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

export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
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

export function buildGuideJsonLd(guide: Guide) {
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

export function buildDemoJsonLd(demo: Demo) {
  const video = demo.videoUrl
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: demo.title,
        description: demo.description,
        thumbnailUrl: demo.thumbnail ? [absoluteUrl(demo.thumbnail)] : [absoluteUrl("/icon.svg")],
        uploadDate: "2026-06-24",
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
```

- [ ] **Step 2: Verify static import/type correctness**

Run: `npm run lint`

Expected: command exits 0.

- [ ] **Step 3: Commit Task 2**

Run:

```bash
/usr/bin/git add lib/structured-data.ts
/usr/bin/git commit -m "feat: add structured data helpers"
```

Expected: commit succeeds.

---

### Task 3: Shared Guide and Demo Components

**Files:**
- Create: `components/guides/JsonLdScript.tsx`
- Create: `components/guides/Breadcrumbs.tsx`
- Create: `components/guides/TrialCtaBand.tsx`
- Create: `components/guides/VideoDemoPanel.tsx`
- Create: `components/guides/GuideCard.tsx`
- Create: `components/guides/DemoCard.tsx`

**Interfaces:**
- Consumes: `TRIAL_CTA`
- Consumes: `Guide`
- Consumes: `Demo`
- Produces: presentational components used by hub, guide, demo library, and demo detail pages.

- [ ] **Step 1: Create `JsonLdScript`**

Create `components/guides/JsonLdScript.tsx`:

```tsx
type JsonLdScriptProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>
}

export function JsonLdScript({ data }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}
```

- [ ] **Step 2: Create `Breadcrumbs`**

Create `components/guides/Breadcrumbs.tsx`:

```tsx
type BreadcrumbItem = {
  label: string
  href: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-500">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-300">/</span>}
            <a className="font-medium hover:text-brand-600" href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
```

- [ ] **Step 3: Create `TrialCtaBand`**

Create `components/guides/TrialCtaBand.tsx`:

```tsx
import { ArrowRight } from "lucide-react"

import { TRIAL_CTA } from "@/lib/site"

export function TrialCtaBand({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`relative overflow-hidden rounded-sm border border-brand-200 bg-brand-50 ${compact ? "p-6" : "p-8 md:p-10"}`}>
      <div className="absolute right-0 top-0 h-16 w-16 border-l-[64px] border-t-[64px] border-l-transparent border-t-brand-200" />
      <div className="relative z-10 max-w-2xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-700">Teste sem compromisso</p>
        <h2 className={`${compact ? "text-2xl" : "text-3xl md:text-4xl"} font-bold tracking-tight text-gray-900`}>
          Organize seu estúdio por 14 dias grátis.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-gray-600">{TRIAL_CTA.helper}</p>
        <a href={TRIAL_CTA.href} className="btn-paper-cut mt-6 inline-flex">
          {TRIAL_CTA.label}
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `VideoDemoPanel`**

Create `components/guides/VideoDemoPanel.tsx`:

```tsx
import { Play, Video } from "lucide-react"

import type { Demo } from "@/lib/organic-content"

export function VideoDemoPanel({ demo, framed = false }: { demo: Demo; framed?: boolean }) {
  return (
    <section className={`rounded-sm border border-gray-200 bg-white ${framed ? "p-5 shadow-xl" : "p-0"}`}>
      <div className="overflow-hidden rounded-sm bg-surface-dark">
        {demo.videoUrl ? (
          <video controls poster={demo.thumbnail ?? undefined} className="aspect-video w-full bg-surface-dark">
            <source src={demo.videoUrl} />
          </video>
        ) : (
          <div className="flex aspect-video flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(36,174,181,0.22),_transparent_42%),#0C0A09] p-8 text-center text-brand-50">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-sm border border-brand-400/30 bg-brand-500/10">
              <Video className="text-accent-mint" size={28} />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent-mint">Demo em produção</p>
            <h3 className="mt-3 max-w-xl text-2xl font-bold tracking-tight">{demo.title}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-50/60">
              O espaço já está reservado para o vídeo gravado e editado da tela real do Cadencio.
            </p>
          </div>
        )}
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-700">Veja no Cadencio</p>
          <h3 className="mt-1 text-xl font-bold text-gray-900">{demo.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">{demo.description}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-brand-200 bg-brand-50 px-3 py-2 text-xs font-bold text-brand-700">
          <Play size={13} />
          {demo.durationLabel}
        </span>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create cards**

Create `GuideCard.tsx` and `DemoCard.tsx` using existing square/angular visual language.

`components/guides/GuideCard.tsx`:

```tsx
import type { Guide } from "@/lib/organic-content"

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <a href={`/guias/${guide.slug}`} className="card-paper-fold group block p-7 transition-transform duration-300 hover:-translate-y-1">
      <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-brand-700">{guide.readingTime}</p>
      <h3 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 group-hover:text-brand-700">{guide.title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-gray-600">{guide.description}</p>
      <span className="mt-6 inline-block text-sm font-bold text-brand-700">Ler guia</span>
    </a>
  )
}
```

`components/guides/DemoCard.tsx`:

```tsx
import { Play } from "lucide-react"

import type { Demo } from "@/lib/organic-content"

export function DemoCard({ demo }: { demo: Demo }) {
  return (
    <a href={`/demos/${demo.slug}`} className="group block overflow-hidden rounded-sm border border-gray-200 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1">
      <div className="flex aspect-video items-center justify-center bg-surface-dark text-brand-50">
        <div className="flex h-14 w-14 items-center justify-center rounded-sm border border-brand-400/30 bg-brand-500/15 transition-transform group-hover:scale-105">
          <Play className="ml-0.5 text-accent-mint" size={24} />
        </div>
      </div>
      <div className="p-6">
        <p className="text-[11px] font-bold uppercase tracking-widest text-brand-700">{demo.relatedFeature} · {demo.durationLabel}</p>
        <h3 className="mt-3 text-xl font-bold leading-tight text-gray-900">{demo.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{demo.description}</p>
      </div>
    </a>
  )
}
```

- [ ] **Step 6: Verify components**

Run: `npm run lint`

Expected: command exits 0.

- [ ] **Step 7: Commit Task 3**

Run:

```bash
/usr/bin/git add components/guides
/usr/bin/git commit -m "feat: add guide shared components"
```

Expected: commit succeeds.

---

### Task 4: Guias Hub and Guide Detail Routes

**Files:**
- Create: `app/guias/page.tsx`
- Create: `app/guias/[slug]/page.tsx`

**Interfaces:**
- Consumes: `guides`, `demos`, `getGuideBySlug`, `getDemoBySlug`
- Consumes: `GuideCard`, `VideoDemoPanel`, `TrialCtaBand`, `Breadcrumbs`, `JsonLdScript`
- Consumes: `buildGuideJsonLd`, `buildBreadcrumbJsonLd`, `buildOrganizationJsonLd`, `buildSoftwareJsonLd`

- [ ] **Step 1: Build `/guias` hub**

Create `app/guias/page.tsx` with:

```tsx
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
              Conteúdos diretos sobre presença, turmas, planilhas e histórico, sempre com demos para ver o Cadencio em ação.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-700">Comece por aqui</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Guias essenciais</h2>
            </div>
            <a href="/demos" className="font-bold text-brand-700 hover:text-brand-600">Ver demos</a>
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
              <p className="text-xs font-bold uppercase tracking-widest text-brand-700">Watch demos</p>
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
```

- [ ] **Step 2: Build `/guias/[slug]` route**

Create `app/guias/[slug]/page.tsx`:

```tsx
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
            <Breadcrumbs items={[
              { label: "Início", href: "/" },
              { label: "Guias", href: "/guias" },
            ]} />
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-brand-700">{guide.primaryKeyword}</p>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">{guide.title}</h1>
            <p className="mt-6 text-xl leading-relaxed text-gray-600">{guide.heroSummary}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm font-semibold text-gray-500">
              <span>{guide.readingTime}</span>
              <span>Atualizado em {new Date(`${guide.updatedAt}T00:00:00`).toLocaleDateString("pt-BR")}</span>
            </div>
            <a href={TRIAL_CTA.href} className="btn-paper-cut mt-8 inline-flex">{TRIAL_CTA.label}</a>
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
                {index === 0 && demo && (
                  <div className="mt-10">
                    <VideoDemoPanel demo={demo} framed />
                  </div>
                )}
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
                  <a key={relatedGuide.slug} href={`/guias/${relatedGuide.slug}`} className="block text-sm font-bold leading-snug text-gray-900 hover:text-brand-700">
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
```

- [ ] **Step 3: Verify routes**

Run: `npm run lint`

Expected: command exits 0.

Run: `npm run build`

Expected: command exits 0 and includes generated static routes for `/guias` and `/guias/[slug]`.

- [ ] **Step 4: Commit Task 4**

Run:

```bash
/usr/bin/git add app/guias
/usr/bin/git commit -m "feat: add guides hub pages"
```

Expected: commit succeeds.

---

### Task 5: Demo Library and Demo Detail Routes

**Files:**
- Create: `app/demos/page.tsx`
- Create: `app/demos/[slug]/page.tsx`

**Interfaces:**
- Consumes: `demos`, `getDemoBySlug`, `guides`, `getGuideBySlug`
- Consumes: `DemoCard`, `VideoDemoPanel`, `TrialCtaBand`, `Breadcrumbs`, `JsonLdScript`
- Consumes: `buildDemoJsonLd`

- [ ] **Step 1: Build `/demos` library page**

Create `app/demos/page.tsx`:

```tsx
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
  title: "Demos Cadencio | Veja o Produto em Ação",
  description: "Assista aos fluxos do Cadencio para presença, turmas, planilhas e histórico em estúdios de dança.",
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
        <section className="relative overflow-hidden bg-surface-dark py-20 text-brand-50">
          <div className="absolute inset-0 opacity-60" style={{ background: "var(--gradient-aurora)" }} />
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-accent-mint">Watch demos</p>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-6xl">
              Veja como o Cadencio resolve a rotina do estúdio.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-50/70">
              Demos curtas para entender chamada, turmas, importação e histórico antes de começar o teste grátis.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
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
```

- [ ] **Step 2: Build `/demos/[slug]` route**

Create `app/demos/[slug]/page.tsx`:

```tsx
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
        <Breadcrumbs items={[
          { label: "Início", href: "/" },
          { label: "Demos", href: "/demos" },
        ]} />
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

        {relatedGuides.length > 0 && (
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
        )}

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <TrialCtaBand />
        </section>
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 3: Verify demo routes**

Run: `npm run lint`

Expected: command exits 0.

Run: `npm run build`

Expected: command exits 0 and includes generated static routes for `/demos` and `/demos/[slug]`.

- [ ] **Step 4: Commit Task 5**

Run:

```bash
/usr/bin/git add app/demos
/usr/bin/git commit -m "feat: add product demo pages"
```

Expected: commit succeeds.

---

### Task 6: Sitemap, Robots, Metadata, Navigation, and Footer

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Modify: `app/layout.tsx`
- Modify: `components/navbar.tsx`
- Modify: `components/footer.tsx`

**Interfaces:**
- Consumes: `SITE_URL`, `absoluteUrl`, `TRIAL_CTA`, `guideRoutes`, `demoRoutes`
- Produces: crawlable sitemap and robots output
- Produces: visible navigation to Guias and Demos

- [ ] **Step 1: Add sitemap**

Create `app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next"

import { demoRoutes, guideRoutes } from "@/lib/organic-content"
import { absoluteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date()

  const staticRoutes = ["/", "/guias", "/demos"]

  return [...staticRoutes, ...guideRoutes, ...demoRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: today,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : route === "/guias" ? 0.9 : 0.7,
  }))
}
```

- [ ] **Step 2: Add robots**

Create `app/robots.ts`:

```ts
import type { MetadataRoute } from "next"

import { absoluteUrl, SITE_URL } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  }
}
```

- [ ] **Step 3: Update root metadata**

In `app/layout.tsx`, update the default metadata so the description and robots are aligned with the trial and organic hub:

```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://www.cadencio.app"),
  title: "Cadencio | Gestão para Estúdios de Dança",
  description: "Controle presença, turmas, alunos e histórico em um só lugar. Teste o Cadencio grátis por 14 dias e cancele quando quiser.",
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Cadencio | Gestão Simplificada para Estúdios de Dança",
    description: "A maneira mais fácil de organizar seu estúdio: presença, turmas, alunos e histórico em um só lugar.",
    siteName: "Cadencio",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cadencio | Gestão para Estúdios de Dança",
    description: "Seu estúdio organizado, sem papel e sem planilha. Teste grátis por 14 dias.",
    images: ["/opengraph-image"],
  },
}
```

- [ ] **Step 4: Update navbar**

In `components/navbar.tsx`:

- Remove the unused `WHATSAPP_GENERAL as WHATSAPP` import if it remains unused.
- Import `APP_URL` or `TRIAL_CTA` from `@/lib/site` instead of defining duplicate constants.
- Add `{ href: "/guias", label: "Guias" }` to the desktop and mobile navigation.
- Keep section anchors for landing-page sections.
- Change the primary button text from `Começar grátis` to `Teste 14 dias`.

The section array should become:

```ts
const SECTIONS = [
  { href: "/#protocolos", label: "Funcionalidades" },
  { href: "/#como-funciona", label: "Como Funciona" },
  { href: "/#precos", label: "Preços" },
  { href: "/guias", label: "Guias" },
]
```

When rendering links, use `href={s.href}` instead of `href={`#${s.id}`}`.

- [ ] **Step 5: Update footer**

In `components/footer.tsx`:

- Add `Guias` and `Demos` links.
- Replace `Entrar Grátis` pointing to `#beta` with `Teste grátis por 14 dias` pointing to `https://my.cadencio.app/register`.
- Remove the unused `Linkedin` import if it remains unused.

The Navegue group should include:

```tsx
<li><a href="/#protocolos" className="hover:text-accent-mint transition-colors">Funcionalidades</a></li>
<li><a href="/#como-funciona" className="hover:text-accent-mint transition-colors">Como Funciona</a></li>
<li><a href="/guias" className="hover:text-accent-mint transition-colors">Guias</a></li>
<li><a href="/demos" className="hover:text-accent-mint transition-colors">Demos</a></li>
<li><a href="https://my.cadencio.app/register" className="hover:text-accent-mint transition-colors">Teste grátis por 14 dias</a></li>
```

- [ ] **Step 6: Verify technical SEO routes and navigation**

Run: `npm run lint`

Expected: command exits 0.

Run: `npm run build`

Expected: command exits 0.

Run: `npm run dev`

Expected: local server starts. Visit `/sitemap.xml`, `/robots.txt`, `/guias`, and `/demos` in the browser. Stop the dev server after verification.

- [ ] **Step 7: Commit Task 6**

Run:

```bash
/usr/bin/git add app/sitemap.ts app/robots.ts app/layout.tsx components/navbar.tsx components/footer.tsx
/usr/bin/git commit -m "feat: expose guides for search"
```

Expected: commit succeeds.

---

### Task 7: Browser QA and Polish Pass

**Files:**
- Modify only files created or changed in Tasks 1-6 if QA reveals layout, copy, or metadata issues.
- Modify: `tasks/todo.md`

**Interfaces:**
- Consumes: completed routes and components.
- Produces: verified first release ready for user review.

- [ ] **Step 1: Start dev server**

Run: `npm run dev`

Expected: server starts on an available local port.

- [ ] **Step 2: Desktop browser checks**

Open and inspect:

- `/`
- `/guias`
- `/guias/controle-de-presenca-estudio-danca`
- `/guias/organizar-turmas-horarios-escola-danca`
- `/demos`
- `/demos/chamada-de-turma-em-1-minuto`
- `/sitemap.xml`
- `/robots.txt`

Verify:

- No visible text overflow.
- Navbar link to `Guias` works.
- Footer links to `Guias`, `Demos`, and trial work.
- Demo slot clearly says `Demo em produção` when `videoUrl` is null.
- Pages do not claim a video is playable when no asset exists.
- CTAs say `Teste grátis por 14 dias` or compatible short copy.

- [ ] **Step 3: Mobile browser checks**

Use a mobile viewport around 390px wide.

Verify:

- Mobile menu opens and includes `Guias`.
- Guide article headings wrap cleanly.
- Demo slot and cards do not overflow.
- CTA buttons stay readable and tappable.

- [ ] **Step 4: Final verification commands**

Run:

```bash
npm run lint
npm run build
```

Expected: both commands exit 0.

- [ ] **Step 5: Update task review**

In `tasks/todo.md`, add final verification evidence:

- lint command and result.
- build command and result.
- browser routes checked.
- any known limitation, especially whether real recorded demo files were provided or whether temporary demo slots are still in use.

- [ ] **Step 6: Commit QA updates**

Run:

```bash
/usr/bin/git add app components lib tasks/todo.md
/usr/bin/git commit -m "chore: verify guides launch surface"
```

Expected: commit succeeds if QA caused tracked changes. If no files changed, record that no QA commit was needed.

---

## Plan Self-Review

### Spec Coverage

- `/guias` hub page: Task 4.
- At least 4 guide pages: Task 1 content plus Task 4 route generation.
- `/demos` library page: Task 5.
- At least 4 demo entries: Task 1 data plus Task 5 pages.
- Recorded demo support with honest fallback: Task 1 `videoUrl: null`, Task 3 `VideoDemoPanel`, Task 7 browser checks.
- Sitemap and robots routes: Task 6.
- Per-page metadata: Tasks 4, 5, 6.
- Structured data: Tasks 2, 4, 5.
- Navigation link to Guias: Task 6.
- Trial CTA: Tasks 1, 3, 4, 5, 6.
- Visual consistency: Tasks 3, 4, 5, 7.
- Verification through build, lint, and browser checks: Tasks 4, 5, 6, 7.

### Intentional Phase-1 Deferrals

- Real `.mp4` files are not committed by this plan because no video assets have been provided yet.
- CMS integration is excluded by the approved design.
- Adjacent vertical clusters for academias de luta and pilates are excluded from phase 1.

### Execution Recommendation

Use subagent-driven execution. The task boundaries are independent enough for fresh implementation workers, and each task has a narrow review gate.
