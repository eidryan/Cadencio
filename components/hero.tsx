"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, Play } from "lucide-react"
import { gsap } from "gsap"

const WHATSAPP = "https://wa.me/5521971715456?text=Oi%2C%20quero%20conhecer%20o%20Cadencio"

function InteractiveMockup() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Liquid gauge fills up
      gsap.to(".liquid-fill", {
        height: "85%",
        duration: "random(2.5, 4)",
        ease: "sine.inOut",
        stagger: {
          each: 0.5,
          from: "random"
        },
        repeat: -1,
        yoyo: true
      })

      // Dots rippling (turning teal and pulsing)
      const animateDot = (dot: Element) => {
        const tl = gsap.timeline({
          delay: gsap.utils.random(0.5, 4),
          onComplete: () => animateDot(dot)
        })
        tl.to(dot, { backgroundColor: "var(--brand-500)", borderColor: "var(--brand-500)", duration: 0.3 })
          .to(dot.querySelector('.ripple'), { scale: 3, opacity: 0, duration: 1, ease: "power2.out" }, "<")
          .set(dot.querySelector('.ripple'), { scale: 0.5, opacity: 1 })
          .to(dot, { backgroundColor: "transparent", borderColor: "var(--gray-300)", duration: 0.3, delay: 2.5 })
      }

      gsap.utils.toArray(".student-dot").forEach((dot: any) => animateDot(dot))

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative z-10 w-full h-full flex items-center justify-center">
      <div className="relative w-[85%] aspect-[4/3] bg-white rounded-sm shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] p-6 rotate-[-2deg] flex flex-col gap-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="h-5 w-1/3 bg-gray-200 rounded-sm" />
          <div className="w-10 h-5 rounded-full bg-brand-100" />
        </div>

        {/* Liquid Schedule Grid */}
        <div className="flex-1 grid grid-cols-3 gap-4">
          {[1, 2, 3].map((col) => (
            <div key={col} className="relative bg-gray-50 rounded-sm border border-gray-100 flex flex-col items-center justify-end overflow-hidden p-2 pb-0">

              {/* Header for column */}
              <div className="absolute top-2 inset-x-2 h-4 bg-gray-200 rounded-sm opacity-50 z-20" />

              {/* Liquid Fill */}
              <div className="liquid-fill absolute bottom-0 inset-x-0 bg-brand-50/70 w-full rounded-sm z-0" style={{ height: '20%' }} />

              {/* Dots container */}
              <div className="relative z-10 w-full flex flex-col gap-2 pb-2 mt-8">
                {[1, 2, 3, 4].map((dot) => (
                  <div key={`${col}-${dot}`} className="flex items-center justify-between px-2 py-2 bg-white/90 rounded-sm shadow-sm backdrop-blur-sm border border-white">
                    <div className="h-1.5 w-1/2 bg-gray-200 rounded-sm" />
                    <div className="student-dot relative w-3.5 h-3.5 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                      <div className="ripple absolute inset-0 rounded-full border border-brand-400 opacity-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Decorative corner fold */}
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-gray-100" />
        <div className="absolute top-0 right-0 w-0 h-0 border-r-[40px] border-r-transparent border-b-[40px] border-b-white shadow-[-2px_2px_4px_rgba(0,0,0,0.05)] transform origin-top-right rotate-180 z-30" />
      </div>

      {/* Floating secondary indicator */}
      <div className="absolute -bottom-4 right-4 w-48 p-4 bg-white rounded-sm shadow-xl border border-gray-100 rotate-[4deg] z-20">
        <div className="flex justify-between items-center mb-3">
          <div className="w-16 h-3 bg-gray-200 rounded-sm" />
          <div className="w-6 h-6 rounded-full bg-accent-mint/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-accent-mint animate-pulse" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="w-full h-2 bg-gray-100 rounded-sm" />
          <div className="w-4/5 h-2 bg-gray-100 rounded-sm" />
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered fade up for hero content
      gsap.fromTo(
        ".hero-reveal",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.3 }
      )

      // Floating animation for the mockup container
      gsap.to(".hero-mockup-container", {
        y: -15,
        rotation: 1,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      data-section-name="Home"
      className="relative min-h-[100dvh] flex items-center pt-24 overflow-hidden bg-white"
      ref={containerRef}
    >
      {/* Aurora Background Mesh */}
      <div
        className="absolute inset-0 z-0 opacity-70"
        style={{ background: "var(--gradient-aurora)" }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

        {/* Left Content */}
        <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left flex flex-col items-center lg:items-start pt-10">
          <div className="hero-reveal inline-flex items-center gap-2 px-3 py-1 bg-brand-50 border border-brand-200 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-[11px] font-bold text-brand-700 uppercase tracking-widest">
              SISTEMA OPERACIONAL BETA
            </span>
          </div>

          <h1 className="hero-reveal text-5xl sm:text-6xl lg:text-[72px] font-bold tracking-tight text-gray-900 leading-[1.05] mb-6">
            Seu estúdio
            <br />
            <span className="text-brand-500">finalmente</span> organizado.
          </h1>

          <p className="hero-reveal text-lg lg:text-xl text-gray-500 leading-relaxed mb-8 max-w-lg">
            Controle de presença e gestão de turmas com precisão milimétrica. Onde a simplicidade encontra a operação do seu estúdio.
          </p>

          <div className="hero-reveal flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              Iniciar Protocolo
              <ArrowRight size={16} />
            </a>
            <a href="#metodologia" className="btn-ghost w-full sm:w-auto group">
              <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center bg-gray-50 group-hover:bg-brand-50 group-hover:border-brand-200 transition-colors">
                <Play size={10} className="text-gray-500 group-hover:text-brand-600 ml-0.5" />
              </span>
              Ver Método
            </a>
          </div>

          {/* Trust hints */}
          <div className="hero-reveal mt-12 flex items-center justify-center lg:justify-start gap-6 text-[12px] font-mono text-gray-400">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-mint" />
              SETUP: 15 MIN
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              LATÊNCIA ZERO
            </span>
          </div>
        </div>

        {/* Right Visual - Interactive Mockup */}
        <div className="hero-reveal hidden lg:block relative w-full aspect-square max-w-[600px] mx-auto">
          {/* Glow behind mockup */}
          <div className="absolute inset-20 bg-brand-400/20 blur-[80px] rounded-full z-0" />

          <div className="hero-mockup-container relative z-10 w-full h-full flex items-center justify-center">
            <InteractiveMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
