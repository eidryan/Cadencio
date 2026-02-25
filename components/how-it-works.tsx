"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const steps = [
  {
    phase: "01",
    title: "Sincronização",
    desc: "Importe sua base atual de alunos e defina os horários do estúdio. Tudo via painel simples ou com nossa ajuda pelo WhatsApp.",
    align: "center", // First is center
  },
  {
    phase: "02",
    title: "Implementação",
    desc: "Acesse pelo navegador em qualquer dispositivo. O Cadencio é ultraleve. Nenhum aplicativo precisa ser baixado pelas suas alunas.",
    align: "right", // Staggered right
  },
  {
    phase: "03",
    title: "Telemetria Ativa",
    desc: "Comece a registrar presenças com um clique. Deixe o sistema acumular o histórico e gerar os relatórios do mês automaticamente.",
    align: "left", // Staggered left
  }
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrappers = gsap.utils.toArray(".protocol-card-wrapper") as HTMLElement[]

      wrappers.forEach((wrapper, i) => {
        if (i === 0) return

        // Background color transitions: Cream -> Muted/Secondary -> Cream
        ScrollTrigger.create({
          trigger: wrapper,
          start: "top 60%",
          end: "top 40%",
          scrub: true,
          onEnter: () => gsap.to(sectionRef.current, { backgroundColor: i === 1 ? "#E8E4DD" : "#F2F0E9", duration: 0.5, ease: "power2.out" }),
          onLeaveBack: () => gsap.to(sectionRef.current, { backgroundColor: i === 1 ? "#F2F0E9" : "#E8E4DD", duration: 0.5, ease: "power2.out" })
        })

        // Scale down and fade previous card as the new one arrives
        ScrollTrigger.create({
          trigger: wrapper,
          start: "top 90%",
          end: "top 20%",
          scrub: true,
          animation: gsap.to(wrappers[i - 1].querySelector(".protocol-card"), {
            scale: 0.92,
            opacity: 0.4,
            y: -20,
            ease: "none"
          })
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="py-32 lg:py-48 bg-[#F2F0E9] relative transition-colors duration-700"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-24 lg:mb-40 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
            <span className="text-xs font-mono font-semibold tracking-widest text-[#1A1A1A] uppercase">
              O Protocolo Cadencio
            </span>
          </div>
          <h2 className="text-[40px] md:text-5xl lg:text-[72px] font-sans font-extrabold text-[#1A1A1A] tracking-tight leading-[1.05]">
            Nenhuma <span className="font-cormorant italic font-normal text-[#CC5833] text-[48px] md:text-6xl lg:text-[84px]">fricção.</span>
          </h2>
        </div>

        {/* Stacking Archive */}
        <div className="relative pb-[20vh] md:pb-[30vh]">
          {steps.map((step, i) => {
            // Calculate alignment logic
            const alignClass =
              step.align === "left" ? "md:mr-auto md:ml-0" :
                step.align === "right" ? "md:ml-auto md:mr-0" : "mx-auto";

            return (
              <div
                key={i}
                className="protocol-card-wrapper sticky pt-6 w-full flex"
                style={{
                  top: `calc(15vh + ${i * 40}px)`,
                  zIndex: i + 10,
                  marginBottom: i === steps.length - 1 ? 0 : "30vh"
                }}
              >
                <div
                  className={`protocol-card w-full max-w-2xl bg-white border border-[#E8E4DD] p-10 md:p-14 lg:p-16 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-[2rem] md:rounded-[3rem] ${alignClass}`}
                >
                  {/* Oversized phase number */}
                  <div className="text-[80px] md:text-[120px] font-sans font-extrabold text-[#F2F0E9] leading-[0.8] tracking-tighter mb-8 -ml-2 selection:bg-transparent">
                    {step.phase}
                  </div>

                  <h3 className="text-3xl md:text-4xl font-sans font-bold text-[#1A1A1A] mb-4 tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-lg md:text-xl text-[#1A1A1A]/70 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
