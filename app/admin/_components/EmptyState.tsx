interface EmptyStateProps {
  title: string
  /** O que fazer a seguir, ou onde é que os dados vão aparecer. */
  hint: React.ReactNode
}

export function EmptyState({ title, hint }: EmptyStateProps) {
  return (
    <div className="relative border border-dashed border-border rounded-sm px-6 py-14 text-center">
      <span aria-hidden className="bp-crosshair left-3 top-3" />
      <span aria-hidden className="bp-crosshair right-3 bottom-3" />
      <p className="font-heading text-base text-foreground/80">{title}</p>
      <p className="font-mono text-[11px] text-muted-foreground/70 mt-2 leading-relaxed max-w-sm mx-auto">
        {hint}
      </p>
    </div>
  )
}
