import { Check, ArrowRight } from "lucide-react"

// Whatsapp link (could be exported from a central place)
const WHATSAPP = "https://wa.me/5521971715456?text=Ola%2C+quero+entrar+para+o+beta+do+Cadencio"

export function Pricing() {
    return (
        <section id="beta" data-section-name="Beta" className="py-32 lg:py-48 bg-surface-dark relative overflow-hidden">
            {/* Subtle organic noise overlay handled globally, but we can add some local light bursts */}
            <div
                className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-600/10 via-surface-dark to-surface-dark opacity-50 pointer-events-none"
            />

            {/* Teal abstract origami background element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10 pointer-events-none text-brand-400">
                <svg viewBox="0 0 100 100" fill="currentColor">
                    <polygon points="100,0 100,100 0,0" />
                    <polygon points="100,20 80,100 20,20" opacity="0.3" />
                </svg>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left: Copy */}
                    <div>
                        <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 bg-brand-500/10 border border-brand-500/20 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-accent-coral animate-pulse" />
                            <span className="text-[11px] font-bold text-accent-coral uppercase tracking-widest">
                                Acesso Exclusivo
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-brand-50 leading-tight tracking-tight mb-6">
                            O futuro da gestão é <span className="text-accent-mint italic pr-2">agora.</span>
                        </h2>

                        <p className="text-lg md:text-xl text-brand-50/70 leading-relaxed max-w-lg mb-8">
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
                                    <div className="w-6 h-6 rounded-sm bg-brand-600/30 flex items-center justify-center shrink-0 border border-brand-500/30">
                                        <Check size={14} className="text-accent-mint" />
                                    </div>
                                    <span className="text-brand-50/90 text-[15px]">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Pricing Card */}
                    <div className="relative w-full max-w-md mx-auto lg:ml-auto">
                        {/* Soft glow behind card */}
                        <div className="absolute inset-0 bg-brand-500/10 blur-[80px] rounded-full z-0" />

                        <div className="relative bg-white p-8 md:p-12 shadow-2xl flex flex-col card-paper-fold text-gray-900 border border-gray-100 z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Membro Fundador</h3>
                                    <p className="text-brand-600 text-sm font-bold uppercase tracking-wide">Early Access Program</p>
                                </div>
                                <div className="bg-accent-coral/10 text-accent-coral text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wide border border-accent-coral/20 transform rotate-2">
                                    100% OFF
                                </div>
                            </div>

                            <div className="my-8 flex items-baseline gap-2">
                                <span className="text-[64px] font-extrabold font-sans leading-none text-gray-900 tracking-tighter">R$0</span>
                                <span className="text-gray-400 font-semibold text-lg line-through decoration-accent-coral pt-2">R$97/mês</span>
                            </div>

                            <div className="mb-8 p-4 bg-brand-50 rounded-sm border-l-4 border-brand-500">
                                <p className="text-brand-700 font-semibold text-sm">
                                    Vagas limitadas para estúdios no Rio de Janeiro.
                                </p>
                            </div>

                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full btn-primary text-center flex justify-center !py-4"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Solicitar Acesso Beta
                                    <ArrowRight size={18} />
                                </span>
                            </a>

                            <p className="text-center text-gray-400 text-xs font-semibold mt-6 uppercase tracking-wider">
                                Sem necessidade de cartão de crédito.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
