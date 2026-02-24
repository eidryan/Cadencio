const WHATSAPP_LINK =
  "https://wa.me/55XXXXXXXXXXX?text=Oi%2C%20quero%20conhecer%20o%20Cadencio"

export function FinalCta() {
  return (
    <section className="bg-primary px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
          Seu estúdio organizado começa hoje.
        </h2>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-lg bg-card px-8 py-3 text-base font-semibold text-primary hover:bg-card/90"
        >
          Quero experimentar
        </a>
        <p className="mt-4 text-sm text-primary-foreground/70">
          {"Beta gratuito · Sem cartão · Aceitando apenas 10 estúdios"}
        </p>
      </div>
    </section>
  )
}
