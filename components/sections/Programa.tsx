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

const DAYS: Day[] = [
  {
    label: 'Dia 1', date: 'Seg, 15 Mar',
    events: [
      { time: '14:00', title: 'Receção e acreditação', type: 'social' },
      { time: '16:00', title: 'Cerimónia de abertura', type: 'conferencia', location: 'Auditório Principal' },
      { time: '17:30', title: 'Conferência inaugural — "Aveiro 2050"', type: 'conferencia', location: 'Auditório Principal' },
      { time: '20:00', title: 'Jantar de boas-vindas', type: 'social' },
    ],
  },
  {
    label: 'Dia 2', date: 'Ter, 16 Mar',
    events: [
      { time: '09:30', title: 'Workshop: BIM para iniciantes', type: 'workshop', location: 'Sala A' },
      { time: '09:30', title: 'Workshop: Patologia do betão', type: 'workshop', location: 'Sala B' },
      { time: '11:30', title: 'Conferência: Infraestruturas do futuro', type: 'conferencia', location: 'Auditório' },
      { time: '14:30', title: 'Visita técnica — Porto de Aveiro', type: 'visita' },
      { time: '20:30', title: 'Festa ENEEC\'27', type: 'social' },
    ],
  },
  {
    label: 'Dia 3', date: 'Qua, 17 Mar',
    events: [
      { time: '09:30', title: 'Feira de Empresas (manhã)', type: 'social', location: 'Pavilhão Central' },
      { time: '11:00', title: 'Workshop: Geotecnia avançada', type: 'workshop', location: 'Sala A' },
      { time: '14:00', title: 'Conferência: Sustentabilidade na construção', type: 'conferencia', location: 'Auditório' },
      { time: '15:30', title: 'Feira de Empresas (tarde)', type: 'social', location: 'Pavilhão Central' },
    ],
  },
  {
    label: 'Dia 4', date: 'Qui, 18 Mar',
    events: [
      { time: '10:00', title: 'Mesa redonda: Mercado de trabalho em EC', type: 'conferencia', location: 'Auditório' },
      { time: '12:00', title: 'Sessão de encerramento', type: 'conferencia', location: 'Auditório' },
      { time: '13:30', title: 'Almoço de encerramento', type: 'social' },
    ],
  },
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
              <span className="hidden sm:inline">{day.label} — </span>{day.date}
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
      </div>
    </section>
  )
}
