import { Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#F2F0E9] pt-24 pb-12 rounded-t-[3rem] md:rounded-t-[4rem] mt-[-2rem] relative z-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">

          {/* Logo & Status */}
          <div className="md:col-span-5 lg:col-span-4">
            <a href="#" className="inline-block flex items-center gap-2 mb-8">
              <span className="w-6 h-6 rounded-full bg-[#CC5833]" />
              <span className="text-2xl font-sans font-extrabold tracking-tight">Cadencio<span className="text-[#CC5833]">.</span></span>
            </a>
            <p className="text-[#F2F0E9]/60 text-sm mb-10 max-w-sm leading-relaxed">
              O ecossistema operacional definitivo para estúdios artísticos e academias de alto rendimento.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F2F0E9]/5 border border-[#F2F0E9]/10 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-[#F2F0E9]/80 uppercase tracking-widest">
                System Operational
              </span>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Links Group 1 */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="font-semibold text-[15px] mb-6 tracking-wide">Plataforma</h4>
            <ul className="space-y-4 text-[14px] text-[#F2F0E9]/60">
              <li><a href="#funcionalidades" className="hover:text-[#CC5833] transition-colors">Funcionalidades</a></li>
              <li><a href="#como-funciona" className="hover:text-[#CC5833] transition-colors">Como funciona</a></li>
              <li><a href="#investimento" className="hover:text-[#CC5833] transition-colors">Membro Fundador</a></li>
            </ul>
          </div>

          {/* Links Group 2 */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="font-semibold text-[15px] mb-6 tracking-wide">Empresa</h4>
            <ul className="space-y-4 text-[14px] text-[#F2F0E9]/60">
              <li><a href="#" className="hover:text-[#CC5833] transition-colors">Manifesto</a></li>
              <li><a href="#" className="hover:text-[#CC5833] transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-[#CC5833] transition-colors">Privacidade</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#F2F0E9]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#F2F0E9]/40 text-xs font-medium">
            &copy; {new Date().getFullYear()} Cadencio. Feito no Rio de Janeiro 🇧🇷
          </p>
          <div className="flex items-center gap-4 text-[#F2F0E9]/40">
            <a href="https://instagram.com/cadencio.app" target="_blank" rel="noopener noreferrer" className="hover:text-[#CC5833] transition-colors">
              <span className="sr-only">Instagram</span>
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
