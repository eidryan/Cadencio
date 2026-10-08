# Plano único Pro — 08/10/2026

## Objetivo
Padronizar o site e os caminhos de contratação no `my.cadencio.app` no Pro mensal existente de R$ 149, com 14 dias grátis.

## Etapas
- [x] Mapear a página de vendas, CTAs, página beta e onboarding do SaaS.
- [x] Confirmar com o responsável o Pro de R$ 149/mês como oferta única.
- [x] Centralizar oferta e links no site; substituir convite beta por preço e condições reais.
- [x] Unificar o onboarding e encerrar os caminhos de novas contratações de outros planos no SaaS isolado.
- [x] Verificar build, TypeScript, links, layout desktop/mobile e regressões da cobrança.

## Resultado e validação
O site apresenta o Pro por R$ 149/mês após 14 dias grátis. Navbar desktop/mobile, hero, preços, rodapé, guias e demos levam a `https://my.cadencio.app/register?plan=pro&interval=month`; os dados estruturados anunciam a mesma oferta.

No SaaS, a branch `codex/unify-pro-plan` foi preparada em um worktree isolado da principal, preservando o checkout financeiro. Os dois seletores usam a mesma oferta; convites beta válidos levam ao cadastro Pro, links antigos são normalizados e cookies legados voltam ao seletor atual. Novos checkouts aceitam somente Pro/mês e OWNER/ADMIN, e recusam uma nova contratação enquanto há assinatura não terminal. O reconhecimento de preços e contratos legados foi preservado.

Builds e TypeScript completos passaram nos dois projetos. Os 6 guias continuam válidos; os CTAs foram conferidos no HTML de 13 páginas. A suíte segura do SaaS passou com 126 arquivos / 1.956 testes, incluindo 32 casos novos. Testes opt-in de Postgres e migration foram excluídos; não houve teste de cobrança real. ESLint dos arquivos alterados no SaaS: zero erros, um aviso pré-existente de `router` sem uso. O site não tem ESLint instalado.

Site e cadastro conferidos visualmente em desktop e celular. A revisão independente foi aprovada após os ajustes de permissão e proteção de assinaturas existentes. Publicação em produção pendente de integração dos PRs.

---

# Vercel Analytics — configuração

## Goal
Configurar o Web Analytics da Vercel no site `www.cadencio.app`.

## Plano
- [x] Confirmar pacote `@vercel/analytics` em `package.json` e `package-lock.json`
- [x] Confirmar uso de `Analytics` no layout raiz do App Router
- [x] Rodar verificação local (`npm run lint`, `npx tsc --noEmit`, `npm run build`)

## Review
`@vercel/analytics` já estava instalado na versão `1.6.1`, presente no lockfile, e `app/layout.tsx` já renderizava `<Analytics />` dentro do `<body>` do layout raiz. A verificação do bundle confirmou `@vercel/analytics/dist/next` e `/_vercel/insights` no build gerado.

`npm run lint` não pôde validar código porque o script chama `eslint .`, mas `eslint` não está instalado nem listado como dependência do projeto. O typecheck encontrou um erro pré-existente em `components/scroll-birds.tsx`; foi corrigido removendo um cast desnecessário de `SVGElement` para `HTMLElement`.

---

# SEO Blog Pipeline — Guias operados por IA barata

> Plano anterior (Pricing Beta Square) concluído e preservado no histórico git deste arquivo.

## Goal
1. Auditar os 4 guias existentes contra as funcionalidades reais do produto (repo `saas`).
2. Publicar 2 novos guias (financeiro e retenção/evasão) — sem obrigatoriedade de watch demo.
3. Criar mecanismo para produção operacional de guias por modelos de IA mais baratos.

## Auditoria (concluída — ver seção Review)
- [x] Verificar claims dos 4 guias contra o código do app (`saas`)
- [x] Confirmar trial 14 dias (Stripe `trial_period_days: 14`)
- [x] Confirmar risco de evasão em Relatórios → Alunos
- [x] Identificar FEATURE-MAPPING.md desatualizado (financeiro e relatórios já existem)

## Implementação
- [x] `content/guias/` — migrar os 4 guias para JSON (1 arquivo por guia)
- [x] Novo guia: mensalidades e inadimplência (categoria `financeiro`, sem demo)
- [x] Novo guia: risco de evasão (categoria `retencao`, demo `historico-de-presenca-aluna`)
- [x] `lib/organic-content.ts` — carregar guias de `content/guias/*.json`; `demoSlug` opcional; categorias `financeiro` e `retencao`
- [x] `app/guias/[slug]/page.tsx` — renderizar demo só quando existir
- [x] `app/guias/page.tsx` — ajustar copy "sempre com demos"
- [x] `scripts/validate-guides.mjs` — validação de schema, SEO e claims proibidos
- [x] `package.json` — `validate:guias` + gate no `build`
- [x] `docs/blog-pipeline/` — README (workflow), PROMPT.md (prompt pronto p/ IA barata), CADENCIO-FACTS.md (fonte da verdade de funcionalidades)
- [x] Nota de desatualização no FEATURE-MAPPING.md
- [x] Fortalecer FAQ de reposição no guia de histórico (feature existe desde jun/2026)

## Verificação
- [x] `npm run validate:guias` passa com os 6 guias
- [x] `npm run build` passa (SSG gera as 6 páginas de guia)
- [x] Sitemap inclui os 2 novos slugs

## Review

**Auditoria**: os 4 guias existentes estão factualmente corretos (trial 14 dias confirmado no Stripe, importação Excel existe, risco de evasão existe em Relatórios → Alunos). O problema real era subvender: nada de financeiro, relatórios ou reposição. FEATURE-MAPPING.md dizia "billing ❌ / reports UI ❌" — ambos já construídos; recebeu nota de desatualização apontando para CADENCIO-FACTS.md.

**Novos guias**: `controlar-mensalidades-inadimplencia-estudio-danca` (financeiro, sem demo — prova que demo é opcional) e `reduzir-evasao-alunas-estudio-danca` (retenção, reusa o demo historico-de-presenca-aluna).

**Mecanismo**: guias agora vivem em `content/guias/*.json` (1 arquivo por post, carregados por fs em `lib/organic-content.ts`, ordenados por publishedAt desc). `scripts/validate-guides.mjs` valida estrutura, SEO e claims proibidos, e roda no `npm run build` — JSON ruim nunca deploya. `docs/blog-pipeline/` tem README (workflow 5 passos), PROMPT.md (colar em IA barata), CADENCIO-FACTS.md (fonte da verdade verificada no código em 2026-07-03) e BACKLOG.md (8 próximos temas).

**Verificação**: validador ✅ 6 guias; build ✅ 6 páginas SSG; sitemap ✅ 6 slugs; tsc sem erros novos (só o pré-existente em scroll-birds.tsx); HTML gerado confirma guia financeiro sem painel de vídeo e guia de evasão com vídeo; listagem /guias com 6 cards. Nada commitado ainda.
