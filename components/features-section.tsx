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

function FeaturePlaceholder({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="flex h-[200px] w-full max-w-[280px] items-center justify-center rounded-2xl bg-primary/5 mx-auto">
      <Icon className="size-12 text-primary/20" strokeWidth={1.5} aria-hidden="true" />
    </div>
  )
}

export function FeaturesSection() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
          Tudo que seu estúdio precisa, sem o que não precisa.
        </h2>

        <div className="mt-12 flex flex-col gap-0">
          {features.map((item, i) => {
            const isEven = i % 2 === 1
            return (
              <div
                key={item.title}
                className="flex flex-col items-center gap-8 py-12 md:flex-row md:gap-16 md:py-16"
              >
                {/* Text side — on mobile always first; on desktop alternates */}
                <div className={`flex-1 ${isEven ? "md:order-2" : "md:order-1"}`}>
                  <item.icon
                    className="size-6 text-primary"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="mt-3 text-xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                {/* Visual placeholder — on mobile always second; on desktop alternates */}
                <div className={`shrink-0 ${isEven ? "md:order-1" : "md:order-2"}`}>
                  <FeaturePlaceholder Icon={item.icon} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
