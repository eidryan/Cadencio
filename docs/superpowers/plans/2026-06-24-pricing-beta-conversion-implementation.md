# Pricing Beta Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the pricing cards with a full pricing-section beta conversion bridge that sends users to the real Cadencio beta conversion page.

**Architecture:** Keep the existing `Pricing` client component and `#precos` anchor, but replace the paid-plan decision UI with one focused beta invitation. Remove the local `/beta` page detour and keep only the external conversion URL as the section destination.

**Tech Stack:** Next.js App Router, React 19, Tailwind CSS 4 utility classes, lucide-react icons.

## Global Constraints

- Visitor-facing copy must stay in Brazilian Portuguese.
- Preserve the existing `#precos` anchor because Navbar links already target it.
- Use the Cadencio angular/origami visual language from `AGENT-INSTRUCTIONS.md`.
- Conversion destination must be `https://my.cadencio.app/beta/betatesters-2026#funcionalidades`.
- Do not add new dependencies.
- Remove the local `/beta` route created in this branch because it adds an unnecessary conversion step.

---

### Task 1: Replace Pricing With Beta Bridge

**Files:**
- Modify: `components/pricing.tsx`
- Modify: `app/sitemap.ts`
- Delete: `app/beta/page.tsx`
- Modify: `tasks/todo.md`

**Interfaces:**
- Consumes: Existing `Pricing` export used by `app/page.tsx`.
- Produces: A `Pricing` section that still renders `id="precos"` and `data-section-name="Preços"`.

- [ ] **Step 1: Write the failing verification**

Run:

```bash
node -e "const fs=require('fs'); const pricing=fs.readFileSync('components/pricing.tsx','utf8'); const betaUrl='https://my.cadencio.app/beta/betatesters-2026#funcionalidades'; if(!pricing.includes(betaUrl)) throw new Error('Pricing is missing real beta conversion URL'); if(pricing.includes('href=\"/beta\"')) throw new Error('Pricing still links to local /beta route'); if(fs.existsSync('app/beta/page.tsx')) throw new Error('Local /beta page still exists'); console.log('pricing beta conversion check passed');"
```

Expected before implementation: FAIL with `Pricing is missing real beta conversion URL` or `Local /beta page still exists`.

- [ ] **Step 2: Replace the pricing decision UI**

In `components/pricing.tsx`, remove plan data, billing toggle state, and local `/beta` card. Add a constant:

```ts
const BETA_CONVERSION_URL = "https://my.cadencio.app/beta/betatesters-2026#funcionalidades"
```

Render one large beta invitation inside the existing `<section id="precos">`, with:

- headline: `Entre no Beta 2026 antes de escolher um plano`
- support copy that explains beta testers get guided setup and can validate Cadencio before pricing
- primary CTA: `Entrar no Beta 2026`
- secondary CTA: `Ver funcionalidades do beta`
- four reassurance cards: `Acesso completo`, `Configuração guiada`, `Sem cartão agora`, `Feedback direto`

All CTAs in this section must use `href={BETA_CONVERSION_URL}`.

- [ ] **Step 3: Remove the local route detour**

Delete:

```bash
app/beta/page.tsx
```

Update `app/sitemap.ts` so `STATIC_ROUTES` no longer includes `/beta`.

- [ ] **Step 4: Update task tracker**

In `tasks/todo.md`, mark the revised conversion items complete and record verification results.

- [ ] **Step 5: Run focused verification**

Run the Step 1 node command again.

Expected: PASS with `pricing beta conversion check passed`.

- [ ] **Step 6: Run build verification**

Run:

```bash
npm run build
```

Expected: PASS. `/beta` should not appear in the route list.

- [ ] **Step 7: Browser/HTML verification**

If a local server can be started, verify:

- `/` returns 200.
- The pricing section contains `Entre no Beta 2026 antes de escolher um plano`.
- Pricing-section CTA links point to `https://my.cadencio.app/beta/betatesters-2026#funcionalidades`.

If the sandbox blocks server binding or escalation is unavailable, record that limitation and rely on build plus static source checks.
