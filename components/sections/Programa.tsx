'use client'

import { useState } from 'react'

import Reveal from '@/components/site/Reveal'
import { SCHEDULE_ANNOUNCED } from '@/lib/siteConfig'
import {
  PROGRAM,
  FILTER_TYPES,
  TYPE_LABEL,
  TYPE_STYLE,
  type Session,
  type SessionType,
} from '@/lib/programa'

type Filter = SessionType | 'todos'

function TypeChip({ type }: { type: SessionType }) {
  return (
    <span className={`mono text-[0.62rem] tracking-widest uppercase px-2 py-1 border rounded-sm ${TYPE_STYLE[type]}`}>
      {TYPE_LABEL[type]}
    </span>
  )
}

function SessionRow({ session }: { session: Session }) {
  const { start, end, title, type, note, provisional, parallel, children } = session

  return (
    <div className="grid grid-cols-[4.5rem_1fr] sm:grid-cols-[7rem_1fr] gap-4 sm:gap-8 py-5 border-b border-gold-subtle last:border-b-0">
      <div className="mono text-xs pt-1 tabular-nums">
        <span className="text-foreground">{start}</span>
        {end && <span className="text-muted-foreground/60 block sm:inline sm:ml-1">–{end}</span>}
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-1">
          <h3 className={`font-semibold ${type === 'logistica' ? 'text-muted-foreground' : 'text-foreground'}`}>
            {title}
          </h3>
          {type !== 'logistica' && <TypeChip type={type} />}
          {parallel && (
            <span className="mono text-[0.62rem] tracking-widest uppercase text-muted-foreground/70">
              em paralelo
            </span>
          )}
        </div>

        {note && (
          <p className={`text-sm ${provisional ? 'text-muted-foreground/70 italic' : 'text-muted-foreground'}`}>
            {note}
          </p>
        )}

        {children && (
          <div className="mt-4 pl-4 border-l border-gold-subtle space-y-3">
            {children.map(child => (
              <div key={child.start + child.title} className="flex flex-wrap items-baseline gap-x-3">
                <span className="mono text-xs text-muted-foreground tabular-nums">
                  {child.start}{child.end ? `–${child.end}` : ''}
                </span>
                <span className={`text-sm ${child.type === 'logistica' ? 'text-muted-foreground' : 'text-foreground'}`}>
                  {child.title}
                </span>
                {child.note && (
                  <span className="text-xs text-muted-foreground/70 italic">{child.note}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Programa() {
  const [dayIdx, setDayIdx] = useState(0)
  const [filter, setFilter] = useState<Filter>('todos')

  if (!SCHEDULE_ANNOUNCED) {
    return (
      <section id="programa" className="py-24 bg-background grid-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PROGRAM.map(day => (
              <div key={day.key} className="card-dark p-6 flex flex-col">
                <div className="w-16 h-16 rounded-sm bg-surface border border-gold-subtle flex items-center justify-center mb-4">
                  <span className="mono text-gold/30 text-lg font-bold">?</span>
                </div>
                <p className="text-xs text-gold mono mb-1">{day.weekday}</p>
                <p className="font-semibold text-muted-foreground/50 italic">A anunciar</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mono mt-6">
            Programa a confirmar. Acompanhe as nossas redes sociais para anúncios.
          </p>
        </div>
      </section>
    )
  }

  const day = PROGRAM[dayIdx]
  const visible = day.sessions.filter(s => filter === 'todos' || s.type === filter)

  return (
    <section id="programa" className="py-24 bg-background grid-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Dias */}
        <Reveal>
          <div className="flex gap-2 flex-wrap mb-6">
            {PROGRAM.map((d, i) => (
              <button
                key={d.key}
                onClick={() => setDayIdx(i)}
                aria-pressed={dayIdx === i}
                className={`px-5 py-3 rounded-sm text-sm transition-all mono text-left ${
                  dayIdx === i
                    ? 'bg-gold text-primary-foreground font-semibold'
                    : 'border border-gold-subtle text-muted-foreground hover:border-gold/40 hover:text-foreground'
                }`}
              >
                <span className="block text-xs tracking-widest uppercase opacity-80">{d.weekday}</span>
                <span className="block font-semibold">{d.date}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Tipos */}
        <Reveal delay={0.05}>
          <div className="flex gap-2 flex-wrap mb-10">
            {(['todos', ...FILTER_TYPES] as Filter[]).map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                aria-pressed={filter === t}
                className={`mono text-[0.68rem] tracking-widest uppercase px-3 py-1.5 border rounded-sm transition-colors ${
                  filter === t
                    ? 'border-gold text-gold'
                    : 'border-gold-subtle text-muted-foreground hover:border-gold/40 hover:text-foreground'
                }`}
              >
                {t === 'todos' ? 'Tudo' : TYPE_LABEL[t]}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card-dark px-6 sm:px-8">
            {visible.length > 0 ? (
              visible.map(s => <SessionRow key={s.start + s.title} session={s} />)
            ) : (
              <p className="py-10 text-sm text-muted-foreground">
                Nada deste tipo em {day.weekday.toLowerCase()}.
              </p>
            )}
          </div>

          <p className="text-xs text-muted-foreground/70 mono mt-6 leading-relaxed">
            Programa sujeito a ajustes. Os temas e oradores marcados como “a anunciar”
            são divulgados assim que estiverem confirmados.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
