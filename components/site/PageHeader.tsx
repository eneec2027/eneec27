import { getDict, type Lang } from '@/lib/i18n'

// Cabeçalho comum às páginas interiores. Mantém a mesma âncora visual em todas:
// etiqueta, título e a data do evento sempre presente, como o briefing pede.
export default function PageHeader({
  lang,
  label,
  title,
  intro,
}: {
  lang: Lang
  label: string
  title: string
  intro?: string
}) {
  const d = getDict(lang).event

  return (
    <header className="relative border-b border-gold-subtle grid-bg">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <p className="section-label mb-4">{label}</p>
        <h1 className="heading-xl text-foreground max-w-4xl">{title}</h1>
        {intro && (
          <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl mt-6">{intro}</p>
        )}
        <p className="mono text-xs text-gold/80 tracking-widest uppercase mt-8">
          {d.dates} · {d.venue}
        </p>
      </div>
    </header>
  )
}
