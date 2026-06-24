# Cadencio Organic Growth Page

## Goal
Define the organic acquisition strategy for Cadencio before implementing blog or SEO pages.

## Checklist
- [x] Confirm current checkout and branch.
- [x] Inspect current landing page structure and metadata.
- [x] Check existing product/design docs for positioning constraints.
- [x] Clarify the first organic acquisition target.
- [x] Propose 2-3 SEO/content architecture approaches with trade-offs.
- [x] Define how "watch demos" fit into the hub.
- [x] Pick the approved approach.
- [x] Write the approved design spec under `docs/superpowers/specs/`.
- [x] Review the spec for scope, ambiguity, and implementation risk.
- [x] Create an implementation plan after spec approval.

## Current Notes
- Current repo: `/Users/luancarvalho/Documents/GitHub/Cadencio`.
- Current branch: `new-organic-page`.
- Existing app is a Next.js 16 landing page, not the main SaaS app.
- Current home page is a one-page sales landing with hero, problem, features, philosophy, how-it-works, pricing, and footer.
- There is no blog, sitemap, robots route, or multi-page SEO structure yet.
- Existing positioning is Brazilian Portuguese, Cadencio origami identity, and practical pain around caderno, planilha, presenca, turmas, alunos, and estúdios.
- First organic target: estúdios de dança. Adjacent verticals like academias de luta remain relevant because the operational pain is similar, but they should not dilute the initial positioning.
- Primary organic conversion: start the Cadencio 14-day free trial, cancelable anytime. WhatsApp may support objections, but the page should not make "beta gratuito" the main promise.
- The organic hub should include "watch demos" so buyers can see Cadencio solving the exact operational pain described in each guide/page.
- Demo format decision: prioritize recorded and edited product videos. Mockups can be used as temporary visual wrappers, but the primary trust asset should be a real screen recording with concise editing.
- Organic hub name decision: use "Guias" in navigation and URLs, not "Blog" or "Aprenda".

## Review
- Design spec written at `docs/superpowers/specs/2026-06-24-cadencio-guias-demos-organic-design.md`.
- Self-review checked for incomplete markers, scope ambiguity, and whitespace errors.
- `.superpowers/` was added to `.gitignore` because the brainstorming companion generated local temporary files there.
- Implementation plan written at `docs/superpowers/plans/2026-06-24-cadencio-guias-demos-implementation.md`.
- Implementation has not started. Next step is choosing execution mode and then building task-by-task.

## Implementation Checklist
- [x] Task 1: Content model and site helpers created in `lib/site.ts` and `lib/organic-content.ts`.
- [x] Task 1 verification: `npm run lint` was blocked because `eslint` is not installed in this checkout; direct TypeScript check of the touched files passed.
- [x] Task 2: Structured data helpers in `lib/structured-data.ts`.
- [x] Task 2 verification: Task 2 code is complete. `npm run lint` is blocked in this checkout because ESLint is not installed/configured; focused TypeScript check for `lib/site.ts`, `lib/organic-content.ts`, and `lib/structured-data.ts` passed.
- [x] Task 2 commit: `feat: add structured data helpers`.

## Review
- `lib/structured-data.ts` now exports the five requested JSON-LD builders and keeps schema strings aligned with the current Portuguese page content.
- Demo JSON-LD only includes `VideoObject` when `demo.videoUrl` is present; the current organic demo data still produces breadcrumb-only output.

## Implementation Checklist
- [x] Task 1: Content model and site helpers created in `lib/site.ts` and `lib/organic-content.ts`.
- [x] Task 1 verification: `npm run lint` was blocked because `eslint` is not installed in this checkout; direct TypeScript check of the touched files passed.
- [x] Task 2: Structured data helpers in `lib/structured-data.ts`.
- [x] Task 2 verification: Task 2 code is complete. `npm run lint` is blocked in this checkout because ESLint is not installed/configured; focused TypeScript check for `lib/site.ts`, `lib/organic-content.ts`, and `lib/structured-data.ts` passed.
- [x] Task 2 commit: `feat: add structured data helpers`.
- [x] Task 3: Shared guide and demo components in `components/guides/*`.
- [x] Task 3 verification: `npm run lint` failed in this checkout with `ESLint output (JSON parse failed: EOF while parsing a value at line 1 column 0)`; focused TypeScript check of the new guide component files passed.
- [x] Task 3 commit: `feat: add guide shared components`.
- [x] Task 4: Build `app/guias/page.tsx` hub route with navbar, footer, metadata, guide/demo sections, and JSON-LD.
- [x] Task 4: Build `app/guias/[slug]/page.tsx` detail route with async `params`, static params, metadata, breadcrumbs, inline demo panel, FAQ, related guides, and JSON-LD.
- [x] Task 4 verification: ran `npm run lint`, `npm run build`, and `./node_modules/.bin/tsc --noEmit --pretty false --project tsconfig.json`; build passed and generated `/guias` plus all guide slugs, lint still failed with the known ESLint JSON parse/tooling issue, and `tsc` still fails only on the pre-existing `components/scroll-birds.tsx` error.

## Task 4 Notes
- Scope is limited to `app/guias/page.tsx`, `app/guias/[slug]/page.tsx`, and this tracker file.
- Next.js 16 requires `params` to be awaited in both the page component and `generateMetadata`.
- Full repo `tsc --noEmit` is known to fail on a pre-existing `components/scroll-birds.tsx` issue and is out of scope for this task.

## Task 4 Review
- Added the `/guias` hub as a server route with site chrome, SEO metadata, organization/software JSON-LD, guide cards, demo cards, and the shared trial CTA.
- Added the `/guias/[slug]` guide detail route as a server component with awaited `params`, `generateStaticParams`, per-guide metadata, breadcrumb/article JSON-LD, inline demo panel placement, FAQ block, and related guide links.
- `npm run build` succeeded and emitted static routes for `/guias` and all four current guide slugs.
- Known repo issues remain unchanged: `npm run lint` exits with `ESLint output (JSON parse failed: EOF while parsing a value at line 1 column 0)` and full `tsc` still reports the existing `components/scroll-birds.tsx` cast error.
- Current hub/demo cards link to `/demos` routes that are still out of scope for Task 4 and are not yet present in `app/`.

## Task 4 Review Fixes
- Replaced the remaining English visitor-facing copy on `/guias` with Brazilian Portuguese.
- Aligned the free-trial CTA pair globally to `Teste grátis por 14 dias` plus `Cancele quando quiser.` and added the supporting copy next to the guide-detail hero CTA.
- Made the guide-detail hero render `guide.description` visibly ahead of `guide.heroSummary`, keeping article JSON-LD aligned with page content.
- Made the `/guias` hub visibly render the same product description used by `buildSoftwareJsonLd()` so the injected software schema matches visible copy.

## Task 5 Checklist
- [x] Confirmar o brief do Task 5 e os componentes/lib já disponíveis para `/demos`.
- [x] Atualizar este tracker com o escopo, restrições e critérios de verificação do Task 5.
- [x] Criar `app/demos/page.tsx` com navbar, footer, metadata, JSON-LD e grid de demos.
- [x] Criar `app/demos/[slug]/page.tsx` com async `params`, metadata, breadcrumbs, painel de demo, transcrição e guias relacionados.
- [x] Rodar `npm run lint` e `npm run build`, registrando o resultado real.
- [x] Criar commit do Task 5.

## Task 5 Notes
- Escopo restrito a `app/demos/page.tsx`, `app/demos/[slug]/page.tsx` e este arquivo.
- Todo o copy visível para visitantes deve permanecer em português do Brasil.
- As páginas de demo precisam incluir `Navbar` e `Footer`, como as rotas de `/guias`.
- Em Next.js 16, `params` na rota dinâmica devem usar `Promise<{ slug: string }>` e ser aguardados.
- `VideoDemoPanel` já trata corretamente o fallback honesto enquanto `videoUrl` continua `null`.
- Para Open Graph, usar `type: "website"` nas páginas de demo.
- `npm run lint` já é conhecido por falhar neste repositório por tooling/configuração de ESLint ausente ou quebrada; ainda assim o comando deve ser executado e o resultado real precisa ser reportado.
- `npm run build` deve ser executado. O erro já conhecido em `components/scroll-birds.tsx` no `tsc` completo continua fora do escopo deste task.

## Task 5 Review
- Adicionadas as rotas `app/demos/page.tsx` e `app/demos/[slug]/page.tsx` como Server Components, com `Navbar`, `Footer`, metadata, JSON-LD e copy integralmente em português do Brasil.
- A biblioteca `/demos` agora lista todas as demos orgânicas com hero alinhado ao padrão visual de `/guias` e CTA final de teste grátis.
- A rota `/demos/[slug]` usa `params: Promise<{ slug: string }>` com `await`, gera páginas estáticas por slug, renderiza breadcrumb, `VideoDemoPanel`, passos da demo e guias relacionados.
- `npm run build` passou em Next.js 16 e gerou `/demos` mais os quatro slugs atuais de demo em SSG.
- `npm run lint` continua bloqueado neste checkout: a execução via `npm run lint` ficou pendurada sem saída útil até interrupção manual, e a chamada direta a `eslint .` retorna `zsh:1: command not found: eslint`, indicando ausência do binário/configuração operacional de ESLint no ambiente atual.

## Task 6 Checklist
- [x] Ler o brief do Task 6 e confirmar os helpers/rotas já disponíveis.
- [x] Atualizar este tracker com escopo, restrições e critérios de verificação do Task 6.
- [x] Criar `app/sitemap.ts` usando `MetadataRoute.Sitemap`.
- [x] Criar `app/robots.ts` usando `MetadataRoute.Robots`.
- [x] Atualizar `app/layout.tsx` com metadata alinhada ao trial de 14 dias e às rotas orgânicas.
- [x] Atualizar `components/navbar.tsx` com link visível para `Guias`, âncoras absolutas e CTA de teste por 14 dias.
- [x] Atualizar `components/footer.tsx` com links para `Guias`/`Demos` e CTA de teste por 14 dias.
- [x] Rodar `npm run lint` e `npm run build`, registrando o resultado real.
- [ ] Criar commit do Task 6.

## Task 6 Notes
- Escopo restrito a `app/sitemap.ts`, `app/robots.ts`, `app/layout.tsx`, `components/navbar.tsx`, `components/footer.tsx` e este tracker.
- Todo o copy visível para visitantes deve permanecer em português do Brasil.
- Links para seções da home a partir de páginas internas devem usar `/#...`, não âncoras relativas simples.
- `Navbar` deve continuar sendo Client Component; imports de `lib/site.ts` são seguros apenas por serem constantes estáticas.
- `npm run lint` precisa ser executado e reportado, mas já é conhecido neste checkout por falhar ou ficar bloqueado por tooling/configuração de ESLint ausente.
- `npm run build` deve ser executado. O erro já conhecido de `components/scroll-birds.tsx` em `tsc` completo continua fora do escopo deste task.

## Task 6 Review
- Adicionados `app/sitemap.ts` e `app/robots.ts` com `MetadataRoute`, reaproveitando `guideRoutes`, `demoRoutes`, `SITE_URL` e `absoluteUrl` para expor o hub orgânico e seus slugs.
- A metadata global de `app/layout.tsx` agora anuncia o teste grátis por 14 dias, inclui regras de `robots` e alinha Open Graph/Twitter ao posicionamento orgânico atual.
- `components/navbar.tsx` ganhou navegação visível para `Guias`, passou a usar âncoras absolutas (`/#...`) e trocou o CTA por `Teste grátis por 14 dias`, sem perder o status de Client Component.
- `components/footer.tsx` agora linka corretamente para home sections a partir de páginas internas, adiciona `Guias` e `Demos` e troca o CTA por `Teste grátis por 14 dias`.
- `npm run build` passou e gerou `○ /robots.txt` e `○ /sitemap.xml` junto de `/guias` e `/demos`.
- `npm run lint` continua bloqueado neste checkout: a execução via `npm run lint` não produziu saída útil e ficou pendurada até interrupção manual.
- Verificação local da build servida em `http://127.0.0.1:3002` confirmou `200 OK` para `/sitemap.xml`, `/robots.txt`, `/guias` e `/demos`; `sitemap.xml` lista as rotas de guias/demos e `robots.txt` publica `Host` e `Sitemap` corretos.
- O único erro de console visto no browser foi preexistente/ambiental: `/_vercel/insights/script.js` retornando `404` fora da Vercel por causa do `Analytics`.
