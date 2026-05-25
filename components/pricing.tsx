"use client"

import { useState } from "react"
import { Check } from "lucide-react"

const APP_URL = "https://my.cadencio.app"

const PLANS = [
  {
    key: "starter",
    name: "Starter",
    monthly: 79,
    annual: 63,
    annualTotal: 758,
    description: "Para estúdios que estão começando e querem sair das planilhas.",
    features: [
      "Controle de presença",
      "Gestão de turmas e horários",
      "Cadastro de alunas (até 100)",
      "Relatórios de presença",
      "App mobile responsivo",
      "Suporte por email",
    ],
    cta: "Começar grátis",
    highlight: false,
  },
  {
    key: "pro",
    name: "Pro",
    monthly: 149,
    annual: 119,
    annualTotal: 1430,
    description: "Para quem quer controle completo — do financeiro ao relatório.",
    features: [
      "Tudo do Starter",
      "Alunas ilimitadas",
      "Controle financeiro completo",
      "Importação via planilha Excel",
      "Relatórios avançados e CSV",
      "Múltiplos professores",
      "Suporte prioritário",
    ],
    cta: "Começar grátis",
    highlight: true,
    badge: "Mais popular",
  },
  {
    key: "business",
    name: "Business",
    monthly: 299,
    annual: 239,
    annualTotal: 2870,
    description: "Para estúdios que crescem e precisam de tudo sob controle.",
    features: [
      "Tudo do Pro",
      "Gestão de aulas avulsas (drop-in)",
      "Analytics avançado",
      "API de integração",
      "Onboarding personalizado",
      "Suporte via WhatsApp",
      "SLA de atendimento garantido",
    ],
    cta: "Começar grátis",
    highlight: false,
  },
]

export function Pricing() {
  const [annual, setAnnual] = useState(false)

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
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent-mint" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-accent-mint">
              14 dias grátis em todos os planos
            </span>
          </div>

          <h2 className="mb-4 text-4xl font-bold tracking-tight text-brand-50 md:text-5xl">
            Preços simples e honestos
          </h2>
          <p className="mx-auto max-w-xl text-lg text-brand-50/70">
            Sem surpresas na fatura. Cancele quando quiser.
          </p>

          {/* Billing toggle */}
          <div className="mt-10 inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/5 p-1.5">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                !annual
                  ? "bg-brand-500 text-white shadow-sm"
                  : "text-brand-50/60 hover:text-brand-50"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                annual
                  ? "bg-brand-500 text-white shadow-sm"
                  : "text-brand-50/60 hover:text-brand-50"
              }`}
            >
              Anual
              <span className="rounded-full bg-accent-mint/20 px-2 py-0.5 text-[10px] font-bold text-accent-mint">
                2 meses grátis
              </span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              className={`relative flex flex-col rounded-sm border p-8 transition-all duration-300 ${
                plan.highlight
                  ? "border-brand-500/40 bg-white/[0.07] shadow-[0_0_60px_rgba(36,174,181,0.15)]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full border border-brand-400/30 bg-brand-500 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-md">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-brand-50">{plan.name}</h3>
                <p className="mt-1 text-sm text-brand-50/50">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold tracking-tight text-brand-50">
                    R${annual ? plan.annual : plan.monthly}
                  </span>
                  <span className="text-brand-50/40">/mês</span>
                </div>
                {annual && (
                  <p className="mt-1.5 text-xs text-brand-50/40">
                    Cobrado anualmente como{" "}
                    <span className="text-brand-50/60">
                      R${plan.annualTotal.toLocaleString("pt-BR")}
                    </span>
                  </p>
                )}
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-brand-500/30 bg-brand-600/30">
                      <Check size={11} className="text-accent-mint" />
                    </div>
                    <span className="text-sm text-brand-50/75">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`${APP_URL}/register?plan=${plan.key}&interval=${annual ? "year" : "month"}`}
                className={`w-full rounded-sm py-3 text-center text-sm font-bold transition-all ${
                  plan.highlight
                    ? "bg-brand-500 text-white hover:bg-brand-400 shadow-sm"
                    : "border border-brand-500/30 text-brand-300 hover:border-brand-400/50 hover:bg-brand-500/10"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-12 text-center text-sm text-brand-50/30">
          Cartão de crédito necessário apenas após o período de teste. Cancele a qualquer momento, sem multa.
        </p>
      </div>
    </section>
  )
}
