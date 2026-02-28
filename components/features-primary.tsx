"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

function MagicScanner() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 })

      // Laser scans down
      tl.fromTo(".scanner-laser",
        { top: "0%", opacity: 0 },
        { top: "0%", opacity: 1, duration: 0.2 }
      )
        .to(".scanner-laser", { top: "100%", duration: 2.5, ease: "power1.inOut" })

        // As laser moves, spreadsheet rows disappear and crisp cards appear
        .to(".raw-row-1", { opacity: 0, duration: 0.1 }, "-=2.2")
        .to(".clean-card-1", { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }, "-=2.1")

        .to(".raw-row-2", { opacity: 0, duration: 0.1 }, "-=1.7")
        .to(".clean-card-2", { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }, "-=1.6")

        .to(".raw-row-3", { opacity: 0, duration: 0.1 }, "-=1.2")
        .to(".clean-card-3", { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }, "-=1.1")

        .to(".scanner-laser", { opacity: 0, duration: 0.2 })

        // Reset
        .to([".clean-card-1", ".clean-card-2", ".clean-card-3"], { opacity: 0, y: 10, duration: 0.3, stagger: 0.1 }, "+=1.5")
        .to([".raw-row-1", ".raw-row-2", ".raw-row-3"], { opacity: 1, duration: 0.3 }, "<")

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="mt-8 md:mt-0 relative bg-gray-50 rounded-sm h-56 border border-gray-100 flex p-6 overflow-hidden items-center gap-6 md:gap-12 shadow-inner">
      {/* Old Spreadsheet */}
      <div className="flex-1 flex flex-col gap-3 relative">
        <div className="h-6 w-full bg-[#E5F6EE] border border-[#BCE8D1] rounded-sm mb-2 opacity-80" />
        <div className="raw-row-1 h-3 w-full bg-gray-200 rounded-sm" />
        <div className="raw-row-2 h-3 w-5/6 bg-gray-200 rounded-sm" />
        <div className="raw-row-3 h-3 w-11/12 bg-gray-200 rounded-sm" />

        {/* The Laser */}
        <div className="scanner-laser absolute left-[-10%] right-[-10%] h-[2px] bg-brand-400 shadow-[0_0_12px_rgba(69,204,209,0.9)] z-10" />
      </div>

      {/* New Cadencio Cards */}
      <div className="flex-1 flex flex-col gap-3 relative z-20">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`clean-card-${i} flex items-center gap-3 bg-white p-3 rounded-sm shadow-sm border border-brand-100 opacity-0 transform translate-y-3`}>
            <div className="w-6 h-6 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-sm" />
          </div>
        ))}
      </div>
    </div>
  )
}

function BloomingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bloom-dot",
        { scale: 0, opacity: 0, backgroundColor: "var(--gray-200)" },
        {
          scale: 1,
          opacity: 1,
          backgroundColor: () => {
            const r = Math.random();
            if (r > 0.8) return "var(--brand-600)";
            if (r > 0.5) return "var(--brand-400)";
            if (r > 0.2) return "var(--brand-200)";
            return "var(--gray-100)";
          },
          stagger: {
            each: 0.015,
            from: "random"
          },
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="mt-8 grid grid-cols-12 gap-1.5 p-4 bg-white rounded-sm border border-gray-100 shadow-sm h-48 content-start">
      {Array.from({ length: 96 }).map((_, i) => (
        <div key={i} className="bloom-dot w-full aspect-square rounded-[2px]" />
      ))}
    </div>
  )
}

function ChoreographedCursors() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create independent, smooth floating paths for 3 cursors
      gsap.to(".cursor-admin", {
        x: "random(-10, 80)",
        y: "random(-10, 40)",
        duration: "random(2, 3)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })
      gsap.to(".cursor-sec", {
        x: "random(20, 100)",
        y: "random(10, 60)",
        duration: "random(2.5, 3.5)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })
      gsap.to(".cursor-prof", {
        x: "random(-50, 40)",
        y: "random(20, 80)",
        duration: "random(1.8, 2.8)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })

      // Floating rings
      gsap.to(".role-ring", {
        rotation: 360,
        duration: 25,
        ease: "none",
        repeat: -1
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="mt-8 relative bg-surface-dark p-6 rounded-sm h-48 overflow-hidden flex items-center justify-center">
      {/* Abstract rings representing collaboration */}
      <div className="role-ring absolute w-[150%] h-[150%] border-t border-brand-500/20 rounded-full" />
      <div className="role-ring absolute w-[100%] h-[100%] border-r border-accent-coral/20 rounded-full" style={{ animationDirection: "reverse" }} />
      <div className="role-ring absolute w-[50%] h-[50%] border-b border-accent-mint/20 rounded-full" />

      {/* Cursors */}
      <svg className="cursor-admin absolute top-10 left-10 w-6 h-6 z-10 drop-shadow-[0_2px_6px_rgba(13,115,119,0.5)]" viewBox="0 0 24 24" fill="var(--brand-500)">
        <path d="M5.5 3.21V20.8C5.5 21.46 6.27 21.82 6.78 21.4L11.43 17.51C11.66 17.32 11.95 17.21 12.25 17.21H19.5C20.15 17.21 20.5 16.44 20.08 15.96L6.84 2.87C6.42 2.45 5.5 2.75 5.5 3.21Z" stroke="white" strokeWidth="1.5" />
      </svg>
      <svg className="cursor-sec absolute top-20 right-10 w-6 h-6 z-10 drop-shadow-[0_2px_6px_rgba(255,107,107,0.5)]" viewBox="0 0 24 24" fill="var(--accent-coral)">
        <path d="M5.5 3.21V20.8C5.5 21.46 6.27 21.82 6.78 21.4L11.43 17.51C11.66 17.32 11.95 17.21 12.25 17.21H19.5C20.15 17.21 20.5 16.44 20.08 15.96L6.84 2.87C6.42 2.45 5.5 2.75 5.5 3.21Z" stroke="white" strokeWidth="1.5" />
      </svg>
      <svg className="cursor-prof absolute bottom-10 right-20 w-6 h-6 z-10 drop-shadow-[0_2px_6px_rgba(110,231,183,0.5)]" viewBox="0 0 24 24" fill="var(--accent-mint)">
        <path d="M5.5 3.21V20.8C5.5 21.46 6.27 21.82 6.78 21.4L11.43 17.51C11.66 17.32 11.95 17.21 12.25 17.21H19.5C20.15 17.21 20.5 16.44 20.08 15.96L6.84 2.87C6.42 2.45 5.5 2.75 5.5 3.21Z" stroke="white" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

export function FeaturesPrimary() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          ease: "power3.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="protocolos" data-section-name="Protocolos" className="py-24 lg:py-32 bg-gray-50 relative z-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8" ref={containerRef}>
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-brand-50 border border-brand-200 rounded-full">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-xs font-bold text-brand-700 uppercase tracking-widest">
              Artefatos Funcionais
            </span>
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.05] tracking-tight mb-6">
            Não é um software.<br />É um ecossistema.
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            Substitua a desordem do papel e do Excel por um processo de telemetria elegante. Construído para ser fluido, altamente responsivo e silencioso.
          </p>
        </div>

        {/* Asymmetric Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* Card 1: Large Paper Fold Card */}
          <div className="feature-card col-span-1 lg:col-span-2 card-paper-fold flex flex-col md:flex-row gap-8 lg:gap-12 items-center p-8 md:p-12">
            <div className="flex-1 w-full lg:order-last">
              <MagicScanner />
            </div>
            <div className="flex-1">
              <div className="card-icon mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Importe sua Planilha</h4>
              <p className="text-gray-600 leading-relaxed">
                Traga seus alunos e matrículas de uma vez. O sistema absorve o caos dos seus controles atuais e transmuta tudo em cards organizados automaticamente.
              </p>
            </div>
          </div>

          {/* Card 2: Coral Accent */}
          <div className="feature-card col-span-1 card-coral-accent p-8 flex flex-col justify-between">
            <div>
              <div className="card-icon mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Histórico Completo</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Toda presença registrada fica salva. Um calendário que floresce dados e documenta a jornada do estúdio no tempo.
              </p>
            </div>
            <BloomingCanvas />
          </div>

          {/* Card 3: Violet Accent Wide */}
          <div className="feature-card col-span-1 lg:col-span-3 card-violet-accent flex flex-col md:flex-row gap-8 lg:gap-12 items-center p-8 md:p-12">
            <div className="flex-1">
              <div className="card-icon mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Equipe Colaborativa</h4>
              <p className="text-gray-600 leading-relaxed max-w-sm">
                Atribuição de papéis harmônica. Secretárias e professores acessando uma única fonte da verdade em tempo real, sem colisões.
              </p>
            </div>
            <div className="flex-1 w-full relative z-10">
              <ChoreographedCursors />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
