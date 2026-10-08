import {
  ArrowRight,
  Check,
  ClipboardCheck,
  MessageSquare,
  Sparkles,
  Users,
} from "lucide-react"

import { PRO_PLAN, TRIAL_CTA } from "@/lib/site"

const PLAN_BENEFITS = [
  {
    title: "Presença e turmas",
    description: "Use presença, turmas, alunos e histórico no fluxo real do seu estúdio.",
    icon: ClipboardCheck,
  },
  {
    title: `Até ${PRO_PLAN.studentLimit} alunos`,
    description: "Organize os cadastros e importe sua planilha de Excel para começar.",
    icon: Users,
  },
  {
    title: "Financeiro e relatórios",
    description: "Acompanhe mensalidades, pagamentos e relatórios com exportação em CSV.",
    icon: Check,
  },
  {
    title: "Suporte prioritário",
    description: "Conte com nossa equipe para tirar dúvidas na rotina do seu estúdio.",
    icon: MessageSquare,
  },
]

const QUICK_POINTS = [
  "14 dias grátis",
  "Um único plano mensal",
  "Funciona no navegador",
  "Ideal para sair do caderno",
]

export function Pricing() {
  return (
    <section
      id="precos"
      data-section-name="Preços"
      className="py-32 lg:py-48 bg-surface-dark relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-600/10 via-surface-dark to-surface-dark opacity-50" />

      {/* Origami corner accent */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] text-brand-400 opacity-10">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <polygon points="100,0 100,100 0,0" />
          <polygon points="100,20 80,100 20,20" opacity="0.3" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-brand-500/20 bg-brand-500/10 px-3 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent-mint" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-accent-mint">
              Plano {PRO_PLAN.name}
            </span>
          </div>

          <h2 className="mx-auto mb-4 max-w-4xl text-4xl font-bold tracking-tight text-brand-50 md:text-6xl">
            Um único plano para organizar seu estúdio.
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-brand-50/70">
            Presença, turmas, alunos, financeiro e relatórios em um só lugar. Comece com 14 dias grátis
            e continue no Pro por {PRO_PLAN.priceLabel}.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-sm border border-brand-400/30 bg-white/[0.06] shadow-[0_0_90px_rgba(36,174,181,0.18)]">
          <div className="absolute right-0 top-0 h-40 w-40 border-l-[160px] border-t-[160px] border-l-transparent border-t-accent-mint/25" />
          <div className="absolute bottom-8 left-8 h-24 w-24 rotate-45 bg-accent-violet/10" />

          <div className="relative z-10 grid gap-10 p-6 md:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
            <div className="flex min-h-[520px] flex-col justify-between">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-accent-gold/25 bg-accent-gold/10 px-3 py-1.5">
                  <Sparkles size={14} className="text-accent-gold" aria-hidden="true" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-accent-gold">
                    14 dias grátis para começar
                  </span>
                </div>

                <h3 className="text-xl font-bold text-brand-50">Plano {PRO_PLAN.name}</h3>
                <p className="mt-4 flex items-baseline gap-2 text-brand-50">
                  <span className="text-xl font-semibold">R$</span>
                  <span className="text-7xl font-extrabold tracking-tight md:text-8xl">{PRO_PLAN.monthlyPrice}</span>
                  <span className="text-lg text-brand-50/70">/mês</span>
                </p>
                <h3 className="mt-6 max-w-xl text-2xl font-bold tracking-tight text-brand-50 md:text-3xl">
                  Teste com a rotina real do seu estúdio.
                </h3>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-50/70 md:text-lg">
                  Cadastre seus alunos, organize as turmas e registre presença durante o teste.
                  A primeira cobrança acontece após os 14 dias grátis.
                </p>

                <ul className="mt-8 grid gap-3 text-sm text-brand-50/75 sm:grid-cols-2">
                  {QUICK_POINTS.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-brand-400/30 bg-brand-600/40">
                        <Check size={12} className="text-accent-mint" aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href={TRIAL_CTA.href}
                  className="btn-primary text-base"
                >
                  {TRIAL_CTA.label}
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a
                  href="/guias"
                  className="btn-paper-cut border-brand-400/40 bg-white/95 text-gray-900"
                >
                  Ver funcionalidades
                </a>
              </div>
            </div>

            <div className="grid content-stretch gap-4 sm:grid-cols-2">
              {PLAN_BENEFITS.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.title}
                    className="relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-sm border border-white/10 bg-white/[0.05] p-5"
                  >
                    <div className="absolute right-0 top-0 h-14 w-14 border-l-[56px] border-t-[56px] border-l-transparent border-t-brand-500/15" />
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-brand-400/20 bg-brand-600/30 text-accent-mint">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-brand-50">{item.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-brand-50/60">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div
            className="relative flex items-center justify-between border-t border-white/10 px-6 py-5 text-left md:px-10"
          >
            <span className="text-sm font-semibold text-brand-50/65">
              {TRIAL_CTA.helper}
            </span>
            <ArrowRight
              size={18}
              className="ml-4 shrink-0 text-accent-mint"
              aria-hidden="true"
            />
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-brand-50/35">
          Cobrança mensal. Sem compromisso de permanência.
        </p>
      </div>
    </section>
  )
}
