import { cn } from '@/lib/utils'

/**
 * Casca partilhada das tabelas do admin. O cabeçalho fica colado ao topo
 * durante o scroll — as listas crescem, e sem isto perde-se a referência das
 * colunas a meio de centenas de linhas.
 */
export function DataTable({
  headers,
  children,
}: {
  headers: string[]
  children: React.ReactNode
}) {
  return (
    <div className="border border-border rounded-sm overflow-hidden">
      <div className="overflow-x-auto max-h-[calc(100vh-20rem)]">
        <table className="w-full text-sm border-collapse">
          <thead className="sticky top-0 z-10 bg-bg-alt">
            <tr>
              {headers.map(h => (
                <th
                  key={h}
                  className="text-left py-3 px-4 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/70 font-normal border-b border-border whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  )
}

/** Linha com a marca dourada a nascer na aresta esquerda ao passar o rato. */
export function DataRow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <tr
      className={cn(
        'group border-b border-border/30 last:border-b-0',
        'transition-colors hover:bg-surface/40',
        'hover:shadow-[inset_2px_0_0_0_var(--gold)]',
        className,
      )}
    >
      {children}
    </tr>
  )
}
