import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: number
  /** O cartão do total — maior e a dourado. */
  primary?: boolean
  className?: string
}

export function StatCard({ label, value, primary = false, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'relative bg-surface/60 border border-border rounded-sm p-4 overflow-hidden',
        'transition-colors hover:border-gold/30',
        className,
      )}
    >
      {/* Marca de canto — a mira das peças desenhadas, a indicar o vértice. */}
      <span aria-hidden className="absolute top-0 right-0 w-4 h-4">
        <span className="absolute top-0 right-0 w-4 h-px bg-border" />
        <span className="absolute top-0 right-0 w-px h-4 bg-border" />
      </span>

      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground mb-2 leading-tight">
        {label}
      </p>
      <p
        className={cn(
          'font-mono font-bold tabular-nums leading-none',
          primary ? 'text-3xl text-gold' : 'text-xl text-foreground',
        )}
      >
        {value}
      </p>
    </div>
  )
}
