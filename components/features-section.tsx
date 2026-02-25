import { CheckCircle, BarChart3, Users, Zap } from "lucide-react"
import { ScrollAnimate } from "@/components/scroll-animate"

const features = [
  {
    icon: CheckCircle,
    title: "Presença em 1 clique",
    description:
      "Registre a frequência de qualquer turma em segundos, pelo celular ou computador.",
    accent: "teal",
    iconColor: "text-[#0D7377]",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-100",
    iconBg: "bg-[#0D7377]/10",
    colSpan: "md:col-span-2",
  },
  {
    icon: BarChart3,
    title: "Relatórios em tempo real",
    description:
      "Veja quem faltou, quem está em risco de cancelar, e como cada turma performa.",
    accent: "purple",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-100",
    iconBg: "bg-purple-100",
    colSpan: "md:col-span-1",
  },
  {
    icon: Users,
    title: "Gestão de turmas e alunos",
    description:
      "Cadastros, matrículas, horários e grades num só lugar.",
    accent: "orange",
    iconColor: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-100",
    iconBg: "bg-orange-100",
    colSpan: "md:col-span-1",
  },
  {
    icon: Zap,
    title: "Pronto em 15 minutos",
    description:
      "Do cadastro ao primeiro registro de presença, sem precisar de ajuda.",
    accent: "emerald",
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
    iconBg: "bg-emerald-100",
    colSpan: "md:col-span-2",
  },
]

const hoverClassMap: Record<string, string> = {
  teal: "card-hover card-hover-teal",
  purple: "card-hover card-hover-purple",
  orange: "card-hover card-hover-orange",
  emerald: "card-hover card-hover-emerald",
}

export function FeaturesSection() {
  return (
    <section className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-5xl">
        <ScrollAnimate className="text-center">
          <p className="eyebrow mb-3">Funcionalidades</p>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Tudo que seu estúdio precisa,{" "}
            <span className="text-muted-foreground font-normal">sem o que não precisa.</span>
          </h2>
        </ScrollAnimate>

        {/* Bento grid: 3 columns — row 1: [2/3, 1/3], row 2: [1/3, 2/3] */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {features.map((item, i) => (
            <ScrollAnimate
              key={item.title}
              delay={(Math.min(i * 100, 400)) as 100 | 200 | 300 | 400}
              className={item.colSpan}
            >
              <div
                className={`h-full rounded-2xl border p-6 ${item.bgColor} ${item.borderColor} ${hoverClassMap[item.accent]}`}
              >
                <div className={`mb-4 inline-flex size-11 items-center justify-center rounded-xl ${item.iconBg}`}>
                  <item.icon
                    className={`size-5 ${item.iconColor}`}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-base font-bold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  )
}
