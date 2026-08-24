import Reveal from '@/components/site/Reveal'
import { HIGHLIGHTS, type HighlightIcon } from '@/lib/content'
import {
  IconEstudantes,
  IconDias,
  IconWorkshops,
  IconVisitas,
  IconFestas,
} from '@/components/site/Icons'

const ICONS: Record<HighlightIcon, (p: { size?: number; className?: string }) => React.ReactElement> = {
  estudantes: IconEstudantes,
  dias: IconDias,
  workshops: IconWorkshops,
  visitas: IconVisitas,
  festas: IconFestas,
}

// Bloco 3 do briefing: razões para vir. Dois números e três tipos de momento —
// sem inventar quantidades para os que o briefing não quantifica.
export default function Numeros() {
  return (
    <section className="py-28 bg-background grid-bg">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="section-label mb-12">Razões para vir</p>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {HIGHLIGHTS.map(({ value, label, icon }, i) => {
            const Icon = ICONS[icon]
            return (
              <Reveal
                key={label}
                delay={i * 0.06}
                className={i === HIGHLIGHTS.length - 1 ? 'col-span-2 lg:col-span-1' : ''}
              >
                <div className="card-dark p-6 sm:p-7 h-full flex flex-col min-h-[10.5rem] group hover:border-gold/40 transition-colors">
                  <Icon size={26} className="text-gold/60 group-hover:text-gold transition-colors" />

                  <div className="mt-auto pt-5">
                    {value && (
                      <p className="mono text-4xl md:text-5xl font-bold text-gold glow-text mb-1 tabular-nums leading-none">
                        {value}
                      </p>
                    )}
                    <p
                      className={`text-sm leading-snug ${
                        value ? 'text-muted-foreground' : 'text-foreground font-semibold'
                      }`}
                    >
                      {label}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
