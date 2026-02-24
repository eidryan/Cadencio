export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-4 py-8 md:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <span className="text-lg font-bold text-primary">cadencio</span>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">
            Termos de Uso
          </a>
          <span aria-hidden="true">·</span>
          <a href="#" className="hover:text-foreground">
            Política de Privacidade
          </a>
        </nav>
        <a
          href="mailto:contato@cadencio.app"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          contato@cadencio.app
        </a>
      </div>
    </footer>
  )
}
