"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"
import { gsap } from "gsap"

const WHATSAPP = "https://wa.me/5521999999999?text=Oi%2C%20quero%20conhecer%20o%20Cadencio"

const SECTIONS = [
  { id: "funcionalidades", label: "Protocolos" },
  { id: "como-funciona", label: "Metodologia" },
  { id: "preco", label: "Planos" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
    }, navRef)
    return () => ctx.revert()
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full px-6 py-3 flex items-center justify-between gap-8 ${scrolled
          ? "bg-[#F2F0E9]/80 backdrop-blur-xl border border-[#E8E4DD] shadow-lg text-[#1A1A1A] w-[90%] md:w-[700px]"
          : "bg-transparent text-[#F2F0E9] w-full px-12"
        }`}
    >
      {/* Logo */}
      <a href="/" className="text-xl font-bold font-sans tracking-tight shrink-0 magnetic-nav">
        Cadencio
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`text-sm font-medium transition-all duration-300 hover:-translate-y-[1px] ${scrolled ? "text-[#1A1A1A]/70 hover:text-[#1A1A1A]" : "text-[#F2F0E9]/80 hover:text-[#F2F0E9]"
              }`}
          >
            {s.label}
          </a>
        ))}
      </div>

      {/* Desktop CTA */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:inline-flex relative group items-center justify-center px-6 py-2.5 text-sm font-semibold text-[#F2F0E9] bg-[#CC5833] rounded-full overflow-hidden magnetic-nav shrink-0"
      >
        <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">Começar</span>
        <div className="absolute inset-0 h-full w-full opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/10 z-0"></div>
      </a>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`md:hidden p-2 rounded-full ${scrolled ? "text-[#1A1A1A]" : "text-[#F2F0E9]"}`}
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
      >
        {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#F2F0E9]/95 backdrop-blur-xl border border-[#E8E4DD] shadow-xl rounded-2xl p-6 flex flex-col gap-4 md:hidden">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-lg font-medium text-[#1A1A1A] hover:opacity-70"
              onClick={() => setMenuOpen(false)}
            >
              {s.label}
            </a>
          ))}
          <div className="h-px bg-[#E8E4DD] my-2" />
          <a
            href={WHATSAPP}
            className="w-full py-3 text-center text-sm font-bold text-[#F2F0E9] bg-[#CC5833] rounded-full"
          >
            Começar
          </a>
        </div>
      )}
    </nav>
  )
}

