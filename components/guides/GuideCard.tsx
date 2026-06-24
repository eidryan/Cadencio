import type { Guide } from "@/lib/organic-content"

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <a href={`/guias/${guide.slug}`} className="card-paper-fold group block p-7 transition-transform duration-300 hover:-translate-y-1">
      <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-brand-700">{guide.readingTime}</p>
      <h3 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 group-hover:text-brand-700">{guide.title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-gray-600">{guide.description}</p>
      <span className="mt-6 inline-block text-sm font-bold text-brand-700">Ler guia</span>
    </a>
  )
}
