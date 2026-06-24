import { ArrowRight } from "lucide-react"

import { TRIAL_CTA } from "@/lib/site"

export function TrialCtaBand({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`relative overflow-hidden rounded-sm border border-brand-200 bg-brand-50 ${compact ? "p-6" : "p-8 md:p-10"}`}>
      <div className="absolute right-0 top-0 h-16 w-16 border-l-[64px] border-t-[64px] border-l-transparent border-t-brand-200" />
      <div className="relative z-10 max-w-2xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-700">Teste sem compromisso</p>
        <h2 className={`${compact ? "text-2xl" : "text-3xl md:text-4xl"} font-bold tracking-tight text-gray-900`}>
          Organize seu estúdio por 14 dias grátis.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-gray-600">{TRIAL_CTA.helper}</p>
        <a href={TRIAL_CTA.href} className="btn-paper-cut mt-6 inline-flex">
          {TRIAL_CTA.label}
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  )
}
