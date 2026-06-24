type BreadcrumbItem = {
  label: string
  href: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Trilha de navegação" className="mb-8 text-sm text-gray-500">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-300">/</span>}
            <a className="font-medium hover:text-brand-600" href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
