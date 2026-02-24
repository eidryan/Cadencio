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
      className={`sticky top-0 z-50 bg-card transition-shadow ${
        scrolled ? "shadow-sm border-b border-border" : ""
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6">
        <a href="/" className="text-xl font-bold text-primary">
          cadencio
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/login"
            className="rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5"
          >
            Entrar
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-[#0A5C5F]"
          >
            Quero experimentar
          </a>
        </div>

        {/* Mobile nav */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-[#0A5C5F]"
          >
            Quero experimentar
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-foreground"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="border-t border-border px-4 py-3 md:hidden">
          <a
            href="/login"
            className="block rounded-lg border border-primary px-4 py-2 text-center text-sm font-medium text-primary hover:bg-primary/5"
          >
            Entrar
          </a>
        </div>
      )}
    </nav>
  )
}
