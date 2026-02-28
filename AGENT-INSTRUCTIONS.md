# Cadencio Landing Page Redesign - Agent Instructions

## MISSION
Complete redesign of the Cadencio landing page to look like something a 100-person team spent months building. Premium, hand-crafted, NOT AI-generated. Brazilian Portuguese throughout.

## CRITICAL CONSTRAINTS
1. **Language:** ALL text in Brazilian Portuguese
2. **Light theme** with teal brand color (#0D7377)
3. **Origami identity:** Paper-like angular elements, flying birds on scroll, edge decorations
4. **NO rounded pill buttons** - use angular/paper-cut aesthetic (see DESIGN-SYSTEM.html)
5. **More visual, less text** - Show don't tell, use mockups/diagrams/illustrations

## DESIGN REFERENCE FILES
- `DESIGN-SYSTEM.html` - Complete CSS/HTML design system v5 with all components
- `DESIGN-BLUEPRINT.md` - Design philosophy and tokens
- `FEATURE-MAPPING.md` - What features to advertise (ONLY what's actually built)

## KEY DESIGN ELEMENTS TO IMPLEMENT

### 1. Global Elements
- **Floating edge origami decorations** - Different colors (teal, coral, violet, mint, gold)
- **Scroll-linked birds** - Fly across screen as user scrolls (see DESIGN-SYSTEM.html JS)
- **Aurora gradient background** - Subtle animated mesh
- **Film grain texture overlay** - Subtle noise for organic feel

### 2. Navigation
- Translucent blur backdrop
- Logo with hover 3D tilt effect
- Section indicator that shows current section name when scrolling
- Angular buttons (not rounded)

### 3. Hero Section (Split Layout - NOT Centered)
- Left side: Badge + Title + Subtitle + CTAs
- Right side: Animated dashboard mockup with floating elements
- Badge: "Beta Gratuito" with animated dot
- Title: "Seu estúdio organizado, sem papel, sem planilha."
- Subtitle: "Controle de presença, turmas e alunos num só lugar — feito para quem administra estúdio, não para quem entende de tecnologia."
- CTAs: [Começar grátis] [Ver como funciona]
- Mockup should show ACTUAL UI elements (schedule grid, attendance checks, student cards)

### 4. Social Proof Bar
- "Usado por estúdios de dança, pilates e artes marciais no Rio"
- Modality icons or testimonial snippets

### 5. Problem Section (3 Pain Points)
- Visual icons/illustrations, not just icons
- Cards with origami corner animations
- Pain points:
  1. "Presença no papel" - cadernos, informações perdidas
  2. "Planilha que só você entende" - sem backup, sem histórico
  3. "Sem dados para decidir" - não sabe quem falta

### 6. Features Section - PRIMARY (Bento Grid, Asymmetric)
Use different card styles for visual interest:

| Feature | Card Style | Icon |
|---------|------------|------|
| Presença em 1 clique | Paper Fold (large, spans 2 cols) | CheckCircle |
| Histórico completo | Origami Corner | Database |
| Gestão de turmas | Layered Paper | Users |
| Pronto em 15 minutos | Violet Accent | Zap |

Each card should have a VISUAL (mini mockup, diagram, or illustration) not just text.

### 7. Features Section - SECONDARY (More Features We HAVE)
4-column grid or horizontal scroll:
- **Importe sua planilha** - Excel upload icon, "Traga seus alunos de uma vez"
- **Equipe colaborativa** - User roles diagram, "Secretárias e professores com seus acessos"
- **Aulas experimentais** - Star badge, "Marque quem veio testar, acompanhe conversão"
- **Feriados configuráveis** - Calendar with X, "Configure dias sem aula"

### 8. How It Works (Timeline)
Visual numbered steps with connecting line:
1. "Crie sua conta" - 30 segundos
2. "Configure suas turmas" - Horários e modalidades
3. "Registre presença" - 1 clique por aluno
Note: "Funciona no navegador. Sem instalação."

### 9. Dashboard Preview Section (NEW - Visual Heavy)
Full-width section showing the actual product:
- Large mockup of dashboard
- Callout annotations pointing to features
- Maybe tabs showing different views (Agenda, Alunos, Turmas)
- This should be IMPRESSIVE - show the product is real

### 10. Stats Section (Dark Background)
Big numbers with gradient text:
- "500+ alunos gerenciados" (or realistic beta number)
- "15 min setup médio"
- "99.9% uptime"
- "0 planilhas necessárias"

### 11. Testimonials (If Available)
Quote cards with photos
Or: "Em breve depoimentos de estúdios beta"

### 12. Pricing Section (Beta)
Simple card: "Gratuito durante o beta"
- Unlimited students
- Unlimited classes
- Suporte via WhatsApp
- No credit card
CTA: [Entrar no Beta]

### 13. FAQ Section
Accordion with common questions:
- "Preciso instalar algo?"
- "Funciona no celular?"
- "Como migro minha planilha?"
- "Quando começa a cobrar?"
- "Meus dados estão seguros?"

### 14. Final CTA Section
- Large text: "Pronto para simplificar seu estúdio?"
- Big CTA button
- Trust indicators (security, support, no commitment)

### 15. Footer
- Logo
- Links
- WhatsApp contact
- "Feito no Rio de Janeiro 🇧🇷"

## BUTTON STYLES (From Design System)
Use angular variants, NOT rounded:
- `btn-primary` - Chamfered corners, teal fill
- `btn-paper-cut` - Notched corners with teal triangles
- `btn-tilted` - Slight rotation
- `btn-stacked` - Layered paper effect
- `btn-ghost` - Outline angular

## CARD STYLES (From Design System)
- `card-paper-fold` - Corner peels revealing teal
- `card-origami-corner` - Floating diamond at corner
- `card-layered-paper` - Teal layers behind
- `card-coral-accent` - Coral left border + triangle
- `card-violet-accent` - Violet corner decoration

## COLORS
```css
--brand-500: #24AEB5 (light teal)
--brand-600: #0D7377 (primary teal)
--brand-700: #0F6266 (dark teal)
--accent-coral: #FF6B6B
--accent-violet: #8B5CF6
--accent-mint: #6EE7B7
--accent-gold: #FFD93D
```

## ANIMATIONS TO IMPLEMENT
1. **Scroll reveal** - Elements fade in as they enter viewport
2. **Scroll birds** - Origami birds fly across based on scroll position
3. **Edge decorations** - Floating origami shapes on margins
4. **Card hover** - Lift + glow + corner fold animations
5. **Button hover** - Shine sweep, shadow lift
6. **Parallax** - Subtle depth on hero elements
7. **Counter animation** - Numbers count up in stats section

## COMPONENT STRUCTURE
Keep component-based architecture:
- `components/hero.tsx` - Split hero with mockup
- `components/problem-section.tsx` - Pain point cards
- `components/features-primary.tsx` - Bento grid
- `components/features-secondary.tsx` - 4-column extras
- `components/how-it-works.tsx` - Timeline
- `components/dashboard-preview.tsx` - Product showcase
- `components/stats-section.tsx` - Dark stats band
- `components/pricing.tsx` - Beta pricing
- `components/faq-section.tsx` - Accordion
- `components/final-cta.tsx` - CTA section
- `components/scroll-birds.tsx` - Flying origami
- `components/edge-decorations.tsx` - Margin origami

## DO NOT
- Use centered hero with gradient word (batido/overdone)
- Use uniform rounded card grids
- Leave edges empty
- Use generic stock illustrations
- Mention features not built (billing, marketing automation, member portal)
- Use "Relatórios em tempo real" (use "Histórico completo" instead - reports UI pending)

## DO
- Show actual product mockups
- Use asymmetric layouts
- Fill the viewport creatively
- Add subtle animations that reward inspection
- Make it feel like months of work
- Keep all text in Brazilian Portuguese

## DEPENDENCIES TO ADD (if needed)
- framer-motion (for animations)
- @react-spring/web (alternative animation)
- lucide-react (icons - already installed)

## FINAL CHECK
Before finishing, verify:
1. All text is in Portuguese
2. No rounded buttons
3. Scroll birds work
4. Edge decorations visible
5. Cards have origami animations
6. Hero is split layout (not centered)
7. Section indicator works in nav
8. At least 10 distinct sections
9. Visual heavy, text light
10. Looks like a 100-person team made it
