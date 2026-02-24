import { Check } from "lucide-react"

const WHATSAPP_LINK =
  "https://wa.me/55XXXXXXXXXXX?text=Oi%2C%20quero%20conhecer%20o%20Cadencio"

const perks = [
  "Acesso completo à plataforma",
  "Onboarding assistido pela nossa equipe",
  "Condições especiais quando lançarmos oficialmente",
]

export function BetaAccess() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
          Estamos em beta — e queremos seu estúdio.
        </h2>
        <div className="mx-auto mt-10 max-w-lg rounded-xl border border-border border-l-primary bg-card p-6 [border-left-width:4px]">
          <h3 className="text-lg font-bold text-foreground">
            Acesso antecipado gratuito
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-2">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="text-sm text-foreground">{perk}</span>
              </li>
            ))}
          </ul>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block w-full rounded-lg bg-primary py-3 text-center text-sm font-semibold text-primary-foreground hover:bg-[#0A5C5F]"
          >
            Quero experimentar
          </a>
        </div>
        <p className="mx-auto mt-6 max-w-md text-center text-sm text-muted-foreground">
          Aceitando apenas 10 estúdios. Você usa, nos dá feedback, e ajuda a
          construir o melhor produto para estúdios.
        </p>
      </div>
    </section>
  )
}
