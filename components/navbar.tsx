"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"

const WHATSAPP = "https://wa.me/5521999999999?text=Oi%2C%20quero%20conhecer%20o%20Cadencio"

const SECTIONS = [
  { id: "funcionalidades", label: "Funcionalidades" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "preco", label: "Preço" },
  { id: "faq", label: "FAQ" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sectionName, setSectionName] = useState("")
  const [indicatorVisible, setIndicatorVisible] = useState(false)
  const indicatorTextRef = useRef<HTMLSpanElement>(null)
  const currentSectionRef = useRef("")

  useEffect(() => {
    const sectionEls = document.querySelectorAll<HTMLElement>("section[data-section]")

    function onScroll() {
      const y = window.scrollY
      setScrolled(y > 40)

      // Section indicator
      const heroEl = document.getElementById("hero")
      const heroH = heroEl ? heroEl.offsetHeight : window.innerHeight
      setIndicatorVisible(y > heroH * 0.4)

      // Find current section
      let found = ""
      sectionEls.forEach((s) => {
        const rect = s.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.3) {
          found = s.dataset.section || ""
        }
      })

      if (found && found !== currentSectionRef.current) {
        currentSectionRef.current = found
        if (indicatorTextRef.current) {
          indicatorTextRef.current.style.opacity = "0"
          setTimeout(() => {
            setSectionName(found)
            if (indicatorTextRef.current) indicatorTextRef.current.style.opacity = "1"
          }, 140)
        } else {
          setSectionName(found)
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-glow ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm"
          : "bg-white/50 backdrop-blur-md"
      }`}
      style={{ height: 64 }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group shrink-0">
          <svg
            className="logo-breath"
            width="36"
            height="36"
            viewBox="0 0 100 100"
            aria-label="Cadencio"
          >
            <polygon points="50,5 85,35 70,90 30,90 15,35" fill="#0D7377" />
            <polygon points="50,18 72,40 62,80 38,80 28,40" fill="#24AEB5" opacity="0.6" />
            <polygon points="15,35 4,24 29,31" fill="#45CCD1" opacity="0.8" />
            <polygon points="85,35 96,24 71,31" fill="#0F6266" opacity="0.8" />
          </svg>
          <span className="text-xl font-bold text-gray-900 relative">
            Cadencio
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full" />
          </span>
        </a>

        {/* Section indicator – desktop */}
        <div
          className={`hidden md:flex items-center gap-2 px-3 py-1 text-[11px] font-bold tracking-widest uppercase text-brand-700 bg-brand-50 border border-brand-200 rounded-sm transition-all duration-300 ${
            indicatorVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
          }`}
        >
          <span
            className="w-1.5 h-1.5 rounded-sm rotate-45"
            style={{ background: "#24AEB5" }}
          />
          <span
            ref={indicatorTextRef}
            style={{ transition: "opacity 0.15s ease" }}
          >
            {sectionName}
          </span>
        </div>

        {/* Desktop links + CTA */}
        <div className="hidden md:flex items-center gap-1">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-brand-700 rounded-sm hover:bg-brand-50 transition-all duration-150"
            >
              {s.label}
            </a>
          ))}
          <div className="w-px h-5 bg-gray-200 mx-2" />
          <a
            href="/login"
            className="btn-ghost-angular text-sm"
          >
            <span>Entrar</span>
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-angular text-sm ml-2"
          >
            Começar grátis
          </a>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-angular text-sm"
          >
            Começar
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 text-gray-700"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg px-6 py-4 md:hidden flex flex-col gap-2">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-brand-700"
              onClick={() => setMenuOpen(false)}
            >
              {s.label}
            </a>
          ))}
          <div className="h-px bg-gray-100 my-1" />
          <a
            href="/login"
            className="block py-2 text-sm font-medium text-brand-700 text-center border border-brand-200 rounded-sm"
          >
            Entrar
          </a>
        </div>
      )}
    </nav>
  )
}
