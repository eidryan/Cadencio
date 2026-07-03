import { Play, Video } from "lucide-react"

import type { Demo } from "@/lib/organic-content"

export function VideoDemoPanel({ demo, framed = false }: { demo: Demo; framed?: boolean }) {
  return (
    <section className={`rounded-sm border border-gray-200 bg-white ${framed ? "p-5 shadow-xl" : "p-0"}`}>
      <div className="overflow-hidden rounded-sm bg-surface-dark">
        {demo.videoUrl ? (
          <video controls preload="metadata" poster={demo.thumbnail ?? undefined} className="aspect-video w-full bg-surface-dark">
            <source src={demo.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="flex aspect-video flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(36,174,181,0.22),_transparent_42%),#0C0A09] p-8 text-center text-brand-50">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-sm border border-brand-400/30 bg-brand-500/10">
              <Video className="text-accent-mint" size={28} />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent-mint">Demo em produção</p>
            <h3 className="mt-3 max-w-xl text-2xl font-bold tracking-tight">{demo.title}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-50/60">
              O espaço já está reservado para o vídeo gravado e editado da tela real do Cadencio.
            </p>
          </div>
        )}
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-700">Veja no Cadencio</p>
          <h3 className="mt-1 text-xl font-bold text-gray-900">{demo.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">{demo.description}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-brand-200 bg-brand-50 px-3 py-2 text-xs font-bold text-brand-700">
          {demo.videoUrl ? <Play size={13} /> : <Video size={13} />}
          {demo.durationLabel}
        </span>
      </div>
    </section>
  )
}
