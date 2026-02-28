# Cadencio Feature-to-Content Mapping

## Purpose
This document maps actual product features (`Ln-Carvalho/saas`) to landing page claims (`eidryan/Cadencio`) to ensure we only advertise what's actually built.

---

## Part 1: Current Landing Page Audit

### 1.1 Hero Section
| Claim | Actual Status | Notes |
|-------|--------------|-------|
| "Seu estúdio organizado, sem papel, sem planilha" | ✅ Accurate | Core value prop |
| "Controle de presença, turmas e alunos num só lugar" | ✅ Accurate | All built |
| Schedule mockup with weekly grid | ✅ Accurate | Sessions + ClassSchedule exist |

### 1.2 Problem Section
| Pain Point | Solution Exists? | Notes |
|------------|-----------------|-------|
| "Presença no papel" | ✅ Yes | Attendance model |
| "Planilha que só você entende" | ✅ Yes | Multi-user with roles |
| "Sem dados para decidir" | ⚠️ Partial | Reports API exists, UI pending |

### 1.3 Features Section
| Feature Claimed | Backend Status | Frontend Status |
|-----------------|---------------|-----------------|
| "Presença em 1 clique" | ✅ Built | ✅ Built |
| "Relatórios em tempo real" | ⚠️ API exists | ❌ UI pending |
| "Gestão de turmas e alunos" | ✅ Built | ✅ Built |
| "Pronto em 15 minutos" | ✅ Onboarding exists | ✅ Works |

### 1.4 How It Works
| Step | Accurate? |
|------|-----------|
| "Fale com a gente pelo WhatsApp" | ✅ Current beta flow |
| "Configuramos seu estúdio juntos" | ✅ Current beta flow |
| "Comece a registrar presença" | ✅ Works |

### 1.5 Social Proof
| Element | Status |
|---------|--------|
| "Usado por estúdios no Rio de Janeiro" | ⚠️ Needs real testimonials |
| Quote from "Claudia, Gestora — Vertico Kiness" | ⚠️ Needs verification |

---

## Part 2: Actual Product Capabilities

### 2.1 Data Model (from Prisma schema)

```
TENANT (multi-tenant)
├── plan: TRIAL | BASIC | PRO | PREMIUM
├── trialEndsAt
└── active

USER
├── role: OWNER | ADMIN | SECRETARY
├── email, passwordHash
└── belongs to Tenant

STUDENT
├── name, email, phone, birthDate
├── leadChannel: INDICACAO | TRAFEGO_PAGO | INSTAGRAM | SITE | OUTRO
├── active
└── notes

CLASS_GROUP (turma)
├── name, modality, capacity
└── schedules (weekday + times)

CLASS_SCHEDULE
├── weekday (0-6)
├── startTime, endTime
└── belongs to ClassGroup

SESSION (aula individual)
├── date, startTime, endTime
├── status: SCHEDULED | CANCELED
└── attendance records

ATTENDANCE
├── status: PRESENT | ABSENT
├── isTrial
└── links Student to Session

ENROLLMENT
├── status: ACTIVE | ENDED
├── weekdays
└── links Student to ClassGroup

DAY_OFF
├── date, name, enabled
└── holidays/closures

INVITATION
├── email, role, token, expiresAt
└── team invites
```

### 2.2 Feature Matrix

| Feature | Backend | Frontend | API | Advertise? |
|---------|---------|----------|-----|------------|
| Multi-tenant | ✅ | ✅ | ✅ | No (invisible) |
| User roles (Owner/Admin/Secretary) | ✅ | ✅ | ✅ | Yes |
| Email auth + password reset | ✅ | ✅ | ✅ | No (expected) |
| Team invitations | ✅ | ✅ | ✅ | Yes |
| Student CRUD | ✅ | ✅ | ✅ | Yes |
| Student bulk import (Excel) | ✅ | ✅ | ✅ | Yes |
| Class groups (turmas) | ✅ | ✅ | ✅ | Yes |
| Class schedules | ✅ | ✅ | ✅ | Yes |
| Sessions (generated from schedules) | ✅ | ✅ | ✅ | Yes |
| Enrollments | ✅ | ✅ | ✅ | Yes |
| Attendance tracking | ✅ | ✅ | ✅ | **Primary** |
| Trial attendance flag | ✅ | ✅ | ✅ | Yes |
| Day offs (holidays) | ✅ | ✅ | ✅ | Yes |
| Lead channel tracking | ✅ | ✅ | ✅ | Yes |
| Reports - attendance | ✅ | ❌ | ✅ | **Partial** |
| Reports - classes | ✅ | ❌ | ✅ | **Partial** |
| Billing/payments | ❌ | ❌ | ❌ | No |
| Marketing automation | ❌ | ❌ | ❌ | No |
| Website builder | ❌ | ❌ | ❌ | No |
| Member portal | ❌ | ❌ | ❌ | No |

---

## Part 3: Content Recommendations

### 3.1 Keep As-Is (Accurate)

**Hero headline:** "Seu estúdio organizado, sem papel, sem planilha."
- Clear, emotional, accurate

**Hero subtext:** "Controle de presença, turmas e alunos num só lugar"
- Directly maps to features

**Feature 1:** "Presença em 1 clique"
- Core functionality, fully built

**Feature 3:** "Gestão de turmas e alunos"
- Fully built

**Feature 4:** "Pronto em 15 minutos"
- Onboarding works

### 3.2 Modify (Partially True)

**Feature 2:** "Relatórios em tempo real"
- **Issue:** Reports UI not built yet
- **Options:**
  1. Remove until UI exists
  2. Change to: "Histórico completo de presença" (accurate - data is tracked)
  3. Change to: "Visibilidade de frequência" (vaguer but true)
- **Recommendation:** Option 2 - focus on data tracking, not reports

### 3.3 Add (Missing from current page)

| Feature to Add | Why |
|----------------|-----|
| **Import Excel** | Differentiator - easy migration |
| **Equipe colaborativa** | Multi-user with roles is valuable |
| **Aulas experimentais** | isTrial flag - tracks trial students |
| **Feriados configuráveis** | DayOffs - useful feature |
| **Múltiplas modalidades** | ClassGroup.modality - dance, pilates, yoga, etc. |

### 3.4 Remove (Not Built)

Do NOT mention:
- Billing/payments
- Email marketing
- Automated reminders
- Website builder
- Member app/portal
- Check-in kiosk
- Integrations

---

## Part 4: Revised Feature List

### Primary Features (Hero/Main)

1. **Presença em 1 clique**
   - Icon: CheckCircle
   - Text: "Registre a frequência de qualquer turma em segundos, pelo celular ou computador."
   - Status: ✅ Keep

2. **Histórico completo** (changed from "Relatórios em tempo real")
   - Icon: History or Database
   - Text: "Toda presença registrada fica salva. Nunca mais perca dados no fim do mês."
   - Status: ✅ Accurate

3. **Gestão de turmas e alunos**
   - Icon: Users
   - Text: "Cadastros, matrículas, horários e grades num só lugar."
   - Status: ✅ Keep

4. **Pronto em 15 minutos**
   - Icon: Zap
   - Text: "Do cadastro ao primeiro registro de presença, sem precisar de ajuda."
   - Status: ✅ Keep

### Secondary Features (Bento/Grid)

5. **Importe sua planilha**
   - Icon: Upload or FileSpreadsheet
   - Text: "Traga seus alunos e matrículas de uma vez. Aceita Excel."
   - Status: ✅ Built

6. **Equipe colaborativa**
   - Icon: UserPlus
   - Text: "Convide secretárias e professores. Cada um com seu acesso."
   - Status: ✅ Built

7. **Aulas experimentais**
   - Icon: Star or Sparkles
   - Text: "Marque quem veio fazer aula de teste. Acompanhe a conversão."
   - Status: ✅ Built

8. **Feriados e folgas**
   - Icon: Calendar or CalendarOff
   - Text: "Configure dias sem aula. O sistema ajusta automaticamente."
   - Status: ✅ Built

---

## Part 5: Page Structure for Redesign

### 5.1 Recommended Sections

```
1. NAVBAR
   - Logo (origami)
   - Links: Funcionalidades | Preço | Contato
   - CTA: [Entrar] [Começar grátis]

2. HERO
   - Headline: "Seu estúdio organizado, sem papel, sem planilha."
   - Subheadline: "Controle de presença, turmas e alunos num só lugar — feito para quem administra estúdio, não para quem entende de tecnologia."
   - CTAs: [Começar grátis] [Ver como funciona]
   - Visual: Dashboard mockup with animations
   - Background: Subtle animated gradient + origami birds

3. SOCIAL PROOF BAR
   - "Confiado por estúdios de dança, pilates e artes marciais"
   - Logo carousel (if available) or icons

4. PROBLEM SECTION
   - "Reconhece alguma dessas situações?"
   - 3 cards: Papel, Planilha, Sem dados
   - Each with icon + title + description

5. FEATURES (Primary - 2x2 Bento)
   - Presença em 1 clique
   - Histórico completo
   - Gestão de turmas e alunos
   - Pronto em 15 minutos
   - Each card: icon, title, description, subtle hover animation

6. FEATURES (Secondary - 4-column or slider)
   - Importe sua planilha
   - Equipe colaborativa
   - Aulas experimentais
   - Feriados e folgas

7. HOW IT WORKS
   - Timeline with 3 steps
   - 1. Crie sua conta
   - 2. Configure suas turmas
   - 3. Comece a registrar
   - Note: "Sem instalação. Funciona no navegador."

8. TESTIMONIALS
   - Quote carousel or cards
   - Real testimonials from beta users
   - Photo + name + studio

9. PRICING (Optional for beta)
   - Simple: "Gratuito durante o beta"
   - Or: Show future tiers (Trial → Basic → Pro)
   - Emphasize: "Sem cartão de crédito"

10. FINAL CTA
    - "Pronto para simplificar seu estúdio?"
    - Large CTA button
    - Trust indicators

11. FOOTER
    - Links, contact, social
    - Legal
```

### 5.2 Content Tone

- **Voice:** Friendly, direct, non-technical
- **Language:** Portuguese (Brazil)
- **Target:** Studio owners/managers who are NOT tech-savvy
- **Avoid:** Jargon, complex features, enterprise language
- **Emphasize:** Simplicity, speed, reliability

---

## Part 6: Visual Treatment Notes

### 6.1 Hero Mockup

Instead of the current simple schedule grid, consider:
- Dashboard mockup showing:
  - Weekly calendar view
  - Attendance checkmarks
  - Student count per class
- Floating elements with parallax
- Origami bird accent flying across

### 6.2 Feature Cards

- Light background cards with subtle border
- Hover: lift + glow effect
- Icon in brand color (teal)
- Consider adding mini-illustrations or screenshots

### 6.3 Problem Section

- Consider using a "before/after" visual
- Or: crossed-out icons (paper → digital)
- Emotional connection important here

### 6.4 How It Works

- Animated timeline that draws on scroll
- Numbers with counter animation
- Clean, minimal, confidence-building

---

## Summary

### What to Keep
- Hero headline and subheadline
- "Presença em 1 clique"
- "Gestão de turmas e alunos"
- "Pronto em 15 minutos"
- Problem section pain points

### What to Change
- "Relatórios em tempo real" → "Histórico completo"
- How It Works steps (more self-service, less WhatsApp)

### What to Add
- Import Excel feature
- Team collaboration feature
- Trial class tracking
- Holiday configuration
- Animated hero background
- More visual polish overall

### What to NOT Add
- Billing features (not built)
- Marketing features (not built)
- Member portal (not built)
- Any GymDesk features we excluded

---

## Next Steps

1. **Phase 5:** Synthesize design guides into unified system
2. **Phase 6:** Implement via coding agent with all context

This document should be included as context for the coding agent to ensure content accuracy.
