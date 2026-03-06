import { Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-surface-dark text-brand-50 pt-24 pb-12 rounded-t-sm mt-[-2rem] relative z-20 overflow-hidden border-t-2 border-brand-500/20">
      {/* Decorative origami fold corner */}
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[60px] border-l-transparent border-t-[60px] border-t-brand-600/30" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">

          {/* Logo & Status */}
          <div className="md:col-span-5 lg:col-span-4">
            <a href="/" className="inline-block flex items-center gap-3 mb-8 group">
              <svg className="w-8 h-8 text-brand-400 group-hover:text-brand-300 transition-colors" viewBox="0 0 100 100">
                <polygon points="50,5 85,35 70,90 30,90 15,35" fill="currentColor" />
                <polygon points="50,15 72,38 62,80 38,80 28,38" fill="var(--brand-600)" opacity="0.6" />
              </svg>
              <span className="text-2xl font-bold font-sans tracking-tight">Cadencio<span className="text-accent-mint">.</span></span>
            </a>
            <p className="text-brand-50/60 text-sm mb-10 max-w-sm leading-relaxed">
              Controle de presença e gestão de turmas para estúdios de dança, pilates e artes marciais.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-500/10 border border-brand-500/20 rounded-full">
              <span className="w-2 h-2 rounded-full bg-accent-mint animate-pulse" />
              <span className="text-[10px] font-bold text-accent-mint uppercase tracking-widest">
                No ar · Rio de Janeiro
              </span>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Links Group 1 */}
          <div className="md:col-span-3 lg:col-span-3 pb-8 md:pb-0 border-b border-brand-50/10 md:border-b-0">
            <h4 className="font-bold text-[15px] mb-6 tracking-wide text-gray-100">Navegue</h4>
            <ul className="space-y-4 text-[14px] text-brand-50/60">
              <li><a href="#protocolos" className="hover:text-accent-mint transition-colors">Funcionalidades</a></li>
              <li><a href="#como-funciona" className="hover:text-accent-mint transition-colors">Como Funciona</a></li>
              <li><a href="#beta" className="hover:text-accent-mint transition-colors">Entrar Grátis</a></li>
            </ul>
          </div>

          {/* Links Group 2 */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="font-bold text-[15px] mb-6 tracking-wide text-gray-100">Empresa</h4>
            <ul className="space-y-4 text-[14px] text-brand-50/60">
              <li><a href="#filosofia" className="hover:text-accent-mint transition-colors">Por que o Cadencio?</a></li>
              <li><a href="#" className="hover:text-accent-mint transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-accent-mint transition-colors">Privacidade</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-500/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-brand-50/40 text-xs font-semibold uppercase tracking-wide">
              &copy; {new Date().getFullYear()} Cadencio. Feito no RJ 🇧🇷
            </p>
            <span className="hidden sm:block text-brand-50/20 text-xs">·</span>
            <p className="text-brand-50/30 text-xs tracking-wide">
              Desenvolvido por{" "}
              <a 
                href="https://blinkgroup.com.br/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-brand-50/50 hover:text-accent-mint transition-colors font-bold uppercase"
              >
                Blink
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
