"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export function Philosophy() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background parallax effect
            gsap.to(".bg-parallax", {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            })

            // Word-by-word reveal
            const words = gsap.utils.toArray(".reveal-word")
            gsap.fromTo(words,
                { opacity: 0.1, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.05,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".manifesto-text",
                        start: "top 80%",
                        end: "bottom 50%",
                        scrub: 0.5,
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    // Split text helper to wrap words for animation
    const splitText = (text: string) => {
        return text.split(" ").map((word, i) => (
            <span key={i} className="reveal-word inline-block mr-[0.25em]">{word}</span>
        ))
    }

    return (
        <section
            ref={sectionRef}
            id="filosofia"
            className="relative py-32 md:py-48 bg-surface-dark text-gray-100 overflow-hidden"
        >
            {/* Dark abstract background texture */}
            <div
                className="bg-parallax absolute inset-0 z-0 bg-cover bg-center opacity-10 mix-blend-overlay"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')",
                    height: "120%" // extra height for parallax
                }}
            />
            {/* Heavy gradient to ensure text readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-surface-dark via-surface-dark/80 to-transparent" />

            <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
                <div className="inline-flex items-center gap-2 mb-12">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-mint" />
                    <span className="text-xs font-bold tracking-widest text-accent-mint uppercase">
                        O Manifesto
                    </span>
                </div>

                <div className="manifesto-text text-3xl md:text-5xl lg:text-[64px] font-sans font-bold leading-[1.15] tracking-tight">
                    <p className="mb-12 text-gray-400">
                        {splitText("A maioria dos softwares fitness foca em: gráficos complexos, automação de marketing inútil e portais confusos para o aluno.")}
                    </p>
                    <p className="text-gray-100">
                        {splitText("Nós focamos em:")} <span className="text-4xl md:text-6xl lg:text-[76px] text-accent-mint reveal-word tracking-tight">precisão absoluta </span>{splitText("no controle operacional do seu estúdio.")}
                    </p>
                </div>
            </div>
        </section>
    )
}
