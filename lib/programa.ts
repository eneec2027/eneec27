// Programa dos quatro dias, transcrito de `horario_eneec2027.xlsx` (NEBEC,
// recebido 2026-08-24). O ficheiro é a fonte; não editar horas aqui sem o
// actualizar do outro lado.
//
// O que ficou deliberadamente de fora:
//
// • Os nomes dos oradores. A folha "Palestras" do ficheiro lista convidados
//   com colunas de email e telemóvel por preencher — é uma folha de trabalho
//   de convites, não uma lista de confirmações. Publicar nomes por confirmar é
//   exactamente o erro que este projecto já cometeu com 17 sessões inventadas.
// • Os contactos desses convidados, que são dados pessoais.
//
// Os títulos que no ficheiro são provisórios ("Palestra Investigação #1",
// "Ted Talk- Influencer") entram com `provisional: true` e o site diz que o
// tema ou o convidado será anunciado, em vez de fingir um título final.

export type SessionType =
  | 'sessao'
  | 'palestra'
  | 'feira'
  | 'visita'
  | 'social'
  | 'logistica'

export interface Session {
  start: string
  /** Fim, quando o ficheiro o define. */
  end?: string
  title: string
  type: SessionType
  /**
   * Pista dentro do dia. Cada dia tem duas colunas na grelha, como no ficheiro
   * da NEBEC: sem `track`, a sessão ocupa a largura toda do dia; com 1 ou 2,
   * fica lado a lado com o que decorre em paralelo.
   */
  track?: 1 | 2
  /** Título de trabalho no ficheiro da NEBEC — o site diz que falta anunciar. */
  provisional?: boolean
  note?: string
  /** Sub-programa de um bloco (a Sessão de Abertura de quarta-feira). */
  children?: Session[]
}

export interface ProgramDay {
  key: string
  weekday: string
  date: string
  sessions: Session[]
}

export const TYPE_LABEL: Record<SessionType, string> = {
  sessao: 'Sessão',
  palestra: 'Palestra',
  feira: 'Feira de Empresas',
  visita: 'Visita',
  social: 'Convívio',
  logistica: 'Logística',
}

export const TYPE_STYLE: Record<SessionType, string> = {
  sessao:    'text-gold border-gold/30 bg-gold/5',
  palestra:  'text-cyan-500 dark:text-cyan-300 border-cyan-500/30 bg-cyan-500/5',
  feira:     'text-blue-600 dark:text-blue-300 border-blue-500/30 bg-blue-500/5',
  visita:    'text-emerald-700 dark:text-emerald-300 border-emerald-500/30 bg-emerald-500/5',
  social:    'text-purple-700 dark:text-purple-300 border-purple-500/30 bg-purple-500/5',
  logistica: 'text-muted-foreground border-gold-subtle bg-transparent',
}

export const PROGRAM: ProgramDay[] = [
  {
    key: 'qua',
    weekday: 'Quarta-feira',
    date: '7 de abril',
    sessions: [
      { start: '09:00', end: '12:30', title: 'Receção', type: 'logistica' },
      { start: '12:30', end: '14:00', title: 'Almoço', type: 'logistica' },
      {
        start: '14:00', end: '16:00',
        title: 'Visitas',
        note: 'DECivil · Universidade de Aveiro · cidade',
        type: 'visita',
      },
      {
        start: '16:00', end: '19:30',
        title: 'Sessão de Abertura',
        type: 'sessao',
        children: [
          { start: '16:00', end: '18:00', title: 'Sessão de abertura institucional', type: 'sessao' },
          { start: '18:00', end: '18:30', title: 'Coffee break', type: 'logistica' },
          { start: '18:30', end: '19:00', title: 'Ted Talk', type: 'palestra', provisional: true, note: 'convidado a anunciar' },
          { start: '19:00', end: '19:30', title: 'Sessão do Main Sponsor', type: 'sessao' },
        ],
      },
      { start: '19:30', end: '21:30', title: 'Sunset', note: 'Bar do Estudante', type: 'social' },
    ],
  },
  {
    key: 'qui',
    weekday: 'Quinta-feira',
    date: '8 de abril',
    sessions: [
      { start: '08:30', end: '09:00', title: 'Receção', type: 'logistica' },
      { start: '09:00', end: '09:30', title: 'Sessão de abertura', type: 'sessao' },
      { start: '09:30', end: '10:30', title: 'Palestra Mola', type: 'palestra' },
      { start: '10:30', end: '11:30', title: 'Linha de Alta Velocidade', type: 'palestra' },
      { start: '11:30', end: '16:00', title: 'Feira de Empresas', type: 'feira' },
      { start: '16:00', end: '17:00', title: 'Company Spotlights', type: 'sessao' },
      { start: '17:00', end: '18:30', title: 'Roundtable — Habitação', type: 'palestra' },
      { start: '18:30', end: '20:00', title: 'Alojamento', type: 'logistica' },
      { start: '20:00', end: '21:00', title: 'Jantar', type: 'logistica' },
      { start: '21:00', title: 'After', type: 'social' },
    ],
  },
  {
    key: 'sex',
    weekday: 'Sexta-feira',
    date: '9 de abril',
    sessions: [
      { start: '08:30', end: '09:00', title: 'Receção', type: 'logistica' },
      { start: '09:00', end: '09:30', title: 'Sessão de abertura', type: 'sessao' },
      { start: '09:30', end: '13:00', title: 'Feira de Empresas', type: 'feira', track: 2 },
      { start: '09:30', end: '10:00', title: 'Palestra de investigação', type: 'palestra', track: 1, provisional: true, note: 'tema a anunciar' },
      { start: '10:00', end: '10:30', title: 'Coffee break', type: 'logistica', track: 1 },
      { start: '10:30', end: '11:00', title: 'Palestra de investigação', type: 'palestra', track: 1, provisional: true, note: 'tema a anunciar' },
      { start: '11:00', end: '11:30', title: 'Coffee break', type: 'logistica', track: 1 },
      { start: '11:30', end: '12:00', title: 'Palestra de investigação', type: 'palestra', track: 1, provisional: true, note: 'tema a anunciar' },
      { start: '12:00', end: '12:30', title: 'Coffee break', type: 'logistica', track: 1 },
      { start: '12:30', end: '13:00', title: 'Painel dos oradores', type: 'sessao', track: 1 },
      { start: '13:00', end: '13:30', title: 'Almoço', type: 'logistica' },
      { start: '13:30', end: '18:30', title: 'Visitas técnicas', type: 'visita' },
      { start: '18:30', end: '20:00', title: 'Alojamento', type: 'logistica' },
      { start: '20:00', end: '21:30', title: 'Jantar de encerramento', type: 'logistica' },
    ],
  },
  {
    key: 'sab',
    weekday: 'Sábado',
    date: '10 de abril',
    sessions: [
      { start: '08:30', end: '13:00', title: 'Atividade lúdica', type: 'social' },
      { start: '13:00', title: 'Almoço de despedida', type: 'logistica' },
    ],
  },
]

// Ordem da legenda.
export const LEGEND_TYPES: SessionType[] = ['sessao', 'palestra', 'feira', 'visita', 'social', 'logistica']

// ── Geometria da grelha ───────────────────────────────────────────────────
// A grelha começa e acaba onde o programa começa e acaba, com meia hora de
// folga em baixo para o After de quinta, que no ficheiro não tem fim.
export const GRID_START = '08:30'
export const GRID_END = '22:00'
export const SLOT_MIN = 30

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export const GRID_ROWS = (toMinutes(GRID_END) - toMinutes(GRID_START)) / SLOT_MIN

/** Linha da grelha (base 1) onde uma hora começa. */
export function rowOf(hhmm: string): number {
  return (toMinutes(hhmm) - toMinutes(GRID_START)) / SLOT_MIN + 1
}

/** Quantas linhas ocupa uma sessão. Sem fim declarado, ocupa uma hora. */
export function spanOf(s: Session): number {
  if (!s.end) return 2
  return Math.max(1, (toMinutes(s.end) - toMinutes(s.start)) / SLOT_MIN)
}

/** Chave estável para selecção e listas. */
export const keyOf = (dayKey: string, s: Session) => `${dayKey}-${s.start}-${s.title}`

/** As horas certas dentro da grelha, para o eixo do tempo. */
export const HOUR_MARKS: string[] = (() => {
  const out: string[] = []
  const end = toMinutes(GRID_END)
  // Primeira hora certa a partir do início da grelha (08:30 → 09:00).
  let min = Math.ceil(toMinutes(GRID_START) / 60) * 60
  for (; min <= end; min += 60) {
    out.push(`${String(min / 60).padStart(2, '0')}:00`)
  }
  return out
})()
