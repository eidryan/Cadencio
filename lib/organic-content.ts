import fs from "node:fs"
import path from "node:path"

// Categorias permitidas. Ao adicionar uma nova, atualize também ALLOWED_CATEGORIES
// em scripts/validate-guides.mjs (o validador roda fora do TypeScript).
export type GuideCategory = "presenca" | "turmas" | "planilhas" | "historico" | "financeiro" | "retencao"

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
  demoSlug: string | null
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
    durationLabel: "20 s",
    durationIso: "PT20S",
    videoUrl: "/demos/chamada-de-turma-em-1-minuto.mp4",
    thumbnail: "/demos/chamada-de-turma-em-1-minuto-thumb.webp",
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
    durationLabel: "23 s",
    durationIso: "PT23S",
    videoUrl: "/demos/cadastrar-turma-e-horarios.mp4",
    thumbnail: "/demos/cadastrar-turma-e-horarios-thumb.webp",
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
    durationLabel: "24 s",
    durationIso: "PT24S",
    videoUrl: "/demos/importar-alunos-planilha.mp4",
    thumbnail: "/demos/importar-alunos-planilha-thumb.webp",
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
    durationLabel: "17 s",
    durationIso: "PT17S",
    videoUrl: "/demos/historico-de-presenca-aluna.mp4",
    thumbnail: "/demos/historico-de-presenca-aluna-thumb.webp",
    transcript: [
      "Abra os relatórios e acesse a aba Alunos.",
      "Veja o risco de evasão calculado para cada aluna, combinando faltas seguidas, frequência e inadimplência no período.",
      "Identifique a aluna sinalizada com risco de evasão.",
      "Clique nela para abrir o cadastro completo e ver os detalhes.",
    ],
    relatedFeature: "Histórico de presença",
    relatedGuides: ["acompanhar-faltas-historico-presenca-alunas"],
  },
] satisfies Demo[]

// Guias são carregados de content/guias/*.json — um arquivo por guia.
// Para publicar um novo guia, basta adicionar o JSON e rodar `npm run validate:guias`.
// Ver docs/blog-pipeline/README.md para o workflow completo.
const GUIDES_DIR = path.join(process.cwd(), "content", "guias")

function loadGuides(): Guide[] {
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const raw = JSON.parse(fs.readFileSync(path.join(GUIDES_DIR, file), "utf8")) as Guide
      return { ...raw, demoSlug: raw.demoSlug ?? null }
    })
    .sort((a, b) => (a.publishedAt === b.publishedAt ? a.slug.localeCompare(b.slug) : b.publishedAt.localeCompare(a.publishedAt)))
}

export const guides = loadGuides()

export const guideRoutes = guides.map((guide) => `/guias/${guide.slug}`)
export const demoRoutes = demos.map((demo) => `/demos/${demo.slug}`)

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}

export function getDemoBySlug(slug: string) {
  return demos.find((demo) => demo.slug === slug)
}
