#!/usr/bin/env node
/**
 * Valida os guias em content/guias/*.json antes do build/deploy.
 *
 * Uso: npm run validate:guias
 *
 * ERROS bloqueiam o build (estrutura, slugs, categorias, claims proibidos).
 * AVISOS não bloqueiam (limites de SEO recomendados) — revise antes de publicar.
 *
 * Este script é o portão de qualidade do pipeline de blogs por IA:
 * ver docs/blog-pipeline/README.md.
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const GUIDES_DIR = path.join(ROOT, "content", "guias")
const ORGANIC_CONTENT = path.join(ROOT, "lib", "organic-content.ts")

// Manter em sincronia com GuideCategory em lib/organic-content.ts
const ALLOWED_CATEGORIES = ["presenca", "turmas", "planilhas", "historico", "financeiro", "retencao"]

// Funcionalidades que NÃO existem no produto. Se um guia mencionar, o build falha.
// Fonte da verdade: docs/blog-pipeline/CADENCIO-FACTS.md
const BANNED_CLAIMS = [
  { pattern: /baixar o (app|aplicativo)|aplicativo do cadencio|app do cadencio/i, reason: "Cadencio não tem app instalável — funciona no navegador" },
  { pattern: /portal (da|do) alun[ao]|app para (as )?alunas/i, reason: "não existe portal/app para alunas" },
  { pattern: /cobrança automática|cobrança recorrente|débito automático|boleto|pix automático|emite nota/i, reason: "o financeiro registra e acompanha pagamentos; não cobra as alunas automaticamente" },
  { pattern: /lembretes? automáticos?|notificaç(ão|ões) automáticas?|dispara mensagens|whatsapp automático/i, reason: "não existem notificações/lembretes automáticos para alunas" },
  { pattern: /integração com/i, reason: "não anunciar integrações com terceiros" },
  { pattern: /mais de um professor por turma|múltiplos professores/i, reason: "multi-professor por turma ainda não foi lançado" },
]

const REQUIRED_STRINGS = ["title", "slug", "description", "category", "intent", "primaryKeyword", "publishedAt", "updatedAt", "readingTime", "heroSummary"]
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/

function extractDemoSlugs() {
  // Os demos vivem em lib/organic-content.ts; extrai os slugs do array `demos`.
  const src = fs.readFileSync(ORGANIC_CONTENT, "utf8")
  const demosBlock = src.slice(src.indexOf("export const demos"), src.indexOf("satisfies Demo[]"))
  return [...demosBlock.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1])
}

function collectText(guide) {
  const parts = [guide.title, guide.description, guide.heroSummary, guide.intent]
  for (const section of guide.sections ?? []) parts.push(section.heading, ...(section.body ?? []))
  for (const item of guide.faq ?? []) parts.push(item.question, item.answer)
  return parts.filter((p) => typeof p === "string").join("\n")
}

const files = fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith(".json")).sort()
const demoSlugs = extractDemoSlugs()
const errors = []
const warnings = []
const guides = []

for (const file of files) {
  const label = `content/guias/${file}`
  let guide
  try {
    guide = JSON.parse(fs.readFileSync(path.join(GUIDES_DIR, file), "utf8"))
  } catch (err) {
    errors.push(`${label}: JSON inválido — ${err.message}`)
    continue
  }
  guides.push({ file, guide })

  for (const field of REQUIRED_STRINGS) {
    if (typeof guide[field] !== "string" || guide[field].trim() === "") {
      errors.push(`${label}: campo obrigatório ausente ou vazio: "${field}"`)
    }
  }

  if (guide.slug && `${guide.slug}.json` !== file) errors.push(`${label}: slug "${guide.slug}" não corresponde ao nome do arquivo`)
  if (guide.slug && !SLUG_RE.test(guide.slug)) errors.push(`${label}: slug deve conter apenas letras minúsculas, números e hífens`)
  if (guide.category && !ALLOWED_CATEGORIES.includes(guide.category)) {
    errors.push(`${label}: categoria "${guide.category}" não permitida (permitidas: ${ALLOWED_CATEGORIES.join(", ")})`)
  }
  for (const field of ["publishedAt", "updatedAt"]) {
    if (guide[field] && !DATE_RE.test(guide[field])) errors.push(`${label}: "${field}" deve estar no formato YYYY-MM-DD`)
  }
  if (guide.readingTime && !/^\d+ min$/.test(guide.readingTime)) errors.push(`${label}: readingTime deve ter o formato "N min"`)

  if (!Array.isArray(guide.secondaryKeywords) || guide.secondaryKeywords.length < 2) {
    errors.push(`${label}: secondaryKeywords precisa de pelo menos 2 itens`)
  }
  if (!Array.isArray(guide.sections) || guide.sections.length < 3) {
    errors.push(`${label}: precisa de pelo menos 3 seções`)
  } else {
    guide.sections.forEach((section, i) => {
      if (typeof section.heading !== "string" || !Array.isArray(section.body) || section.body.length < 1) {
        errors.push(`${label}: seção ${i + 1} precisa de "heading" e "body" com pelo menos 1 parágrafo`)
      } else if (section.body.length < 2) {
        warnings.push(`${label}: seção "${section.heading}" tem só 1 parágrafo (recomendado: 2+)`)
      }
    })
  }
  if (!Array.isArray(guide.faq) || guide.faq.length < 2) {
    errors.push(`${label}: precisa de pelo menos 2 perguntas no FAQ`)
  }
  if (!Array.isArray(guide.relatedGuides) || guide.relatedGuides.length < 1) {
    errors.push(`${label}: relatedGuides precisa de pelo menos 1 slug`)
  }

  if (guide.demoSlug != null && !demoSlugs.includes(guide.demoSlug)) {
    errors.push(`${label}: demoSlug "${guide.demoSlug}" não existe (demos disponíveis: ${demoSlugs.join(", ")}). Use null se não houver demo.`)
  }

  const text = collectText(guide)
  for (const { pattern, reason } of BANNED_CLAIMS) {
    const match = text.match(pattern)
    if (match) errors.push(`${label}: claim proibido "${match[0]}" — ${reason}`)
  }

  if (guide.description && (guide.description.length > 170 || guide.description.length < 70)) {
    warnings.push(`${label}: description com ${guide.description.length} caracteres (recomendado: 70–170 para meta description)`)
  }
  if (guide.title && guide.title.length > 70) {
    warnings.push(`${label}: title com ${guide.title.length} caracteres (recomendado: até 70 para o Google)`)
  }
}

// Referências cruzadas entre guias
const allSlugs = new Set(guides.map(({ guide }) => guide.slug))
for (const { file, guide } of guides) {
  for (const related of guide.relatedGuides ?? []) {
    if (related === guide.slug) errors.push(`content/guias/${file}: relatedGuides não pode referenciar o próprio guia`)
    else if (!allSlugs.has(related)) errors.push(`content/guias/${file}: relatedGuides aponta para guia inexistente "${related}"`)
  }
}

for (const warning of warnings) console.warn(`⚠️  ${warning}`)
if (errors.length > 0) {
  for (const error of errors) console.error(`❌ ${error}`)
  console.error(`\n${errors.length} erro(s) em ${files.length} guia(s). Corrija antes de publicar.`)
  process.exit(1)
}
console.log(`✅ ${files.length} guia(s) válidos${warnings.length ? ` (${warnings.length} aviso(s))` : ""}.`)
