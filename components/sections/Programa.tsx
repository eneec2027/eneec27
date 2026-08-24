'use client'

import { useState } from 'react'

import Reveal from '@/components/site/Reveal'
import { SCHEDULE_ANNOUNCED } from '@/lib/siteConfig'
import {
  PROGRAM,
  LEGEND_TYPES,
  TYPE_LABEL,
  TYPE_STYLE,
  GRID_ROWS,
  HOUR_MARKS,
  rowOf,
  spanOf,
  keyOf,
  type ProgramDay,
  type Session,
  type SessionType,
} from '@/lib/programa'

// A grelha está sempre inteira no ecrã: os quatro dias ao mesmo tempo, como no
// horário de origem. Não há filtros a esconder sessões — a interação é
// seleccionar um bloco para ver o detalhe e passar pela legenda para destacar
// um tipo. Nada do que se faz aqui tira conteúdo da vista.

const ROW_H = '2.5rem'

function TypeChip({ type }: { type: SessionType }) {
  return (
    <span className={`mono text-[0.68rem] tracking-widest uppercase px-2 py-0.5 border rounded-sm ${TYPE_STYLE[type]}`}>
      {TYPE_LABEL[type]}
    </span>
  )
}

/** Um bloco da grelha. */
function Block({
  day,
  session,
  selected,
  dimmed,
  onSelect,
}: {
  day: ProgramDay
  session: Session
  selected: boolean
  dimmed: boolean
  onSelect: () => void
}) {
  const dayIdx = PROGRAM.findIndex(d => d.key === day.key)
  const colStart = 2 + dayIdx * 2 + (session.track === 2 ? 1 : 0)
  const colSpan = session.track ? 1 : 2
  const rows = spanOf(session)

  // flex-col + justify-start no botão: um <button> centra o conteúdo na
  // vertical, o que fazia o título de um bloco de quatro horas flutuar a meio.
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      style={{
        gridColumn: `${colStart} / span ${colSpan}`,
        gridRow: `${rowOf(session.start)} / span ${rows}`,
        opacity: dimmed ? 0.28 : 1,
      }}
      className={`relative z-10 m-[2px] rounded-sm border text-left overflow-hidden transition-all duration-200 px-2.5 flex flex-col items-start justify-start gap-0.5 ${
        rows <= 1 ? 'py-1' : 'py-1.5'
      } ${TYPE_STYLE[session.type]} ${
        selected ? 'ring-1 ring-gold border-gold' : 'hover:border-gold/60'
      }`}
    >
      {rows <= 1 && colSpan === 1 ? (
        // Meia hora em meia coluna: só o título, em duas linhas se precisar.
        // A hora lê-se no eixo, e repeti-la aqui só rouba espaço ao que interessa.
        <span
          className={`text-[0.68rem] leading-[1.15] line-clamp-2 ${
            session.type === 'logistica' ? 'font-normal' : 'font-semibold'
          }`}
        >
          {session.title}
        </span>
      ) : rows <= 1 ? (
        // Meia hora à largura do dia: hora e título na mesma linha.
        <span className="flex items-baseline gap-1.5 w-full">
          <span className="mono text-[0.6rem] tabular-nums opacity-70 shrink-0">{session.start}</span>
          <span
            className={`text-xs leading-tight truncate ${
              session.type === 'logistica' ? 'font-normal' : 'font-semibold'
            }`}
          >
            {session.title}
          </span>
        </span>
      ) : (
        <>
          <span className="mono text-[0.6rem] tabular-nums opacity-70 block leading-tight">
            {session.start}{session.end ? `–${session.end}` : '→'}
          </span>
          <span
            className={`block text-xs leading-tight ${
              session.type === 'logistica' ? 'font-normal' : 'font-semibold'
            }`}
          >
            {session.title}
          </span>
        </>
      )}
      {rows >= 3 && session.note && (
        <span className="block text-[0.68rem] leading-tight opacity-70 mt-0.5">{session.note}</span>
      )}
      {rows >= 4 && session.children && (
        <span className="block text-[0.68rem] leading-tight opacity-70 mt-1.5 space-y-0.5">
          {session.children.map(c => (
            <span key={c.title} className="block truncate">
              {c.start} {c.title}
            </span>
          ))}
        </span>
      )}
    </button>
  )
}

/** O mesmo programa em lista, para ecrãs onde quatro colunas não cabem. */
function DayList({
  day,
  selectedKey,
  onSelect,
}: {
  day: ProgramDay
  selectedKey: string | null
  onSelect: (k: string) => void
}) {
  return (
    <div className="mb-10">
      <p className="mono text-xs tracking-widest uppercase text-foreground mb-4 pb-3 border-b border-gold-subtle">
        {day.weekday} <span className="text-gold">· {day.date}</span>
      </p>
      <div className="space-y-px">
        {day.sessions.map(s => {
          const k = keyOf(day.key, s)
          const open = selectedKey === k
          return (
            <button
              key={k}
              type="button"
              onClick={() => onSelect(k)}
              aria-expanded={open}
              className={`w-full text-left grid grid-cols-[4.2rem_1fr] gap-3 py-3 border-b border-gold-subtle transition-colors ${
                open ? 'bg-gold/5' : ''
              }`}
            >
              <span className="mono text-[0.7rem] tabular-nums text-muted-foreground pt-0.5">
                {s.start}
                {s.end && <span className="block opacity-60">{s.end}</span>}
              </span>
              <span>
                <span className="flex flex-wrap items-center gap-2">
                  <span className={`text-sm ${s.type === 'logistica' ? 'text-muted-foreground' : 'text-foreground font-semibold'}`}>
                    {s.title}
                  </span>
                  {s.type !== 'logistica' && <TypeChip type={s.type} />}
                  {s.track && (
                    <span className="mono text-[0.68rem] tracking-widest uppercase text-muted-foreground/70">
                      paralelo
                    </span>
                  )}
                </span>
                {s.note && (
                  <span className={`block text-xs mt-1 ${s.provisional ? 'text-muted-foreground/70 italic' : 'text-muted-foreground'}`}>
                    {s.note}
                  </span>
                )}
                {s.children && !open && (
                  <span className="block mono text-[0.7rem] tracking-widest uppercase text-gold mt-1.5">
                    ▾ {s.children.length} momentos
                  </span>
                )}
                {open && s.children && (
                  <span className="block mt-3 pl-3 border-l border-gold-subtle space-y-1.5">
                    {s.children.map(c => (
                      <span key={c.title} className="block text-xs">
                        <span className="mono text-muted-foreground tabular-nums mr-2">
                          {c.start}{c.end ? `–${c.end}` : ''}
                        </span>
                        <span className={c.type === 'logistica' ? 'text-muted-foreground' : 'text-foreground'}>
                          {c.title}
                        </span>
                        {c.note && <span className="text-muted-foreground/70 italic ml-2">{c.note}</span>}
                      </span>
                    ))}
                  </span>
                )}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Detail({ day, session }: { day: ProgramDay; session: Session }) {
  return (
    <div className="card-dark p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className="mono text-xs tracking-widest uppercase text-gold">
          {day.weekday} {day.date}
        </span>
        <span className="mono text-xs text-muted-foreground tabular-nums">
          {session.start}{session.end ? `–${session.end}` : ' — fim a anunciar'}
        </span>
        <TypeChip type={session.type} />
        {session.track && (
          <span className="mono text-[0.68rem] tracking-widest uppercase text-muted-foreground/70">
            em paralelo
          </span>
        )}
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">{session.title}</h3>

      {session.note && (
        <p className={`text-sm ${session.provisional ? 'text-muted-foreground/80 italic' : 'text-muted-foreground'}`}>
          {session.note}
        </p>
      )}

      {session.children && (
        <div className="mt-5 pl-4 border-l border-gold-subtle space-y-2.5">
          {session.children.map(c => (
            <div key={c.title} className="flex flex-wrap items-baseline gap-x-3">
              <span className="mono text-xs text-muted-foreground tabular-nums">
                {c.start}{c.end ? `–${c.end}` : ''}
              </span>
              <span className={`text-sm ${c.type === 'logistica' ? 'text-muted-foreground' : 'text-foreground'}`}>
                {c.title}
              </span>
              {c.note && <span className="text-xs text-muted-foreground/70 italic">{c.note}</span>}
            </div>
          ))}
        </div>
      )}

      {session.type !== 'logistica' && !session.children && (
        <p className="mono text-[0.7rem] tracking-widest uppercase text-muted-foreground/60 mt-5">
          Orador a anunciar
        </p>
      )}
    </div>
  )
}

export default function Programa() {
  const [selected, setSelected] = useState<string | null>(null)
  const [highlight, setHighlight] = useState<SessionType | null>(null)

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
        </div>
      </section>
    )
  }

  const found = PROGRAM.flatMap(d => d.sessions.map(s => ({ day: d, s })))
    .find(({ day, s }) => keyOf(day.key, s) === selected)

  const toggle = (k: string) => setSelected(cur => (cur === k ? null : k))

  return (
    <section id="programa" className="py-24 bg-background grid-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Grelha (ecrãs largos) ─────────────────────────────────────── */}
        <Reveal>
          <div className="hidden lg:block card-dark p-6 overflow-x-auto">
            {/* Cabeçalho dos dias */}
            <div
              className="grid gap-0 mb-2 min-w-[56rem]"
              style={{ gridTemplateColumns: `3.5rem repeat(${PROGRAM.length * 2}, minmax(0, 1fr))` }}
            >
              <div />
              {PROGRAM.map(d => (
                <div key={d.key} className="col-span-2 px-1 pb-3">
                  <p className="mono text-[0.62rem] tracking-widest uppercase text-muted-foreground">
                    {d.weekday}
                  </p>
                  <p className="font-semibold text-foreground">{d.date}</p>
                </div>
              ))}
            </div>

            <div
              className="grid relative min-w-[56rem]"
              style={{
                gridTemplateColumns: `3.5rem repeat(${PROGRAM.length * 2}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${GRID_ROWS}, ${ROW_H})`,
              }}
            >
              {/* Linhas de hora */}
              {HOUR_MARKS.map(h => (
                <div
                  key={h}
                  className="border-t border-gold-subtle"
                  style={{ gridColumn: '1 / -1', gridRow: `${rowOf(h)} / span 1` }}
                />
              ))}
              {/* Eixo do tempo */}
              {HOUR_MARKS.map(h => (
                <div
                  key={`l-${h}`}
                  className="mono text-[0.62rem] text-muted-foreground/70 tabular-nums pt-1 pr-3 text-right"
                  style={{ gridColumn: '1 / 2', gridRow: `${rowOf(h)} / span 2` }}
                >
                  {h}
                </div>
              ))}
              {/* Separadores entre dias */}
              {PROGRAM.map((d, i) =>
                i === 0 ? null : (
                  <div
                    key={`s-${d.key}`}
                    className="border-l border-gold-subtle"
                    style={{ gridColumn: `${2 + i * 2} / span 1`, gridRow: `1 / -1` }}
                  />
                ),
              )}

              {/* Sessões */}
              {PROGRAM.map(day =>
                day.sessions.map(s => {
                  const k = keyOf(day.key, s)
                  return (
                    <Block
                      key={k}
                      day={day}
                      session={s}
                      selected={selected === k}
                      dimmed={highlight !== null && s.type !== highlight}
                      onSelect={() => toggle(k)}
                    />
                  )
                }),
              )}
            </div>
          </div>
        </Reveal>

        {/* ── Legenda: passar por cima destaca, clicar fixa ──────────────── */}
        <Reveal delay={0.05}>
          <div className="hidden lg:flex flex-wrap items-center gap-x-5 gap-y-2 mt-5">
            {LEGEND_TYPES.map(t => (
              <button
                key={t}
                type="button"
                onMouseEnter={() => setHighlight(t)}
                onMouseLeave={() => setHighlight(h => (h === t ? null : h))}
                onFocus={() => setHighlight(t)}
                onBlur={() => setHighlight(null)}
                onClick={() => setHighlight(h => (h === t ? null : t))}
                className={`flex items-center gap-2 mono text-[0.62rem] tracking-widest uppercase transition-colors ${
                  highlight === t ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className={`w-3 h-3 rounded-[2px] border ${TYPE_STYLE[t]}`} />
                {TYPE_LABEL[t]}
              </button>
            ))}
          </div>
        </Reveal>

        {/* ── Detalhe da sessão seleccionada ─────────────────────────────── */}
        {found && (
          <div className="hidden lg:block mt-6">
            <Detail day={found.day} session={found.s} />
          </div>
        )}

        {/* ── Lista (ecrãs estreitos) ────────────────────────────────────── */}
        <div className="lg:hidden">
          {PROGRAM.map(day => (
            <DayList key={day.key} day={day} selectedKey={selected} onSelect={toggle} />
          ))}
        </div>

        <p className="text-xs text-muted-foreground/70 mono mt-8 leading-relaxed">
          Programa sujeito a ajustes. Os temas e oradores marcados como “a anunciar”
          são divulgados assim que estiverem confirmados.
        </p>
      </div>
    </section>
  )
}
