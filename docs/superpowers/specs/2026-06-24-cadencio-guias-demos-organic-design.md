# Cadencio Guias + Demos Organic Growth Design

Date: 2026-06-24
Status: Draft for user review

## 1. Purpose

Cadencio is entering an acquisition phase. The current site is a strong one-page landing page, but organic growth needs more indexable, useful, and conversion-oriented surfaces.

This design creates a new **Guias** content hub for estúdios de dança, supported by recorded product demos. The goal is to rank for high-intent operational problems, help owners understand how to solve them, and convert qualified visitors into the Cadencio 14-day free trial.

## 2. Decisions Already Approved

- The first organic target is **estúdios de dança**.
- Adjacent markets, such as academias de luta and pilates, are valid future verticals because the operational pain is similar, but they should not dilute the first positioning.
- The hub name is **Guias**, not Blog or Aprenda.
- The primary CTA is **Teste grátis por 14 dias. Cancele quando quiser.**
- The "watch demos" asset should be **recorded and edited screen videos**, not only visual mockups or interactive placeholders.
- Mockups may exist as visual wrappers, skeletons, and fallback states, but the trust asset should be the real product in motion.

## 3. Strategy

The organic strategy should combine:

1. **Guides for search intent**
   - Pages that answer operational questions from dance studio owners.
   - Examples: presence control, class organization, student import, replacing spreadsheets, attendance history.

2. **Recorded demos for trust**
   - Short edited videos embedded inside the relevant guides.
   - A standalone demo library for users who want to see the product before reading.

3. **Direct trial conversion**
   - Every guide and demo should lead to the 14-day trial.
   - WhatsApp can remain a support path for objections, but it should not replace the primary trial CTA.

This avoids a generic blog and builds a buyer-oriented education layer.

## 4. Information Architecture

### 4.1 Top-Level Routes

- `/guias`
  - Main hub for educational content.
  - Lists featured guides, content categories, demos, and trial CTA.

- `/guias/[slug]`
  - Individual guide pages.
  - Each guide targets one problem or search intent.

- `/demos`
  - Video library.
  - Organizes recorded demos by workflow.

- `/demos/[slug]`
  - Optional dedicated demo page for important videos.
  - Useful when a video deserves its own metadata, transcript, and shareable URL.

### 4.2 Navigation

Add `Guias` to the main navigation.

Recommended desktop order:

1. Funcionalidades
2. Como funciona
3. Preços
4. Guias
5. Entrar
6. Começar grátis

The landing page should not become content-heavy. It should link to Guias as a deeper learning path while preserving the direct sales flow.

## 5. Content Model

### 5.1 Guide Fields

Each guide should have:

- `title`
- `slug`
- `description`
- `category`
- `intent`
- `primaryKeyword`
- `secondaryKeywords`
- `publishedAt`
- `updatedAt`
- `readingTime`
- `heroSummary`
- `demoSlug`
- `ctaVariant`
- `sections`
- `faq`
- `relatedGuides`

### 5.2 Demo Fields

Each demo should have:

- `title`
- `slug`
- `description`
- `duration`
- `videoUrl`
- `thumbnail`
- `transcript`
- `relatedFeature`
- `relatedGuides`
- `primaryCTA`

The transcript is required. It helps accessibility, makes the demo understandable without audio, and gives search engines textual context for the video.

## 6. Initial Content Pillars

### 6.1 Presence Control

Purpose: capture owners trying to stop using paper attendance lists.

Initial guide:

- Title: `Como controlar presença em estúdio de dança sem caderno ou planilha`
- Intent: pain-aware, operational.
- Demo: `Como fazer chamada de uma turma em menos de 1 minuto`
- CTA: trial.

### 6.2 Class and Schedule Organization

Purpose: capture owners struggling with class schedules, modalities, and recurring classes.

Initial guide:

- Title: `Como organizar turmas e horários em uma escola de dança`
- Intent: solution-aware.
- Demo: `Como cadastrar uma turma e definir horários`
- CTA: trial.

### 6.3 Spreadsheet Replacement

Purpose: capture owners already using Excel or Google Sheets and looking for a better workflow.

Initial guide:

- Title: `Planilha de presença para dança: quando ela deixa de funcionar`
- Intent: comparison and migration.
- Demo: `Como importar alunos de uma planilha para o Cadencio`
- CTA: trial.

### 6.4 Attendance History

Purpose: move from simple attendance tracking to management value.

Initial guide:

- Title: `Como acompanhar faltas e histórico de presença das alunas`
- Intent: operational insight.
- Demo: `Como consultar o histórico de presença de uma aluna`
- CTA: trial.

## 7. Demo Design

### 7.1 Video Format

Each demo should be:

- 30 to 90 seconds.
- Real Cadencio screen recording.
- Edited with zooms, cuts, cursor emphasis, and captions.
- Focused on one job, not a full product tour.
- Embedded near the first third of the guide, after the problem is established.

If video production is still in progress during implementation, the page may ship with a visually complete demo slot, thumbnail area, and transcript-ready structure. That fallback should be treated as temporary and should not be described to visitors as a finished video demo.

### 7.2 Demo Page Layout

Recommended page structure:

1. Title and short promise.
2. Video player.
3. Three-step summary of what the viewer saw.
4. Related guide links.
5. Trial CTA.
6. Transcript.

### 7.3 Guide Embed Layout

Within a guide, the demo block should be called:

`Veja no Cadencio`

It should include:

- Video thumbnail/player.
- Short caption explaining the workflow.
- CTA below or beside the video: `Teste grátis por 14 dias`.

## 8. SEO and AI Search Foundations

Google's current Search Central guidance says the same SEO fundamentals apply to AI features like AI Overviews and AI Mode; there are no additional special requirements just to appear in those experiences. The site should therefore focus on crawlable, helpful, people-first content, strong internal links, good page experience, visible text, high-quality videos/images, and structured data that matches the visible page content.

References:

- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data

### 8.1 Technical Requirements

Add:

- `app/sitemap.ts`
- `app/robots.ts`
- Canonical URLs through Next metadata.
- Per-guide metadata titles and descriptions.
- Open Graph images for hub, guide, and demo pages.
- Internal links from home to Guias and between related guides.

### 8.2 Structured Data

Use JSON-LD when applicable:

- `Organization` for Cadencio site identity.
- `SoftwareApplication` or `Product` on relevant commercial pages.
- `Article` on guide pages.
- `VideoObject` on demo pages and guide pages with embedded demos.
- `BreadcrumbList` on guides and demos.
- `FAQPage` only where visible FAQs exist on the page.

Structured data must match visible content. Do not add schema for claims, FAQs, ratings, or videos that are not actually present.

### 8.3 Content Rules

Each guide should:

- Be written in Brazilian Portuguese.
- Speak directly to dance studio owners.
- Use real operational examples instead of generic SaaS copy.
- Avoid inflated claims.
- Include a demo, screenshots, or product visuals.
- Include concrete next steps.
- Link to the trial CTA.

Avoid:

- Thin posts created only for keyword volume.
- Broad articles unrelated to Cadencio's expertise.
- Promising features that are not verified in the product.
- Treating adjacent verticals as the primary message in phase 1.

## 9. Conversion Design

### 9.1 Primary CTA

Use a consistent CTA across hub, guides, and demos:

`Teste grátis por 14 dias`

Supporting line:

`Cancele quando quiser. Sem compromisso.`

### 9.2 CTA Placement

Each guide should include:

- One hero CTA.
- One contextual CTA after the demo.
- One final CTA after the conclusion.

Avoid interruptive popups in the first version.

### 9.3 Secondary CTA

WhatsApp can be present as a smaller support link:

`Prefere tirar uma dúvida antes? Fale com a gente.`

It should be secondary to the free trial.

## 10. Visual Direction

The Guias section should inherit the existing Cadencio landing identity:

- Light theme.
- Teal brand color.
- Origami/paper visual system.
- Angular buttons.
- Premium, hand-crafted feel.
- Brazilian Portuguese.

However, guide pages need stronger readability than the home page:

- Narrower article width.
- Clear headings.
- Sticky or inline table of contents only if it does not distract.
- Demo cards and callouts should be visually rich but not reduce reading clarity.

## 11. Measurement

Track:

- Guide page views.
- Demo plays.
- Demo completion where possible.
- CTA clicks.
- Trial registrations with source path.
- Scroll depth on guides.
- Search Console impressions and clicks per guide URL.

Recommended event names:

- `guide_viewed`
- `demo_played`
- `demo_cta_clicked`
- `guide_trial_cta_clicked`
- `demo_transcript_opened`

## 12. Future Expansion

After the dance studio hub has initial traction, create vertical landing or guide clusters for:

- Academias de luta.
- Pilates.
- Escolas de música or other recurring-class businesses only if product positioning supports them.

These should be separate clusters, not mixed into the initial dance pages.

## 13. Non-Goals

This design does not include:

- A full CMS integration.
- User-generated content.
- Programmatic SEO at scale.
- AI-generated bulk articles.
- Multi-language support.
- Paid acquisition landing pages.
- A redesign of the current homepage.

## 14. Risks and Mitigations

### Risk: Publishing too much generic content

Mitigation: start with four high-intent guides tied to real product demos.

### Risk: Demos becoming outdated

Mitigation: keep videos short and tied to stable workflows. Store `updatedAt` on demos and review when product UI changes.

### Risk: Diluting dance positioning

Mitigation: keep phase 1 copy specific to estúdios de dança. Treat academias de luta as phase 2.

### Risk: Overpromising product capabilities

Mitigation: validate every guide claim against the current SaaS before writing or publishing the content.

## 15. Acceptance Criteria for the First Release

The first release should include:

- `/guias` hub page.
- At least 4 guide pages.
- `/demos` library page.
- At least 4 recorded and edited demo entries. If video production is not ready, ship explicit temporary demo slots without claiming that a playable video exists.
- Sitemap and robots routes.
- Per-page metadata.
- Article, VideoObject, BreadcrumbList, and relevant FAQ structured data where applicable.
- Navigation link to Guias.
- Trial CTA wired to the Cadencio registration flow.
- Visual consistency with the existing Cadencio identity.
- Verification through build, lint, and browser checks before completion.
