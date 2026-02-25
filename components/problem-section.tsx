import { FileText, Table, HelpCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { ScrollAnimate } from "@/components/scroll-animate"

const problems: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: FileText,
    title: "Presença no papel",
    description:
      "Cadernos, folhas soltas, informações que somem no fim do mês.",
  },
  {
    icon: Table,
    title: "Planilha que só você entende",
    description:
      "Sem visibilidade remota, sem histórico confiável, sem backup.",
  },
  {
    icon: HelpCircle,
    title: "Sem dados para decidir",
    description:
      "Quem está faltando? Quais turmas estão cheias? Você não sabe.",
  },
]

export function ProblemSection() {
  return (
    <section
      className="relative overflow-hidden px-4 py-20 md:px-6 md:py-28"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 100%, #0D2A2B 0%, #0A0F1A 60%, #0A0F1A 100%)",
      }}
    >
      {/* Top gradient fade from light */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16"
        style={{ background: "linear-gradient(to bottom, #FAFAF8, transparent)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl">
        <ScrollAnimate className="text-center">
          <p className="eyebrow mb-3">O problema real</p>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-white md:text-3xl">
            Reconhece alguma dessas situações?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/50">
            A maioria dos estúdios ainda opera no improviso — e perde tempo, alunos e receita por isso.
          </p>
        </ScrollAnimate>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {problems.map((item, i) => (
            <ScrollAnimate key={item.title} delay={((i + 1) * 100) as 100 | 200 | 300}>
              <div
                className="card-hover h-full rounded-xl border p-6"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-primary/15">
                  <item.icon
                    className="size-5 text-primary icon-glow"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-base font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {item.description}
                </p>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade to light */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
        style={{ background: "linear-gradient(to top, #FAFAF8, transparent)" }}
        aria-hidden="true"
      />
    </section>
  )
}
