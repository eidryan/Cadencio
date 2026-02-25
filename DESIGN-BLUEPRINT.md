# Cadencio Design System v2.0

> A comprehensive design system for building the Cadencio landing page and platform.
> NOT a landing page - this is the blueprint for building one.

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Design Tokens](#2-design-tokens)
3. [Typography System](#3-typography-system)
4. [Layout Patterns](#4-layout-patterns)
5. [Component Library](#5-component-library)
6. [Animation System](#6-animation-system)
7. [Scroll Interactions](#7-scroll-interactions)
8. [Origami Brand Elements](#8-origami-brand-elements)
9. [Section Templates](#9-section-templates)
10. [Implementation Notes](#10-implementation-notes)

---

## 1. Design Philosophy

### 1.1 Core Principles

**"Invisible Craft"**
- Looks effortless but rewards close inspection
- Animations are subtle until you notice them
- Every detail has intention

**"Edge to Edge"**
- Use the full viewport - not just centered content
- Decorative elements on margins/edges
- Asymmetric layouts break monotony

**"Not Another SaaS Template"**
- Avoid: centered hero with gradient word, rounded card grids
- Embrace: asymmetry, unique shapes, scroll-driven storytelling
- Origami identity should be unmistakable

**"Progressive Revelation"**
- More interesting as you scroll
- New visual elements appear on edges
- Reward the curious viewer

### 1.2 What to Avoid

| Avoid | Instead |
|-------|---------|
| Centered hero + highlighted word | Left-aligned hero + visual on right |
| Grid of identical rounded cards | Mixed layouts, varied card shapes |
| Generic icons in circles | Custom origami-themed illustrations |
| Static sections | Scroll-triggered animations, parallax |
| Empty edges/margins | Floating elements, decorative origami |

### 1.3 Inspiration Sources

| Source | What to Take |
|--------|--------------|
| Datavant | Data visualization, flowing lines, light backgrounds |
| Guesty | Left-aligned hero, stats section, dark/light contrast |
| 21st.dev | Glowing effects, creative cards, Aceternity-style components |
| Linear | Subtle animations, dark accents, polish |
| Stripe | Gradient mesh, depth, premium feel |

---

## 2. Design Tokens

### 2.1 Colors

```css
:root {
  /* ══════════════════════════════════════════
     BRAND COLORS (Teal)
     ══════════════════════════════════════════ */
  --brand-50: #EFFCFC;
  --brand-100: #D7F6F7;
  --brand-200: #B4EEEF;
  --brand-300: #80E1E4;
  --brand-400: #45CCD1;
  --brand-500: #24AEB5;
  --brand-600: #0D7377;  /* Primary */
  --brand-700: #0F6266;
  --brand-800: #134F52;
  --brand-900: #144245;
  --brand-950: #062A2D;

  /* ══════════════════════════════════════════
     ACCENT COLORS
     ══════════════════════════════════════════ */
  --accent-coral: #FF6B6B;
  --accent-gold: #FFD93D;
  --accent-violet: #8B5CF6;
  --accent-sky: #38BDF8;
  --accent-mint: #6EE7B7;

  /* ══════════════════════════════════════════
     NEUTRAL COLORS (Warm Gray)
     ══════════════════════════════════════════ */
  --gray-25: #FCFCFC;
  --gray-50: #FAFAF9;
  --gray-100: #F5F5F4;
  --gray-200: #E7E5E4;
  --gray-300: #D6D3D1;
  --gray-400: #A8A29E;
  --gray-500: #78716C;
  --gray-600: #57534E;
  --gray-700: #44403C;
  --gray-800: #292524;
  --gray-900: #1C1917;
  --gray-950: #0C0A09;

  /* ══════════════════════════════════════════
     SEMANTIC COLORS
     ══════════════════════════════════════════ */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;

  /* ══════════════════════════════════════════
     SURFACE COLORS
     ══════════════════════════════════════════ */
  --surface-primary: #FFFFFF;
  --surface-secondary: #FAFAF9;
  --surface-elevated: #FFFFFF;
  --surface-dark: #0C0A09;
  --surface-dark-elevated: #1C1917;
}
```

### 2.2 Gradients

```css
:root {
  /* Hero background - subtle aurora */
  --gradient-aurora: 
    radial-gradient(ellipse 100% 80% at 0% 0%, rgba(13, 115, 119, 0.12), transparent 50%),
    radial-gradient(ellipse 80% 60% at 100% 20%, rgba(139, 92, 246, 0.08), transparent 50%),
    radial-gradient(ellipse 60% 40% at 50% 100%, rgba(16, 185, 129, 0.06), transparent 50%);

  /* Glow effects */
  --gradient-glow-brand: radial-gradient(circle, rgba(13, 115, 119, 0.4) 0%, transparent 70%);
  --gradient-glow-violet: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);

  /* Card hover glow (mouse-following) */
  --gradient-card-glow: radial-gradient(
    800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(13, 115, 119, 0.06),
    transparent 40%
  );

  /* Text gradients */
  --gradient-text-brand: linear-gradient(135deg, var(--brand-500), var(--accent-violet));
  --gradient-text-warm: linear-gradient(135deg, var(--accent-coral), var(--accent-gold));

  /* Border gradients */
  --gradient-border: linear-gradient(135deg, var(--brand-400), var(--accent-violet), var(--accent-mint));

  /* Mesh for animated backgrounds */
  --gradient-mesh: 
    radial-gradient(at 0% 0%, var(--brand-200) 0px, transparent 50%),
    radial-gradient(at 100% 0%, var(--accent-violet) 0px, transparent 50%),
    radial-gradient(at 100% 100%, var(--accent-coral) 0px, transparent 50%),
    radial-gradient(at 0% 100%, var(--accent-mint) 0px, transparent 50%);
}
```

### 2.3 Shadows

```css
:root {
  /* Elevation shadows */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.15);

  /* Glowing shadows */
  --shadow-glow-brand: 0 0 60px rgba(13, 115, 119, 0.2);
  --shadow-glow-brand-intense: 0 0 100px rgba(13, 115, 119, 0.35);
  --shadow-glow-violet: 0 0 60px rgba(139, 92, 246, 0.2);

  /* Card shadows (layered for depth) */
  --shadow-card: 
    0 0 0 1px rgba(0, 0, 0, 0.03),
    0 2px 4px rgba(0, 0, 0, 0.02),
    0 8px 16px rgba(0, 0, 0, 0.04),
    0 24px 48px rgba(0, 0, 0, 0.04);

  --shadow-card-hover: 
    0 0 0 1px rgba(13, 115, 119, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.03),
    0 16px 32px rgba(0, 0, 0, 0.06),
    0 32px 64px rgba(0, 0, 0, 0.06);
}
```

### 2.4 Spacing

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
  --space-40: 10rem;    /* 160px */
}
```

### 2.5 Border Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.375rem;  /* 6px */
  --radius-lg: 0.5rem;    /* 8px */
  --radius-xl: 0.75rem;   /* 12px */
  --radius-2xl: 1rem;     /* 16px */
  --radius-3xl: 1.5rem;   /* 24px */
  --radius-full: 9999px;

  /* Creative shapes - NOT just rounded rectangles */
  --radius-blob: 60% 40% 30% 70% / 60% 30% 70% 40%;
  --radius-organic: 30% 70% 70% 30% / 30% 30% 70% 70%;
  --radius-paper: 2px 20px 2px 20px; /* Origami fold feel */
}
```

### 2.6 Transitions

```css
:root {
  /* Easing curves */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* Durations */
  --duration-instant: 50ms;
  --duration-fast: 100ms;
  --duration-base: 150ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
  --duration-slowest: 800ms;

  /* Combined */
  --transition-fast: var(--duration-fast) var(--ease-out-quart);
  --transition-base: var(--duration-base) var(--ease-out-quart);
  --transition-slow: var(--duration-slow) var(--ease-out-expo);
  --transition-spring: var(--duration-slow) var(--ease-spring);
}
```

---

## 3. Typography System

### 3.1 Font Stack

```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-display: 'Cal Sans', 'Inter', sans-serif; /* For headlines - optional */
  --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
}
```

### 3.2 Type Scale

| Name | Size | Weight | Line Height | Letter Spacing | Usage |
|------|------|--------|-------------|----------------|-------|
| `display-xl` | 72px | 700 | 1.0 | -0.04em | Hero headline (NOT centered) |
| `display-lg` | 60px | 700 | 1.05 | -0.03em | Section headlines |
| `display-md` | 48px | 700 | 1.1 | -0.02em | Sub-headlines |
| `heading-xl` | 36px | 600 | 1.2 | -0.02em | Card titles |
| `heading-lg` | 30px | 600 | 1.25 | -0.01em | Feature titles |
| `heading-md` | 24px | 600 | 1.3 | 0 | Subsections |
| `heading-sm` | 20px | 600 | 1.35 | 0 | Small headings |
| `body-xl` | 20px | 400 | 1.6 | 0 | Hero subtitle |
| `body-lg` | 18px | 400 | 1.6 | 0 | Lead paragraphs |
| `body-md` | 16px | 400 | 1.6 | 0 | Body text |
| `body-sm` | 14px | 400 | 1.5 | 0 | Secondary text |
| `caption` | 12px | 500 | 1.4 | 0.02em | Labels, captions |
| `overline` | 11px | 600 | 1.4 | 0.1em | Badges (uppercase) |

### 3.3 Typography Treatments

**Standard Headline (NOT centered, NOT gradient word)**
```html
<h1 class="display-xl">
  Seu estúdio <br/>
  <span class="text-muted">finalmente</span> organizado.
</h1>
```

**Creative Treatment Options:**
1. **Strikethrough transition** - Word appears struck through, then animates to normal
2. **Typewriter reveal** - Text types out character by character
3. **Word swap** - Rotates through different words (planilha → papel → caos → organizado)
4. **Split layout** - Half the headline on left, half on right with image between

---

## 4. Layout Patterns

### 4.1 Layout Philosophy

**NOT THIS:**
```
┌────────────────────────────────────┐
│           CENTERED HERO            │
│         Big Centered Text          │
│           [Button]                 │
│                                    │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐  │
│  │Card│  │Card│  │Card│  │Card│  │
│  └────┘  └────┘  └────┘  └────┘  │
│                                    │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐  │
│  │Card│  │Card│  │Card│  │Card│  │
│  └────┘  └────┘  └────┘  └────┘  │
└────────────────────────────────────┘
```

**DO THIS:**
```
┌────────────────────────────────────┐
│ ╭─────╮                            │
│ │Bird │   ← Decorative origami    │
│ ╰─────╯                            │
│   HERO TEXT              ┌───────┐ │
│   Left-aligned           │ UI    │ │
│   Multi-line             │Mockup │ │
│   [Button]               └───────┘ │
│                          ╭─────╮   │
│                          │Bird │   │
│                          ╰─────╯   │
├────────────────────────────────────┤
│                                    │
│   ╱────────────────────────────╲   │
│  ╱  FLOWING SECTION             ╲  │
│ ╱   With organic shapes          ╲ │
│ ╲   Not rectangles              ╱  │
│  ╲                             ╱   │
│   ╲___________________________╱    │
│                                    │
├────────────────────────────────────┤
│ ASYMMETRIC GRID                    │
│ ┌──────────────┐  ┌────────┐      │
│ │              │  │        │      │
│ │   Large      │  │ Small  │      │
│ │              │  └────────┘      │
│ │              │  ┌────────┐      │
│ │              │  │ Small  │      │
│ └──────────────┘  └────────┘      │
└────────────────────────────────────┘
```

### 4.2 Hero Layout (Split)

```
┌──────────────────────────────────────────────┐
│  ┌─────────────────────┐  ┌───────────────┐  │
│  │                     │  │               │  │
│  │  HEADLINE           │  │  INTERACTIVE  │  │
│  │  Multi-line         │  │  MOCKUP       │  │
│  │                     │  │               │  │
│  │  Subtitle text      │  │  (Parallax    │  │
│  │  goes here          │  │   on scroll)  │  │
│  │                     │  │               │  │
│  │  [CTA]  [Secondary] │  │               │  │
│  │                     │  │               │  │
│  └─────────────────────┘  └───────────────┘  │
│                                              │
│  ┌─ Scroll-triggered origami appears here ─┐ │
│  │     🕊️                          🕊️      │ │
│  └──────────────────────────────────────────┘│
└──────────────────────────────────────────────┘
```

### 4.3 Bento Grid (Asymmetric)

```
┌──────────────────────────────────────┐
│  ┌────────────────────┐  ┌────────┐  │
│  │                    │  │        │  │
│  │    FEATURE 1       │  │ FEAT 2 │  │
│  │    (Large)         │  │        │  │
│  │                    │  ├────────┤  │
│  │                    │  │ FEAT 3 │  │
│  ├────────┬───────────┤  │        │  │
│  │ FEAT 4 │  FEAT 5   │  └────────┘  │
│  │        │           │              │
│  └────────┴───────────┘              │
└──────────────────────────────────────┘
```

### 4.4 Edge Decorations

Origami elements should appear at screen edges:
- Fixed position birds that fly when you scroll
- Decorative shapes at section transitions
- Parallax elements in margins

```css
.edge-decoration {
  position: fixed;
  pointer-events: none;
  z-index: 100;
}

.edge-decoration.left {
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
}

.edge-decoration.right {
  right: 20px;
  top: 40%;
}
```

---

## 5. Component Library

### 5.1 Cards (NOT Generic Rounded Rectangles)

**Option A: Paper Fold Card**
```css
.card-paper {
  position: relative;
  background: var(--surface-primary);
  padding: var(--space-8);
  /* Asymmetric border radius - like folded paper */
  border-radius: 4px 24px 4px 24px;
  box-shadow: var(--shadow-card);
  transition: all var(--transition-slow);
  
  /* Fold corner effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, transparent 50%, var(--gray-100) 50%);
    border-radius: 0 24px 0 0;
  }
}

.card-paper:hover {
  transform: translateY(-4px) rotate(0.5deg);
  box-shadow: var(--shadow-card-hover);
}
```

**Option B: Glowing Border Card**
```css
.card-glow {
  position: relative;
  background: var(--surface-primary);
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  
  /* Gradient border */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: var(--gradient-border);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.3;
    transition: opacity var(--transition-slow);
  }
}

.card-glow:hover::before {
  opacity: 1;
}
```

**Option C: Floating Card with Glow**
```css
.card-floating {
  position: relative;
  background: var(--surface-primary);
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--gray-200);
  
  /* Glow underneath */
  &::after {
    content: '';
    position: absolute;
    inset: 20px;
    background: var(--gradient-glow-brand);
    filter: blur(40px);
    z-index: -1;
    opacity: 0;
    transition: opacity var(--transition-slower);
  }
}

.card-floating:hover::after {
  opacity: 1;
}
```

**Option D: Organic Shape Card**
```css
.card-organic {
  position: relative;
  background: var(--surface-primary);
  padding: var(--space-8);
  border-radius: var(--radius-blob); /* 60% 40% 30% 70% / 60% 30% 70% 40% */
  box-shadow: var(--shadow-lg);
  transition: border-radius var(--transition-slower);
}

.card-organic:hover {
  border-radius: var(--radius-organic); /* Different blob shape */
}
```

### 5.2 Buttons (Beyond Basic)

**Primary Button with Glow**
```css
.btn-primary {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-8);
  background: var(--brand-600);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: var(--radius-xl);
  cursor: pointer;
  overflow: hidden;
  transition: all var(--transition-base);
  
  /* Glow effect */
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: var(--gradient-glow-brand);
    filter: blur(20px);
    opacity: 0;
    z-index: -1;
    transition: opacity var(--transition-slow);
  }
  
  /* Shine effect on hover */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left var(--transition-slower);
  }
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(13, 115, 119, 0.3);
}

.btn-primary:hover::before {
  opacity: 1;
}

.btn-primary:hover::after {
  left: 100%;
}
```

**Ghost Button with Border Animation**
```css
.btn-ghost {
  position: relative;
  padding: var(--space-4) var(--space-8);
  background: transparent;
  color: var(--gray-700);
  font-weight: 600;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-xl);
  cursor: pointer;
  overflow: hidden;
  transition: all var(--transition-base);
}

.btn-ghost::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: var(--gradient-border);
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity var(--transition-slow);
}

.btn-ghost:hover {
  color: var(--brand-600);
  border-color: transparent;
}

.btn-ghost:hover::before {
  opacity: 1;
}
```

### 5.3 Badge/Tag

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  font-size: 13px;
  font-weight: 600;
  color: var(--brand-700);
  background: var(--brand-50);
  border: 1px solid var(--brand-200);
  border-radius: var(--radius-full);
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: var(--brand-500);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.9); }
}
```

### 5.4 Stats Display

```css
.stat {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.stat-value {
  font-size: 56px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  background: var(--gradient-text-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### 5.5 Timeline/Steps (Vertical, NOT Horizontal)

```html
<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-marker">1</div>
    <div class="timeline-connector"></div>
    <div class="timeline-content">
      <h3>Crie sua conta</h3>
      <p>Em menos de 2 minutos</p>
    </div>
  </div>
  <!-- More items -->
</div>
```

```css
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

.timeline-item {
  position: relative;
  display: flex;
  gap: var(--space-6);
  padding-left: var(--space-16);
}

.timeline-marker {
  position: absolute;
  left: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: var(--brand-600);
  background: var(--brand-50);
  border: 2px solid var(--brand-200);
  border-radius: 50%;
  z-index: 1;
}

.timeline-connector {
  position: absolute;
  left: 23px;
  top: 48px;
  width: 2px;
  height: calc(100% + var(--space-12));
  background: linear-gradient(to bottom, var(--brand-200), transparent);
}

.timeline-item:last-child .timeline-connector {
  display: none;
}
```

### 5.6 Input with Floating Label

```css
.input-group {
  position: relative;
}

.input-field {
  width: 100%;
  padding: var(--space-4) var(--space-4);
  padding-top: var(--space-6);
  font-size: 16px;
  background: var(--surface-primary);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-xl);
  transition: all var(--transition-fast);
}

.input-field:focus {
  outline: none;
  border-color: var(--brand-500);
  box-shadow: 0 0 0 3px rgba(13, 115, 119, 0.1);
}

.input-label {
  position: absolute;
  left: var(--space-4);
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: var(--gray-400);
  pointer-events: none;
  transition: all var(--transition-fast);
}

.input-field:focus + .input-label,
.input-field:not(:placeholder-shown) + .input-label {
  top: 12px;
  font-size: 12px;
  color: var(--brand-600);
}
```

---

## 6. Animation System

### 6.1 Entrance Animations

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes revealUp {
  from {
    clip-path: inset(100% 0 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}
```

### 6.2 Continuous Animations

```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes floatRotate {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
}

@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

### 6.3 Stagger Delays

```css
.stagger > *:nth-child(1) { animation-delay: 0s; }
.stagger > *:nth-child(2) { animation-delay: 0.1s; }
.stagger > *:nth-child(3) { animation-delay: 0.2s; }
.stagger > *:nth-child(4) { animation-delay: 0.3s; }
.stagger > *:nth-child(5) { animation-delay: 0.4s; }
.stagger > *:nth-child(6) { animation-delay: 0.5s; }
```

---

## 7. Scroll Interactions

### 7.1 Scroll-Triggered Reveals

```javascript
// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, observerOptions);

document.querySelectorAll('[data-reveal]').forEach(el => {
  revealObserver.observe(el);
});
```

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s var(--ease-out-expo), transform 0.8s var(--ease-out-expo);
}

[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}

[data-reveal="left"] {
  transform: translateX(-40px);
}

[data-reveal="right"] {
  transform: translateX(40px);
}

[data-reveal="scale"] {
  transform: scale(0.9);
}
```

### 7.2 Scroll-Linked Origami

**Origami bird that flies based on scroll position:**

```javascript
// Scroll-linked origami bird
const scrollBird = document.querySelector('.scroll-bird');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
  const scrollProgress = scrollY / (document.body.scrollHeight - window.innerHeight);
  
  // Move bird based on scroll
  const birdX = scrollProgress * (window.innerWidth - 100);
  const birdY = Math.sin(scrollProgress * Math.PI * 4) * 100 + 200;
  const rotation = scrollDirection === 'down' ? 5 : -5;
  
  scrollBird.style.transform = `translate(${birdX}px, ${birdY}px) rotate(${rotation}deg)`;
  
  // Wing flap speed based on scroll velocity
  const velocity = Math.abs(scrollY - lastScrollY);
  scrollBird.style.setProperty('--flap-speed', `${Math.max(0.3, 1 - velocity * 0.01)}s`);
  
  lastScrollY = scrollY;
}, { passive: true });
```

```html
<div class="scroll-bird" aria-hidden="true">
  <svg viewBox="0 0 60 40" width="60" height="40">
    <polygon class="bird-body" points="30,5 55,20 30,35 5,20" fill="currentColor"/>
    <polygon class="bird-wing bird-wing-left" points="5,20 0,10 15,18" fill="currentColor" opacity="0.7"/>
    <polygon class="bird-wing bird-wing-right" points="55,20 60,10 45,18" fill="currentColor" opacity="0.7"/>
  </svg>
</div>
```

```css
.scroll-bird {
  position: fixed;
  top: 0;
  left: 0;
  color: var(--brand-500);
  opacity: 0.4;
  z-index: 50;
  pointer-events: none;
  transition: transform 0.1s linear;
}

.bird-wing {
  transform-origin: center;
  animation: wingFlap var(--flap-speed, 0.5s) ease-in-out infinite;
}

@keyframes wingFlap {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.5); }
}
```

### 7.3 Parallax Elements

```javascript
// Parallax for decorative elements
document.querySelectorAll('[data-parallax]').forEach(el => {
  const speed = parseFloat(el.dataset.parallax) || 0.5;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  }, { passive: true });
});
```

### 7.4 Section Progress Indicator

```javascript
// Progress through sections
const sections = document.querySelectorAll('section[id]');
const progressDots = document.querySelectorAll('.progress-dot');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + window.innerHeight / 2;
  
  sections.forEach((section, i) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    
    if (scrollY >= top && scrollY < bottom) {
      progressDots.forEach(dot => dot.classList.remove('active'));
      progressDots[i]?.classList.add('active');
    }
  });
}, { passive: true });
```

---

## 8. Origami Brand Elements

### 8.1 SVG Components

**Paper Crane (Logo)**
```html
<svg class="origami-crane" viewBox="0 0 100 100" width="100" height="100">
  <!-- Main body -->
  <polygon points="50,10 80,50 50,90 20,50" fill="var(--brand-600)"/>
  <!-- Left wing -->
  <polygon points="20,50 5,30 25,45" fill="var(--brand-500)" opacity="0.8"/>
  <!-- Right wing -->
  <polygon points="80,50 95,30 75,45" fill="var(--brand-700)" opacity="0.8"/>
  <!-- Head detail -->
  <polygon points="50,10 45,0 55,0" fill="var(--brand-400)"/>
  <!-- Tail detail -->
  <polygon points="50,90 45,100 55,100" fill="var(--brand-500)"/>
</svg>
```

**Flying Bird (Decorative)**
```html
<svg class="origami-bird" viewBox="0 0 60 40" width="60" height="40">
  <polygon class="bird-body" points="30,5 55,20 30,35 5,20" fill="currentColor"/>
  <polygon class="bird-wing-left" points="5,20 0,8 18,17" fill="currentColor" opacity="0.7"/>
  <polygon class="bird-wing-right" points="55,20 60,8 42,17" fill="currentColor" opacity="0.7"/>
</svg>
```

**Paper Plane**
```html
<svg class="origami-plane" viewBox="0 0 100 60" width="100" height="60">
  <polygon points="0,30 40,20 100,30 40,40" fill="var(--brand-600)"/>
  <polygon points="40,20 40,40 100,30" fill="var(--brand-500)" opacity="0.8"/>
  <polygon points="40,25 40,35 70,30" fill="var(--brand-700)" opacity="0.6"/>
</svg>
```

### 8.2 Origami Animations

**Wing Flap**
```css
@keyframes wingFlap {
  0%, 100% { transform: scaleY(1) rotate(0deg); }
  50% { transform: scaleY(0.5) rotate(-10deg); }
}

.bird-wing-left {
  transform-origin: right center;
  animation: wingFlap 1s ease-in-out infinite;
}

.bird-wing-right {
  transform-origin: left center;
  animation: wingFlap 1s ease-in-out infinite 0.1s;
}
```

**Float and Rotate**
```css
@keyframes origamiFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
    filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15));
  }
}

.origami-float {
  animation: origamiFloat 4s ease-in-out infinite;
}
```

**Paper Fold Reveal**
```css
@keyframes foldReveal {
  0% {
    transform: perspective(800px) rotateX(-90deg);
    opacity: 0;
  }
  100% {
    transform: perspective(800px) rotateX(0deg);
    opacity: 1;
  }
}

.fold-reveal {
  transform-origin: top center;
  animation: foldReveal 0.8s var(--ease-out-expo) forwards;
}
```

### 8.3 Placement Guidelines

| Element | Position | Behavior |
|---------|----------|----------|
| Logo crane | Navbar, footer | 3D tilt on hover |
| Flying birds | Hero background, section transitions | Fly on scroll |
| Paper planes | Success states, loading | Float animation |
| Decorative folds | Card corners, section edges | Static or subtle |

---

## 9. Section Templates

### 9.1 Hero (Split Layout)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    ╭─────╮                                                  │
│    │ 🕊️ │  ← Floating bird (parallax)                      │
│    ╰─────╯                                                  │
│                                                             │
│   ┌───────────────────────┐    ┌──────────────────────┐    │
│   │                       │    │                      │    │
│   │  Seu estúdio          │    │   ┌──────────────┐   │    │
│   │  finalmente           │    │   │  DASHBOARD   │   │    │
│   │  organizado.          │    │   │  MOCKUP      │   │    │
│   │                       │    │   │              │   │    │
│   │  Subtitle text here   │    │   │  (floating)  │   │    │
│   │  with more details    │    │   └──────────────┘   │    │
│   │                       │    │                      │    │
│   │  [Começar] [Ver demo] │    └──────────────────────┘    │
│   │                       │                                 │
│   └───────────────────────┘         ╭─────╮                │
│                                     │ 🕊️ │                 │
│                                     ╰─────╯                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 9.2 Problem Section (Cards with Flow)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              Reconhece essas situações?                     │
│                                                             │
│   ╭────────────────────────────────────────────────────╮   │
│  ╱                                                      ╲   │
│ │   ┌─────────┐      ┌─────────┐      ┌─────────┐      │  │
│ │   │ PROBLEM │  →   │ PROBLEM │  →   │ PROBLEM │      │  │
│ │   │ CARD 1  │      │ CARD 2  │      │ CARD 3  │      │  │
│ │   └─────────┘      └─────────┘      └─────────┘      │  │
│  ╲                                                      ╱   │
│   ╰────────────────────────────────────────────────────╯   │
│                                                             │
│  ← Connection lines between cards, flowing shape container  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 9.3 Features (Bento Grid)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│     Funcionalidades                                         │
│                                                             │
│   ┌────────────────────────────┐   ┌──────────────────┐    │
│   │                            │   │                  │    │
│   │   FEATURE 1 (Large)        │   │  FEATURE 2       │    │
│   │   With image/illustration  │   │                  │    │
│   │                            │   ├──────────────────┤    │
│   │                            │   │  FEATURE 3       │    │
│   │                            │   │                  │    │
│   ├────────────┬───────────────┤   └──────────────────┘    │
│   │ FEATURE 4  │   FEATURE 5   │                           │
│   │            │               │                           │
│   └────────────┴───────────────┘                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 9.4 Stats Section (Full Width, Dark)

```
┌─────────────────────────────────────────────────────────────┐
│ ████████████████████████████████████████████████████████████│
│ █                                                          █│
│ █     500+           95%             15min                █│
│ █    estúdios     satisfação      pra começar            █│
│ █                                                          █│
│ █  ← Animated counters, gradient numbers                   █│
│ █                                                          █│
│ ████████████████████████████████████████████████████████████│
└─────────────────────────────────────────────────────────────┘
```

### 9.5 Testimonial (Large Quote)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                                             │
│       "O Cadencio organizou o que a gente                  │
│        nunca conseguiu em anos."                            │
│                                                             │
│                           — Claudia, Vertico Kiness        │
│                                                             │
│                                                             │
│   ← Large centered quote, minimal design, author below      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 10. Implementation Notes

### 10.1 Tech Stack Recommendation

- **Framework:** Next.js (already in use)
- **Styling:** Tailwind CSS + CSS custom properties
- **Animations:** Framer Motion for complex interactions
- **3D/WebGL:** Optional - Three.js for hero effects if needed
- **Icons:** Custom SVG origami set, Lucide for UI icons

### 10.2 Performance Considerations

- Use `will-change` sparingly
- Prefer `transform` and `opacity` for animations
- Lazy load below-fold content
- Use Intersection Observer for scroll triggers
- Compress SVGs

### 10.3 Accessibility

- Respect `prefers-reduced-motion`
- Ensure sufficient color contrast
- Decorative elements should be `aria-hidden`
- All interactive elements need focus states
- Test with screen readers

### 10.4 File Structure

```
components/
├── origami/
│   ├── Bird.tsx
│   ├── Crane.tsx
│   ├── Plane.tsx
│   └── ScrollBird.tsx
├── cards/
│   ├── PaperCard.tsx
│   ├── GlowCard.tsx
│   └── FeatureCard.tsx
├── sections/
│   ├── Hero.tsx
│   ├── Problems.tsx
│   ├── Features.tsx
│   ├── Stats.tsx
│   └── Testimonial.tsx
└── ui/
    ├── Button.tsx
    ├── Badge.tsx
    ├── Input.tsx
    └── Timeline.tsx

styles/
├── tokens.css        # Design tokens
├── animations.css    # Keyframes
└── utilities.css     # Helper classes
```

---

## Summary

This design system provides:

1. **Tokens** - Colors, gradients, shadows, spacing, typography
2. **Components** - Creative cards (not generic), buttons with glow, badges, stats
3. **Layouts** - Split hero, bento grids, asymmetric arrangements
4. **Animations** - Entrance, continuous, scroll-triggered
5. **Scroll interactions** - Reveal animations, parallax, scroll-linked origami
6. **Origami elements** - SVG components, animations, placement guidelines
7. **Section templates** - Visual wireframes for each page section

**Key differentiators from generic templates:**
- Origami identity throughout
- Edge decorations and scroll-triggered birds
- Asymmetric layouts
- Creative card shapes (not just rounded rectangles)
- Full-viewport usage
- Scroll-driven storytelling

Ready for implementation.
