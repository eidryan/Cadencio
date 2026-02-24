import { CheckCircle, BarChart3, Users, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: CheckCircle,
    title: "Presença em 1 clique",
    description:
      "Registre a frequência de qualquer turma em segundos, pelo celular ou computador.",
  },
  {
    icon: BarChart3,
    title: "Relatórios em tempo real",
    description:
      "Veja quem faltou, quem está em risco de cancelar, e como cada turma performa.",
  },
  {
    icon: Users,
    title: "Gestão de turmas e alunos",
    description:
      "Cadastros, matrículas, horários e grades num só lugar.",
  },
  {
    icon: Zap,
    title: "Pronto em 15 minutos",
    description:
      "Do cadastro ao primeiro registro de presença, sem precisar de ajuda.",
  },
]

export function FeaturesSection() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
          Tudo que seu estúdio precisa, sem o que não precisa.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {features.map((item) => (
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
