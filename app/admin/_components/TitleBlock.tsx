'use client'

import { usePathname } from 'next/navigation'
import { sectionLabelFor } from './adminNav'

/**
 * Legenda — a caixa que toda a peça desenhada de engenharia leva ao canto,
 * com o projecto, a folha e a data. Aqui carrega os mesmos factos do evento
 * que o site público serve (lib/siteConfig), para quem está a ler
 * candidaturas ter à vista o que está a organizar.
 */
export function TitleBlock({
  edition,
  month,
  venue,
}: {
  edition: string
  month: string
  venue: string
}) {
  const sheet = sectionLabelFor(usePathname())

  const rows: [string, string][] = [
    ['Folha', sheet],
    ['Edição', edition],
    ['Data', month],
    ['Local', venue],
  ]

  return (
    <dl className="border border-border-dim rounded-sm divide-y divide-[color:var(--border-dim)]">
      {rows.map(([key, value]) => (
        <div key={key} className="flex items-baseline gap-2 px-2.5 py-1.5">
          <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/50 w-[3.2rem] shrink-0">
            {key}
          </dt>
          <dd className="font-mono text-[9px] text-muted-foreground/85 truncate" title={value}>
            {value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
