import Reveal from '@/components/site/Reveal'
import { HIGHLIGHTS } from '@/lib/content'

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
          {HIGHLIGHTS.map(({ value, label }, i) => (
            <Reveal key={label} delay={i * 0.06}>
              <div className="card-dark p-7 h-full flex flex-col justify-end min-h-[9.5rem] hover:border-gold/40 transition-colors">
                {value && (
                  <p className="mono text-4xl md:text-5xl font-bold text-gold glow-text mb-2 tabular-nums">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
