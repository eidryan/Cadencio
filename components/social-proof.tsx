import { ScrollAnimate } from "@/components/scroll-animate"

export function SocialProof() {
  return (
    <section
      className="px-4 py-20 md:px-6 md:py-28"
      style={{ background: "#FCF8F5" }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <ScrollAnimate>
          <p className="eyebrow mb-8">O que dizem nossos primeiros usuários</p>
        </ScrollAnimate>

        <ScrollAnimate delay={200}>
          <div className="relative mx-auto max-w-2xl">
            {/* Decorative quotation mark */}
            <div
              className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none text-[96px] leading-none text-primary/10"
              aria-hidden="true"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {'\u201C'}
            </div>

            <div className="relative rounded-2xl border border-[#E8E0D8] bg-white/70 px-8 py-10 shadow-sm">
              <blockquote
                className="text-base leading-relaxed text-foreground md:text-lg md:leading-relaxed"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                O Cadencio organizou o que a gente nunca conseguiu organizar em
                anos. Hoje sei exatamente quem faltou e quem está em risco de
                cancelar.
              </blockquote>

              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  C
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">Claudia</p>
                  <p className="text-xs text-muted-foreground">
                    Gestora — Vertico Kiness, Rio de Janeiro
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimate>

        <ScrollAnimate delay={300}>
          <p className="mt-8 text-sm text-muted-foreground">
            Usado por estúdios no Rio de Janeiro
          </p>
        </ScrollAnimate>
      </div>
    </section>
  )
}
