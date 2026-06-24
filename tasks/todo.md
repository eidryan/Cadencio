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
