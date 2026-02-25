"use client"

import { useEffect, useRef } from "react"
import { CheckCircle, Database, Users, Zap, Check } from "lucide-react"

/* ── Mini mockup: Attendance ─────────────────────────────── */
function AttendanceMockup() {
  const students = [
    { name: "Ana Lima", present: true },
    { name: "Bruno M.", present: true },
    { name: "Carlos S.", present: false },
    { name: "Diana R.", present: true },
    { name: "Eduardo P.", present: true },
  ]
  return (
    <div className="mt-5 rounded-sm overflow-hidden border border-gray-100 shadow-sm">
      <div className="px-3 py-2 bg-brand-600 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-white">Ballet Avançado · terça 18h</span>
        <span className="text-[10px] text-brand-200">4/5 presentes</span>
      </div>
      <div className="bg-white divide-y divide-gray-50">
        {students.map((s, i) => (
          <div key={i} className="flex items-center justify-between px-3 py-2">
            <span className="text-[11px] text-gray-700">{s.name}</span>
            <button
              className="w-6 h-6 rounded-sm flex items-center justify-center transition-colors"
              style={{
                background: s.present ? "#0D7377" : "#F5F5F4",
                border: s.present ? "none" : "1.5px solid #D6D3D1",
              }}
            >
              {s.present && <Check size={11} strokeWidth={3} color="white" />}
            </button>
          </div>
        ))}
      </div>
      <div className="px-3 py-2 bg-brand-50 text-center">
        <span className="text-[10px] font-semibold text-brand-700">✓ Presença salva automaticamente</span>
      </div>
    </div>
  )
}

/* ── Mini mockup: History ────────────────────────────────── */
function HistoryMockup() {
  const months = ["Nov", "Dez", "Jan", "Fev"]
  const data   = [72, 81, 68, 90]
  const max    = Math.max(...data)
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-sm border border-gray-100">
      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
        Frequência mensal — Ana Lima
      </div>
      <div className="flex items-end gap-2 h-14">
        {data.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-sm"
              style={{
                height: `${(v / max) * 44}px`,
                background: i === data.length - 1 ? "#0D7377" : "#B4EEEF",
              }}
            />
            <span className="text-[9px] text-gray-400">{months[i]}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px]">
        <span className="text-gray-400">Última aula há 2 dias</span>
        <span className="text-brand-600 font-semibold">90% fev ↑</span>
      </div>
    </div>
  )
}

/* ── Mini mockup: Classes ────────────────────────────────── */
function ClassesMockup() {
  const classes = [
    { name: "Ballet Iniciante", count: 8,  color: "#0D7377", days: "Seg/Qua" },
    { name: "Pilates",          count: 6,  color: "#8B5CF6", days: "Ter/Qui" },
    { name: "Jazz",             count: 12, color: "#FF6B6B", days: "Sex" },
  ]
  return (
    <div className="mt-4 space-y-2">
      {classes.map((c, i) => (
        <div key={i} className="flex items-center gap-3 p-2.5 bg-white rounded-sm border border-gray-100 shadow-sm">
          <div className="w-2 h-8 rounded-sm shrink-0" style={{ background: c.color }} />
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-semibold text-gray-800 truncate">{c.name}</div>
            <div className="text-[10px] text-gray-400">{c.days} · {c.count} alunos</div>
          </div>
          <div
            className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm"
            style={{ background: `${c.color}15`, color: c.color }}
          >
            {c.count}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Mini mockup: Setup ──────────────────────────────────── */
function SetupMockup() {
  const steps = [
    { label: "Criar conta",         done: true,  time: "1 min"  },
    { label: "Adicionar turmas",    done: true,  time: "5 min"  },
    { label: "Importar alunos",     done: true,  time: "3 min"  },
    { label: "Primeira chamada",    done: false, time: "1 min"  },
  ]
  return (
    <div className="mt-4 space-y-2">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-3">
          <div
            className="w-5 h-5 rounded-sm flex items-center justify-center shrink-0"
            style={{
              background: s.done ? "#0D7377" : "#F5F5F4",
              border: s.done ? "none" : "1.5px dashed #D6D3D1",
            }}
          >
            {s.done && <Check size={10} strokeWidth={3} color="white" />}
          </div>
          <span className={`text-[12px] flex-1 ${s.done ? "text-gray-500 line-through" : "text-gray-800 font-semibold"}`}>
            {s.label}
          </span>
          <span className="text-[10px] text-gray-400">{s.time}</span>
        </div>
      ))}
      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[11px] text-gray-400">Total estimado</span>
        <span className="text-[13px] font-bold text-brand-600">~15 min</span>
      </div>
    </div>
  )
}

const FEATURES = [
  {
    cardClass:   "card-paper-fold",
    colSpan:     "md:col-span-2",
    icon:        CheckCircle,
    iconColor:   "#0D7377",
    iconBg:      "#EFFCFC",
    tag:         "Principal",
    title:       "Presença em 1 clique",
    description: "Registre a frequência de qualquer turma em segundos, pelo celular ou computador. Sem app para instalar.",
    visual:      <AttendanceMockup />,
    delay:       0,
  },
  {
    cardClass:   "card-origami-corner",
    colSpan:     "md:col-span-1",
    icon:        Database,
    iconColor:   "#24AEB5",
    iconBg:      "#D7F6F7",
    tag:         "Histórico",
    title:       "Histórico completo",
    description: "Toda presença fica salva. Nunca mais perca dados no fim do mês.",
    visual:      <HistoryMockup />,
    delay:       80,
  },
  {
    cardClass:   "card-layered-paper",
    colSpan:     "md:col-span-1",
    icon:        Users,
    iconColor:   "#8B5CF6",
    iconBg:      "#EDE9FE",
    tag:         "Gestão",
    title:       "Turmas e alunos",
    description: "Cadastros, matrículas e grades de horários num só lugar. Simples e visual.",
    visual:      <ClassesMockup />,
    delay:       160,
  },
  {
    cardClass:   "card-violet-accent",
    colSpan:     "md:col-span-2",
    icon:        Zap,
    iconColor:   "#8B5CF6",
    iconBg:      "#EDE9FE",
    tag:         "Onboarding",
    title:       "Pronto em 15 minutos",
    description: "Do cadastro ao primeiro registro de presença sem precisar de ajuda. Sem treinamento, sem consultor.",
    visual:      <SetupMockup />,
    delay:       240,
  },
]

export function FeaturesPrimary() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = Number(el.dataset.delay || 0)
            setTimeout(() => {
              el.style.opacity = "1"
              el.style.transform = "translateY(0)"
            }, delay)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )
    cardsRef.current.forEach((card) => {
      if (card) {
        card.style.cssText =
          "opacity:0;transform:translateY(36px);transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1),transform 0.7s cubic-bezier(0.16,1,0.3,1)"
        observer.observe(card)
      }
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="funcionalidades"
      data-section="Funcionalidades"
      className="py-24 lg:py-32 bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="section-badge">Funcionalidades</span>
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-gray-900 mb-4">
            Tudo que você precisa para{" "}
            <span className="text-brand-600">gerenciar bem</span>.
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Sem complexidade desnecessária. Apenas o essencial, bem feito.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el }}
                data-delay={f.delay}
                className={`${f.cardClass} ${f.colSpan} p-8 shadow-md border border-gray-100`}
              >
                {/* Icon + Tag */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                    style={{ background: f.iconBg }}
                  >
                    <Icon size={20} style={{ color: f.iconColor }} />
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.12em]"
                    style={{ color: f.iconColor }}
                  >
                    {f.tag}
                  </span>
                </div>

                <h3 className="text-[22px] font-bold text-gray-900 leading-tight mb-2">
                  {f.title}
                </h3>
                <p className="text-[15px] text-gray-500 leading-relaxed">
                  {f.description}
                </p>

                {f.visual}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
