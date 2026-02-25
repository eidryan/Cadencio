import { ScrollAnimate } from "@/components/scroll-animate"

const WHATSAPP_LINK =
  "https://wa.me/55XXXXXXXXXXX?text=Oi%2C%20quero%20conhecer%20o%20Cadencio"

export function FinalCta() {
  return (
    <section
      className="relative overflow-hidden px-4 py-24 md:px-6 md:py-32"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, #0D5C5F 0%, #0D7377 30%, #074B4E 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(107,63,197,0.4) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <ScrollAnimate>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl md:font-light">
            Seu estúdio organizado começa hoje.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base text-white/70">
            Sem papel, sem planilha. Um sistema feito para quem administra estúdio.
          </p>
        </ScrollAnimate>

        <ScrollAnimate delay={200}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow-white inline-flex items-center justify-center rounded-lg bg-white px-10 py-4 text-base font-semibold text-primary hover:bg-white/95 transition-colors"
            >
              Quero experimentar
            </a>
            <p className="text-sm text-white/50">
              {"Beta gratuito · Sem cartão · Aceitando apenas 10 estúdios"}
            </p>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  )
}
