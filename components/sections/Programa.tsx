'use client'

import { useState } from 'react'

type EventType = 'conferencia' | 'workshop' | 'visita' | 'social' | 'todos'

interface ScheduleEvent {
  time: string
  title: string
  type: Exclude<EventType, 'todos'>
  location?: string
}

interface Day {
  label: string
  date: string
  events: ScheduleEvent[]
}

// O programa ainda não existe. Pôr a true assim que a NEBEC fechar as sessões
// e preencher DAYS — a timeline interactiva abaixo volta a aparecer sozinha.
const SCHEDULE_ANNOUNCED = false

// Sem sessões confirmadas. Não inventar horas, salas nem títulos: até haver
// programa real, a secção mostra apenas o estado "A anunciar".
const DAYS: Day[] = [
  { label: 'Dia 1', date: '', events: [] },
  { label: 'Dia 2', date: '', events: [] },
  { label: 'Dia 3', date: '', events: [] },
  { label: 'Dia 4', date: '', events: [] },
]

const FILTERS: { label: string; value: EventType }[] = [
  { label: 'Todos', value: 'todos' },
  { label: 'Conferências', value: 'conferencia' },
  { label: 'Workshops', value: 'workshop' },
  { label: 'Visitas', value: 'visita' },
  { label: 'Social', value: 'social' },
]

const TYPE_COLORS: Record<Exclude<EventType, 'todos'>, string> = {
  conferencia: 'text-gold border-gold/30 bg-gold/5',
  workshop:    'text-cyan border-cyan/30 bg-cyan/5',
  visita:      'text-emerald-400 border-emerald-400/30 bg-emerald-400/5',
  social:      'text-purple-400 border-purple-400/30 bg-purple-400/5',
}

const TYPE_DOT: Record<Exclude<EventType, 'todos'>, string> = {
  conferencia: 'bg-gold',
  workshop:    'bg-cyan',
  visita:      'bg-emerald-400',
  social:      'bg-purple-400',
}

export default function Programa() {
  const [activeDay, setActiveDay] = useState(0)
  const [filter, setFilter] = useState<EventType>('todos')

  const visibleEvents = DAYS[activeDay].events.filter(
    e => filter === 'todos' || e.type === filter
  )

  return (
    <section id="programa" className="py-28 bg-background grid-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="section-label mb-4">Programa</p>
          <h2 className="heading-lg text-foreground">
            4 dias de engenharia
          </h2>
        </div>

        {!SCHEDULE_ANNOUNCED && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DAYS.map((day, i) => (
                <div key={i} className="card-dark p-6 flex flex-col">
                  <div className="w-16 h-16 rounded-sm bg-surface border border-gold-subtle flex items-center justify-center mb-4">
                    <span className="mono text-gold/30 text-lg font-bold">?</span>
                  </div>
                  <p className="text-xs text-gold mono mb-1">{day.label}</p>
                  <p className="font-semibold text-muted-foreground/50 italic">
                    A anunciar
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mono mt-6">
              Programa a confirmar. Acompanhe as nossas redes sociais para anúncios.
            </p>
          </>
        )}

        {SCHEDULE_ANNOUNCED && (
          <>
        {/* Day selector */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {DAYS.map((day, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`px-5 py-2.5 rounded-sm text-sm font-medium transition-all mono ${
                activeDay === i
                  ? 'bg-gold text-primary-foreground font-semibold'
                  : 'border border-gold-subtle text-muted-foreground hover:border-gold/40 hover:text-foreground'
              }`}
            >
              {day.date
                ? <><span className="hidden sm:inline">{day.label} — </span>{day.date}</>
                : day.label}
            </button>
          ))}
        </div>

        {/* Type filter */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-1.5 rounded-sm text-xs tracking-wider transition-all mono border ${
                filter === value
                  ? 'border-gold text-gold'
                  : 'border-gold-subtle text-muted-foreground hover:border-gold/30'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[4.5rem] top-0 bottom-0 w-px bg-gold/10" />

          <div className="space-y-2">
            {visibleEvents.length === 0 && (
              <p className="text-muted-foreground text-sm py-8 pl-24">
                Sem eventos nesta categoria para este dia.
              </p>
            )}
            {visibleEvents.map((event, i) => (
              <div key={i} className="flex items-start gap-6 group">
                <span className="mono text-xs text-muted-foreground w-16 pt-3.5 text-right shrink-0">
                  {event.time}
                </span>
                <div className="relative flex items-start gap-4 flex-1">
                  <div className={`w-2 h-2 rounded-full mt-3.5 shrink-0 ${TYPE_DOT[event.type]}`} />
                  <div className={`flex-1 card-dark p-4 group-hover:border-gold/30 transition-colors`}>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <p className="text-sm font-medium text-foreground">{event.title}</p>
                        {event.location && (
                          <p className="text-xs text-muted-foreground mono mt-1">{event.location}</p>
                        )}
                      </div>
                      <span className={`text-xs mono px-2.5 py-1 rounded-sm border shrink-0 ${TYPE_COLORS[event.type]}`}>
                        {event.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mono mt-10">
          * Programa sujeito a alterações. Versão atualizada disponível nas semanas antes do evento.
        </p>
          </>
        )}
      </div>
    </section>
  )
}
