import { Check, ArrowRight } from "lucide-react"

// Whatsapp link (could be exported from a central place)
const WHATSAPP = "https://wa.me/5521971715456?text=Ola%2C+quero+entrar+para+o+beta+do+Cadencio"

export function Pricing() {
    return (
        <section id="investimento" className="py-32 lg:py-48 bg-[#1A1A1A] relative overflow-hidden">
            {/* Subtle organic noise overlay handled globally, but we can add some local light bursts */}
            <div
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#CC5833]/10 via-[#1A1A1A] to-[#1A1A1A] opacity-50"
            />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left: Copy */}
                    <div>
                        <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 bg-[#F2F0E9]/5 border border-[#F2F0E9]/10 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-[#CC5833] animate-pulse" />
                            <span className="text-[11px] font-bold text-[#F2F0E9] uppercase tracking-widest">
                                Acesso Exclusivo
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold text-[#F2F0E9] leading-tight tracking-tight mb-6">
                            O futuro da sua gestão é <span className="font-cormorant italic font-normal text-5xl md:text-6xl lg:text-7xl text-[#CC5833]">agora.</span>
                        </h2>

                        <p className="text-lg md:text-xl text-[#F2F0E9]/70 leading-relaxed font-medium mb-8 max-w-lg">
                            Estamos selecionando estúdios parceiros para moldar o futuro do Cadencio. Obtenha acesso antecipado a todos os recursos da ferramenta, e garanta sua licença vitalícia gratuita.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {[
                                "Setup guiado com a nossa equipe",
                                "Suporte prioritário via WhatsApp",
                                "Acesso a novas funcionalidades em primeira mão",
                                "Isenção total de mensalidades no futuro"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#CC5833]/20 flex items-center justify-center shrink-0">
                                        <Check size={14} className="text-[#CC5833]" />
                                    </div>
                                    <span className="text-[#F2F0E9]/90 font-medium text-[15px]">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Pricing Card */}
                    <div className="relative w-full max-w-md mx-auto lg:ml-auto">
                        {/* Soft glow behind card */}
                        <div className="absolute inset-0 bg-[#CC5833]/20 blur-[100px] rounded-full" />

                        <div className="relative bg-[#F2F0E9] rounded-[2rem] p-8 md:p-12 shadow-2xl flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-1">Membro Fundador</h3>
                                    <p className="text-[#78716C] text-sm font-medium">Early Access Program</p>
                                </div>
                                <div className="bg-[#1A1A1A]/5 text-[#1A1A1A] text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wide">
                                    100% OFF
                                </div>
                            </div>

                            <div className="my-8 flex items-baseline gap-2">
                                <span className="text-[64px] font-extrabold font-sans leading-none text-[#1A1A1A] tracking-tighter">R$0</span>
                                <span className="text-[#78716C] font-semibold text-lg line-through">R$97/mês</span>
                            </div>

                            <div className="mb-8 p-4 bg-[#CC5833]/10 rounded-xl border border-[#CC5833]/20">
                                <p className="text-[#CC5833] font-semibold text-sm text-center">
                                    Vagas limitadas para estúdios no Rio de Janeiro.
                                </p>
                            </div>

                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full relative group items-center justify-center px-8 py-5 text-[15px] font-bold text-[#F2F0E9] bg-[#1A1A1A] rounded-2xl overflow-hidden magnetic-nav shrink-0 shadow-xl flex gap-2"
                            >
                                <span className="relative z-10 transition-transform duration-300 group-hover:scale-105 flex items-center gap-2">
                                    Solicitar Acesso Beta
                                    <ArrowRight size={18} />
                                </span>
                                <div className="absolute inset-0 h-full w-full opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/10 z-0"></div>
                            </a>

                            <p className="text-center text-[#78716C] text-xs font-medium mt-6">
                                Sem necessidade de cartão de crédito.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
