"use client"

import {
  ArrowRight,
  Check,
  ClipboardCheck,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"

const BETA_CONVERSION_URL = "https://my.cadencio.app/beta/betatesters-2026#funcionalidades"

const BETA_REASSURANCES = [
  {
    title: "Acesso completo",
    description: "Use presença, turmas, alunos e histórico no fluxo real do seu estúdio.",
    icon: ClipboardCheck,
  },
  {
    title: "Configuração guiada",
    description: "Comece com ajuda para tirar a primeira turma do caderno sem travar.",
    icon: Users,
  },
  {
    title: "14 dias grátis",
    description: "Valide o Cadencio com tempo para testar a rotina antes da primeira cobrança.",
    icon: ShieldCheck,
  },
  {
    title: "Feedback direto",
    description: "Quem entra no beta ajuda a priorizar o que entra nas próximas versões.",
    icon: MessageSquare,
  },
]

const QUICK_POINTS = [
  "14 dias grátis",
  "Acompanhamento inicial",
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
              Testadores Beta 2026
            </span>
          </div>

          <h2 className="mx-auto mb-4 max-w-4xl text-4xl font-bold tracking-tight text-brand-50 md:text-6xl">
            Entre no Beta 2026 antes de escolher um plano
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-brand-50/70">
            Antes de abrir os planos para todo mundo, estamos chamando estúdios para testar o Cadencio com
            acompanhamento e validar a rotina real de presença, turmas e alunos.
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
                    Vagas limitadas para o beta
                  </span>
                </div>

                <h3 className="max-w-2xl text-3xl font-extrabold tracking-tight text-brand-50 md:text-5xl">
                  Teste no seu estúdio, com suporte na primeira configuração.
                </h3>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-50/70 md:text-lg">
                  O próximo passo não é comparar plano. É colocar uma turma real no Cadencio, registrar presença e ver se
                  a rotina fica mais leve antes de pagar qualquer coisa.
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
                  href={BETA_CONVERSION_URL}
                  className="btn-primary text-base"
                >
                  Entrar no Beta 2026
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
              {BETA_REASSURANCES.map((item) => {
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
              Você não precisa escolher Starter, Pro ou Business agora. Primeiro, entre no beta e valide com sua rotina
              real durante o período gratuito.
            </span>
            <ArrowRight
              size={18}
              className="ml-4 shrink-0 text-accent-mint"
              aria-hidden="true"
            />
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-brand-50/35">
          O preço final vem depois da validação. O convite agora é participar do beta.
        </p>
      </div>
    </section>
  )
}
