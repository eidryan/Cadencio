"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const WHATSAPP_LINK =
  "https://wa.me/55XXXXXXXXXXX?text=Oi%2C%20quero%20conhecer%20o%20Cadencio"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-black/5 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6">
        <a
          href="/"
          className="text-xl font-bold tracking-tight text-primary"
        >
          cadencio
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            Entrar
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-[#0A5C5F] transition-colors btn-glow"
          >
            Quero experimentar
          </a>
        </div>

        {/* Mobile nav */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-[#0A5C5F] transition-colors"
          >
            Experimentar
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-1.5 text-foreground/70 hover:text-foreground hover:bg-black/5 transition-colors"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="border-t border-black/5 bg-white/90 backdrop-blur-md px-4 py-3 md:hidden">
          <a
            href="/login"
            className="block rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Entrar
          </a>
        </div>
      )}
    </nav>
  )
}
