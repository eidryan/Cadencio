"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"
import { gsap } from "gsap"

const WHATSAPP = "https://wa.me/5521971715456?text=Oi%2C%20quero%20conhecer%20o%20Cadencio"

const SECTIONS = [
  { id: "protocolos", label: "Protocolos" },
  { id: "metodologia", label: "Metodologia" },
  { id: "beta", label: "Beta" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("Home")
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      // Update active section based on scroll
      const sections = Array.from(document.querySelectorAll("section[id]"))
      let current = "Home"

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        if (window.scrollY >= sectionTop - 150) {
          const name = section.getAttribute("data-section-name") || section.id
          current = name.charAt(0).toUpperCase() + name.slice(1)
        }
      })

      if (window.scrollY < 100) {
        current = "Home"
      }

      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 rounded-sm px-6 py-3 flex items-center justify-between gap-8 ${scrolled
        ? "bg-white/95 backdrop-blur-xl border border-gray-200 shadow-md text-gray-900 w-[95%] md:w-[800px]"
        : "bg-transparent text-gray-900 w-full px-12"
        }`}
    >
      {/* Abstract Logo */}
      <a href="/" className="flex items-center gap-3 shrink-0 group">
        <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" viewBox="0 0 100 100">
          <polygon points="50,5 85,35 70,90 30,90 15,35" fill="var(--brand-600)" />
          <polygon points="50,15 72,38 62,80 38,80 28,38" fill="var(--brand-400)" opacity="0.6" />
          <polygon points="15,35 5,25 30,30" fill="var(--brand-500)" opacity="0.8" />
          <polygon points="85,35 95,25 70,30" fill="var(--brand-700)" opacity="0.8" />
        </svg>
        <span className="text-xl font-bold font-sans tracking-tight">Cadencio</span>
      </a>

      {/* Section Indicator (Detached Pill) */}
      {scrolled && (
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-white/90 backdrop-blur-md text-brand-700 rounded-full border border-gray-200 shadow-sm absolute top-full mt-3 left-1/2 -translate-x-1/2 transition-opacity animate-in fade-in duration-300">
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
          <span className="text-[10px] font-bold uppercase tracking-wider">{activeSection}</span>
        </div>
      )}

      {/* Right side controls (Links + CTA) */}
      <div className="hidden md:flex items-center gap-8 z-10">
        {/* Desktop links */}
        <div className="flex items-center gap-6">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-sm font-semibold transition-all duration-300 hover:-translate-y-[2px] text-gray-600 hover:text-brand-600"
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
          className="btn-paper-cut shrink-0 !py-2 !px-4 text-sm"
        >
          Começar
        </a>
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2 text-gray-900"
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
      >
        {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border border-gray-200 shadow-xl rounded-sm p-6 flex flex-col gap-4 md:hidden">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-lg font-medium text-gray-900 hover:text-brand-600"
              onClick={() => setMenuOpen(false)}
            >
              {s.label}
            </a>
          ))}
          <div className="h-px bg-gray-200 my-2" />
          <a
            href={WHATSAPP}
            className="w-full btn-primary text-center"
          >
            Começar
          </a>
        </div>
      )}
    </nav>
  )
}

