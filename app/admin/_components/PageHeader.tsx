interface PageHeaderProps {
  title: string
  /** Texto curto à direita do título — normalmente uma contagem. */
  aside?: React.ReactNode
}

export function PageHeader({ title, aside }: PageHeaderProps) {
  return (
    <header className="space-y-3">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold mb-1.5">
            ENEEC&rsquo;27 · Admin
          </p>
          <h1 className="font-heading text-2xl sm:text-[1.75rem] leading-tight text-foreground">
            {title}
          </h1>
        </div>
        {aside ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70 shrink-0 pb-1 tabular-nums">
            {aside}
          </p>
        ) : null}
      </div>
      {/* Régua: cheia à esquerda, esbatida à direita — a mesma marcação das
          folhas de desenho, e serve de âncora visual ao topo da página. */}
      <div className="h-px bg-gradient-to-r from-gold via-border to-transparent" />
    </header>
  )
}
