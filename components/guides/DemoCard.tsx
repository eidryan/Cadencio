import { Play, Video } from "lucide-react"

import type { Demo } from "@/lib/organic-content"

export function DemoCard({ demo }: { demo: Demo }) {
  const hasVideo = demo.videoUrl !== null

  return (
    <a href={`/demos/${demo.slug}`} className="group block overflow-hidden rounded-sm border border-gray-200 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1">
      <div className="overflow-hidden bg-surface-dark">
        {hasVideo ? (
          <div className="relative aspect-video bg-surface-dark">
            {demo.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={demo.thumbnail} alt={demo.title} className="h-full w-full object-cover" />
            ) : null}
            <div className="absolute inset-0 flex items-center justify-center bg-black/25">
              <div className="flex h-14 w-14 items-center justify-center rounded-sm border border-brand-400/30 bg-brand-500/60 backdrop-blur-sm transition-transform group-hover:scale-105">
                <Play className="ml-0.5 text-white" size={24} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex aspect-video flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(36,174,181,0.22),_transparent_42%),#0C0A09] p-8 text-center text-brand-50">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-sm border border-brand-400/30 bg-brand-500/10">
              <Video className="text-accent-mint" size={24} />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-accent-mint">Vídeo em breve</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-brand-50/70">
              Esta demonstração ainda não tem gravação. Duração estimada: {demo.durationLabel}.
            </p>
          </div>
        )}
      </div>
      <div className="p-6">
        <p className="text-[11px] font-bold uppercase tracking-widest text-brand-700">
          {demo.relatedFeature} · {demo.durationLabel}
        </p>
        <h3 className="mt-3 text-xl font-bold leading-tight text-gray-900">{demo.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{demo.description}</p>
      </div>
    </a>
  )
}
