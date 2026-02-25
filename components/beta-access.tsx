import { Check } from "lucide-react"
import { ScrollAnimate } from "@/components/scroll-animate"

const WHATSAPP_LINK =
  "https://wa.me/55XXXXXXXXXXX?text=Oi%2C%20quero%20conhecer%20o%20Cadencio"

const perks = [
  "Acesso completo à plataforma",
  "Onboarding assistido pela nossa equipe",
  "Condições especiais quando lançarmos oficialmente",
]

export function BetaAccess() {
  return (
    <section className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-5xl">
        <ScrollAnimate className="text-center">
          <p className="eyebrow mb-3">Acesso antecipado</p>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Estamos em beta — e queremos seu estúdio.
          </h2>
        </ScrollAnimate>

        <ScrollAnimate delay={200} className="mx-auto mt-10 max-w-lg">
          {/* Gradient border wrapper */}
          <div className="gradient-border-wrapper">
            <div
              className="rounded-[calc(1rem-1.5px)] p-7"
              style={{ background: "#0A0F1A" }}
            >
              <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1">
                <div className="size-1.5 rounded-full bg-primary" />
                <span className="eyebrow text-[10px] text-primary">Exclusivo</span>
              </div>

              <h3 className="mt-3 text-lg font-bold text-white">
                Acesso antecipado gratuito
              </h3>

              <ul className="mt-5 flex flex-col gap-3">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <Check className="size-3 text-primary" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-white/80">{perk}</span>
                  </li>
                ))}
              </ul>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow mt-7 block w-full rounded-lg bg-primary py-3.5 text-center text-sm font-semibold text-primary-foreground hover:bg-[#0A5C5F] transition-colors"
              >
                Quero experimentar
              </a>
            </div>
          </div>
        </ScrollAnimate>

        <ScrollAnimate delay={300}>
          <p className="mx-auto mt-6 max-w-md text-center text-sm text-muted-foreground">
            Aceitando apenas 10 estúdios. Você usa, nos dá feedback, e ajuda a
            construir o melhor produto para estúdios.
          </p>
        </ScrollAnimate>
      </div>
    </section>
  )
}
