"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, Play, Check, Users } from "lucide-react"
import { gsap } from "gsap"

const WHATSAPP = "https://wa.me/5521999999999?text=Oi%2C%20quero%20conhecer%20o%20Cadencio"

const CLASSES = [
  { name: "Ballet Iniciante", time: "14:00–15:00", total: 8, present: 7, color: "#0D7377" },
  { name: "Pilates Avançado", time: "15:30–16:30", total: 6, present: 6, color: "#8B5CF6" },
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

// Removing the complex DashboardMockup component since the preset calls for a full-bleed Unsplash image focus in the Hero.

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Magnetic button hover effect
      const magneticItems = document.querySelectorAll(".magnetic-nav")
      magneticItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          gsap.to(item, { scale: 1.03, duration: 0.3, ease: "power2.out" })
        })
        item.addEventListener("mouseleave", () => {
          gsap.to(item, { scale: 1, duration: 0.3, ease: "power2.out" })
        })
      })

      // Staggered fade up for hero content
      gsap.fromTo(
        ".hero-reveal",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.2 }
      )
    }, contentRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      data-section="Hero"
      className="relative min-h-[100dvh] flex items-end overflow-hidden"
      style={{ paddingBottom: "10vh" }}
    >
      {/* Organic Background Image - using an Unsplash placeholder of dark forest/organic texture */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2674&auto=format&fit=crop')",
        }}
      />

      {/* Heavy Gradient Overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(to top, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.8) 40%, rgba(46,64,54,0.4) 100%)"
        }}
      />

      {/* SVG Noise filter defined in layout.tsx will cover this automatically */}

      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full relative z-10" ref={contentRef}>
        <div className="max-w-[800px]">
          {/* Badge */}
          <div className="hero-reveal inline-flex items-center gap-2 px-3 py-1.5 bg-[#F2F0E9]/10 border border-[#F2F0E9]/20 backdrop-blur-md rounded-full mb-8">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: "#CC5833", animation: "pulse-dot 2s ease-in-out infinite" }}
            />
            <span className="text-[11px] font-bold text-[#F2F0E9] uppercase tracking-widest">
              SISTEMA OPERACIONAL
            </span>
          </div>

          {/* Title */}
          <h1 className="hero-reveal text-[48px] md:text-5xl lg:text-[72px] font-extrabold font-sans leading-[1.05] tracking-tight text-[#F2F0E9] mb-4">
            A presença é a{" "}
            <br className="hidden md:block" />
            <span className="font-cormorant italic font-normal text-[56px] md:text-6xl lg:text-[84px] text-[#CC5833]">
              verdade.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-reveal text-[18px] md:text-[20px] text-[#F2F0E9]/70 leading-[1.6] max-w-[500px] mb-12 font-medium">
            Controle de presença e gestão de turmas com precisão milimétrica. Onde a simplicidade encontra a operação do seu estúdio.
          </p>

          {/* CTAs */}
          <div className="hero-reveal flex flex-wrap items-center gap-6">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group items-center justify-center px-8 py-4 text-[15px] font-semibold text-[#F2F0E9] bg-[#CC5833] rounded-full overflow-hidden magnetic-nav shrink-0 shadow-[0_0_40px_rgba(204,88,51,0.3)] hover:shadow-[0_0_60px_rgba(204,88,51,0.5)] transition-shadow duration-500"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:scale-105 flex items-center gap-2">
                Iniciar Protocolo
                <ArrowRight size={16} />
              </span>
              <div className="absolute inset-0 h-full w-full opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/10 z-0"></div>
            </a>
            <a href="#como-funciona" className="text-[#F2F0E9] font-medium text-[15px] hover:text-[#CC5833] transition-colors flex items-center gap-2 magnetic-nav">
              <span className="w-10 h-10 rounded-full border border-[#F2F0E9]/20 flex items-center justify-center bg-[#F2F0E9]/5 backdrop-blur-sm">
                <Play size={14} fill="currentColor" className="text-[#F2F0E9] group-hover:text-[#CC5833] ml-1" />
              </span>
              Ver a metodologia
            </a>
          </div>

          {/* Trust hints */}
          <div className="hero-reveal mt-12 pt-8 border-t border-[#F2F0E9]/10 flex flex-wrap gap-x-8 gap-y-4 text-[13px] font-mono text-[#F2F0E9]/50">
            {[
              "STATUS: ONLINE",
              "SETUP: 15 MIN",
              "LATÊNCIA: ZERO",
            ].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-[#CC5833]"></div>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
