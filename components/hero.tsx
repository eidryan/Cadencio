"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, Play, Check, Users } from "lucide-react"

const WHATSAPP = "https://wa.me/5521999999999?text=Oi%2C%20quero%20conhecer%20o%20Cadencio"

const CLASSES = [
  { name: "Ballet Iniciante",   time: "14:00–15:00", total: 8, present: 7, color: "#0D7377" },
  { name: "Pilates Avançado",   time: "15:30–16:30", total: 6, present: 6, color: "#8B5CF6" },
  { name: "Jazz Contemporâneo", time: "17:00–18:30", total: 10, present: 8, color: "#FF6B6B" },
]

const STUDENTS = [
  { initials: "AL", present: true },
  { initials: "BM", present: true },
  { initials: "CS", present: false },
  { initials: "DC", present: true },
  { initials: "ER", present: true },
  { initials: "FM", present: true },
  { initials: "GS", present: false },
]

function DashboardMockup() {
  return (
    <div className="rounded-sm shadow-2xl overflow-hidden border border-gray-200" style={{ background: "#F8FAFA" }}>
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-900">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-4 flex items-center bg-gray-800 rounded px-3 py-1 gap-1.5">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="text-[10px] text-gray-500 font-mono">cadencio.app</span>
        </div>
      </div>

      {/* App layout */}
      <div className="flex" style={{ height: 360 }}>
        {/* Sidebar */}
        <div className="flex flex-col items-center py-4 gap-3 shrink-0" style={{ width: 52, background: "#0D7377" }}>
          {[
            "M3 4h18v2H3zm0 7h18v2H3zm0 7h18v2H3z",
            "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
            "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
            "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
          ].map((d, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-sm flex items-center justify-center cursor-pointer"
              style={{ background: i === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? "white" : "rgba(255,255,255,0.5)"} strokeWidth="2">
                <path d={d} />
              </svg>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-100 shrink-0">
            <div>
              <div className="text-xs font-semibold text-gray-800">Terça, 25 de Fev</div>
              <div className="text-[10px] text-gray-400">3 turmas agendadas</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-semibold text-brand-700 bg-brand-50 rounded-sm border border-brand-200">
                Beta
              </span>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-[9px] font-bold text-white">
                M
              </div>
            </div>
          </div>

          {/* Class list */}
          <div className="flex-1 p-3 space-y-2 overflow-hidden">
            {CLASSES.map((cls, i) => (
              <div
                key={i}
                className="bg-white rounded-sm border border-gray-100 px-3 py-2 flex items-center gap-3"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
              >
                <div className="w-1 rounded-full self-stretch" style={{ background: cls.color, minHeight: 30 }} />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold text-gray-800 truncate">{cls.name}</div>
                  <div className="text-[10px] text-gray-400">{cls.time} · {cls.total} alunos</div>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  {Array.from({ length: Math.min(cls.total, 8) }).map((_, j) => (
                    <div
                      key={j}
                      className="w-3.5 h-3.5 rounded-sm flex items-center justify-center"
                      style={{
                        background: j < cls.present ? cls.color : "#F5F5F4",
                      }}
                    >
                      {j < cls.present && (
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  ))}
                  {cls.total > 8 && (
                    <div className="text-[9px] text-gray-400 ml-1">+{cls.total - 8}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Student quick-view */}
          <div className="border-t border-gray-100 px-3 py-2 bg-gray-50 shrink-0">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Users size={9} className="text-gray-400" />
              <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-widest">Chamada – Ballet Iniciante</span>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {STUDENTS.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-[9px] font-semibold"
                  style={{
                    background: s.present ? "#EFFCFC" : "#FEF2F2",
                    border: `1px solid ${s.present ? "#B4EEEF" : "#FECACA"}`,
                    color: s.present ? "#0D7377" : "#DC2626",
                  }}
                >
                  {s.initials}
                  {s.present
                    ? <Check size={7} strokeWidth={3} />
                    : <span style={{ fontSize: 8 }}>✕</span>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const visualRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animate = (el: HTMLElement | null, delay: number, dir: "left" | "right") => {
      if (!el) return
      const x = dir === "left" ? -36 : 36
      el.style.cssText = `opacity:0;transform:translateX(${x}px)`
      setTimeout(() => {
        el.style.cssText = `opacity:1;transform:translateX(0);transition:opacity 0.85s cubic-bezier(0.16,1,0.3,1),transform 0.85s cubic-bezier(0.16,1,0.3,1)`
      }, delay)
    }
    animate(contentRef.current, 80, "left")
    animate(visualRef.current, 240, "right")
  }, [])

  return (
    <section
      id="hero"
      data-section="Hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: 64 }}
    >
      {/* Aurora bg */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 110% 80% at -5% -5%, rgba(13,115,119,0.13), transparent 52%),
            radial-gradient(ellipse 80% 60% at 105% 15%, rgba(139,92,246,0.08), transparent 52%),
            radial-gradient(ellipse 60% 50% at 50% 110%, rgba(110,231,183,0.06), transparent 52%),
            #FAFAF9
          `,
          animation: "meshFloat 20s ease-in-out infinite",
        }}
      />

      {/* Teal glow orb */}
      <div
        className="absolute -z-10 pointer-events-none"
        style={{
          top: "8%", left: "-8%",
          width: 480, height: 480,
          background: "radial-gradient(circle, rgba(13,115,119,0.28), transparent 70%)",
          filter: "blur(64px)",
          animation: "glowPulse 5s ease-in-out infinite",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Content ────────────────────────── */}
          <div ref={contentRef}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 border border-brand-200 rounded-sm mb-7">
              <span
                className="w-2 h-2 rounded-sm rotate-45 shrink-0"
                style={{ background: "#24AEB5", animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              <span className="text-[11px] font-bold text-brand-700 uppercase tracking-[0.1em]">
                Beta Gratuito
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[42px] md:text-5xl lg:text-[58px] font-extrabold leading-[1.07] tracking-[-0.03em] text-gray-900 mb-6">
              Seu estúdio{" "}
              <span className="relative whitespace-nowrap">
                organizado,
                <svg
                  className="absolute -bottom-1 left-0 w-full overflow-visible"
                  height="5"
                  viewBox="0 0 300 5"
                  preserveAspectRatio="none"
                >
                  <path d="M2,3 C75,1 175,5 298,2" stroke="#0D7377" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              <span className="text-gray-400 font-semibold">sem papel,</span>
              <br />
              <span className="text-gray-400 font-semibold">sem planilha.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[17px] text-gray-600 leading-[1.7] max-w-[440px] mb-9">
              Controle de presença, turmas e alunos num só lugar —{" "}
              <strong className="text-gray-700 font-semibold">feito para quem administra estúdio</strong>,
              não para quem entende de tecnologia.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-angular"
              >
                Começar grátis
                <ArrowRight size={16} />
              </a>
              <a href="#como-funciona" className="btn-ghost-angular">
                <span className="flex items-center gap-2">
                  <Play size={14} />
                  Ver como funciona
                </span>
              </a>
            </div>

            {/* Trust hints */}
            <div className="flex flex-wrap gap-5 text-[13px] text-gray-500">
              {[
                "Sem cartão de crédito",
                "Setup em 15 minutos",
                "Suporte via WhatsApp",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check size={13} className="text-brand-500 shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: Mockup ─────────────────────────── */}
          <div ref={visualRef} className="relative">
            {/* Floating cards */}
            <div
              className="absolute -top-5 -left-6 z-10 bg-white border border-brand-100 rounded-sm px-3 py-2 shadow-xl hidden xl:flex items-center gap-2"
              style={{ animation: "floatSlow 5s ease-in-out infinite" }}
            >
              <div className="w-7 h-7 rounded-sm bg-brand-50 flex items-center justify-center shrink-0">
                <Check size={14} className="text-brand-600" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-gray-800">Presença marcada</div>
                <div className="text-[10px] text-gray-400">agora mesmo · Ballet</div>
              </div>
            </div>

            <div
              className="absolute -bottom-5 -right-5 z-10 bg-white border border-purple-100 rounded-sm px-3 py-2 shadow-xl hidden xl:flex items-center gap-2"
              style={{ animation: "floatSlow 6s ease-in-out infinite", animationDelay: "-2.5s" }}
            >
              <div className="w-7 h-7 rounded-sm bg-violet-50 flex items-center justify-center shrink-0">
                <Users size={14} className="text-violet-500" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-gray-800">21 alunos ativos</div>
                <div className="text-[10px] text-gray-400">3 turmas hoje</div>
              </div>
            </div>

            {/* Mockup with float */}
            <div style={{ animation: "float 7s ease-in-out infinite" }}>
              <DashboardMockup />
            </div>

            {/* Soft glow behind */}
            <div
              className="absolute inset-0 -z-10 rounded-sm"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(13,115,119,0.18), transparent 70%)",
                filter: "blur(40px)",
                transform: "scale(1.12)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
