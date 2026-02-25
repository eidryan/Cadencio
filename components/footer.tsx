export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-4 py-10 md:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 md:flex-row md:justify-between">
        {/* Brand */}
        <span className="text-lg font-bold tracking-tight text-primary">cadencio</span>

        {/* Links */}
        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            Termos de Uso
          </a>
          <span aria-hidden="true" className="text-border">·</span>
          <a href="#" className="hover:text-foreground transition-colors">
            Política de Privacidade
          </a>
        </nav>

        {/* Contact + copyright */}
        <div className="flex flex-col items-center gap-1 text-center md:items-end md:text-right">
          <a
            href="mailto:contato@cadencio.app"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            contato@cadencio.app
          </a>
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Cadencio
          </p>
        </div>
      </div>
    </footer>
  )
}
