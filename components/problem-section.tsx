"use client"

import { useEffect, useRef } from "react"
import { FileText, Table2, TrendingDown } from "lucide-react"

const PROBLEMS = [
  {
    icon: FileText,
    color: "#FF6B6B",
    colorLight: "#FFE5E5",
    cardClass: "card-coral-accent",
    tag: "Problema 01",
    title: "Presença no papel",
    description:
      "Cadernos perdidos, letra ilegível, informações que somem no fim do mês. Sem histórico, sem controle.",
    visual: (
      <div className="mt-6 p-4 bg-gray-50 rounded-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 border-2 border-gray-300 rounded-sm" />
          <div className="h-2 bg-gray-200 rounded flex-1" />
        </div>
        {["Ana Lima ✓ ✓ ✓ — ✓", "Carlos S. ✓ — ✓ ✓ —", "Diana M. — ✓ ✓ — ✓"].map((line, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 border-2 border-gray-200 rounded-sm shrink-0" />
            <div className="font-mono text-[11px] text-gray-400 line-through">{line}</div>
          </div>
        ))}
        <div className="mt-3 px-2 py-1 bg-red-50 border border-red-100 text-[10px] text-red-500 font-medium rounded-sm">
          ⚠ Caderno perdido — dados do mês inacessíveis
        </div>
      </div>
    ),
  },
  {
    icon: Table2,
    color: "#FFD93D",
    colorLight: "#FFF8E1",
    cardClass: "card-layered-paper",
    tag: "Problema 02",
    title: "Planilha que só você entende",
    description:
      "Sem backup, sem acesso compartilhado, sem histórico. Quando alguém precisa, você tem que explicar tudo do zero.",
    visual: (
      <div className="mt-6 overflow-hidden rounded-sm border border-gray-200">
        <div className="bg-green-700 px-3 py-1.5 text-[10px] font-mono text-green-100">
          Caderno_Presença_v3_FINAL_2.xlsx
        </div>
        <div className="p-3 bg-white">
          <div className="grid grid-cols-6 gap-1 text-[9px] font-mono">
            {["ALUNO", "SEG", "TER", "QUA", "QUI", "SEX"].map((h) => (
              <div key={h} className="bg-gray-100 px-1 py-0.5 text-center font-bold text-gray-500">{h}</div>
            ))}
            {["Ana L.", "1", "1", "0", "1", "1", "Carlos S.", "1", "0", "1", "1", "0", "Diana M.", "0", "1", "1", "0", "1"].map((c, i) => (
              <div
                key={i}
                className="px-1 py-0.5 text-center text-gray-600"
                style={{
                  background: c === "1" ? "#dcfce7" : c === "0" ? "#fee2e2" : "transparent",
                  fontWeight: c === "1" || c === "0" ? 600 : 400,
                }}
              >
                {c}
              </div>
            ))}
          </div>
          <div className="mt-2 text-[9px] text-gray-400 font-mono">
            #REF! #VALUE! #DIV/0!
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: TrendingDown,
    color: "#8B5CF6",
    colorLight: "#EDE9FE",
    cardClass: "card-violet-accent",
    tag: "Problema 03",
    title: "Sem dados para decidir",
    description:
      "Quem está faltando demais? Qual turma está crescendo? Sem visibilidade, você decide no escuro.",
    visual: (
      <div className="mt-6 p-4 bg-gray-50 rounded-sm border border-gray-100">
        <div className="text-[10px] font-semibold text-gray-500 mb-3 uppercase tracking-wider">
          Frequência por aluno
        </div>
        {[
          { name: "Ana Lima", pct: 85, ok: true },
          { name: "Carlos S.", pct: 40, ok: false },
          { name: "Diana M.", pct: 60, ok: true },
        ].map((s) => (
          <div key={s.name} className="mb-2">
            <div className="flex justify-between text-[10px] mb-0.5">
              <span className="text-gray-600">{s.name}</span>
              <span className={s.ok ? "text-brand-600 font-semibold" : "text-red-500 font-semibold"}>{s.pct}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${s.pct}%`,
                  background: s.ok ? "#0D7377" : "#EF4444",
                }}
              />
            </div>
          </div>
        ))}
        <div className="mt-3 text-[10px] text-gray-400 italic">
          ... mas você não tem esses dados agora.
        </div>
      </div>
    ),
  },
]

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)
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
          }
        })
      },
      { threshold: 0.15 }
    )

    cardsRef.current.forEach((card) => {
      if (card) {
        card.style.cssText = "opacity:0;transform:translateY(40px);transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1),transform 0.7s cubic-bezier(0.16,1,0.3,1)"
        observer.observe(card)
      }
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="problemas"
      data-section="Problemas"
      className="py-24 lg:py-32 bg-gray-50"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="section-badge">Reconhece isso?</span>
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-gray-900 mb-4">
            A gestão do seu estúdio não precisa ser assim.
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            A maioria dos estúdios ainda depende de papel, planilha ou memória. Isso custa tempo, dados e decisões certas.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PROBLEMS.map((p, i) => {
            const Icon = p.icon
            return (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el }}
                data-delay={i * 120}
                className={`${p.cardClass} p-8 shadow-lg`}
              >
                {/* Tag */}
                <div className="flex items-center gap-2 mb-5">
                  <div
                    className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0"
                    style={{ background: p.colorLight }}
                  >
                    <Icon size={18} style={{ color: p.color }} />
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: p.color }}
                  >
                    {p.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{p.title}</h3>
                <p className="text-[15px] text-gray-500 leading-relaxed">{p.description}</p>

                {p.visual}
              </div>
            )
          })}
        </div>

        {/* Bridge text */}
        <div className="mt-14 text-center">
          <p className="text-gray-500 text-lg">
            Existe um jeito melhor.{" "}
            <a href="#funcionalidades" className="text-brand-600 font-semibold underline underline-offset-2 hover:text-brand-700">
              Veja como o Cadencio resolve.
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
