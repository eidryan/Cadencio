import { FileText, Table, HelpCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"

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
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
          Reconhece alguma dessas situações?
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {problems.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <item.icon
                className="size-8 text-primary"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className="mt-4 text-base font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
