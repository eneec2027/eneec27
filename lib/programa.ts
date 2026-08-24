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

import type { Localized } from '@/lib/i18n'

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
  title: Localized
  type: SessionType
  /**
   * Pista dentro do dia. Cada dia tem duas colunas na grelha, como no ficheiro
   * da NEBEC: sem `track`, a sessão ocupa a largura toda do dia; com 1 ou 2,
   * fica lado a lado com o que decorre em paralelo.
   */
  track?: 1 | 2
  /** Título de trabalho no ficheiro da NEBEC — o site diz que falta anunciar. */
  provisional?: boolean
  note?: Localized
  /** Sub-programa de um bloco (a Sessão de Abertura de quarta-feira). */
  children?: Session[]
}

export interface ProgramDay {
  key: string
  weekday: Localized
  date: Localized
  sessions: Session[]
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
    weekday: { pt: 'Quarta-feira', en: 'Wednesday' },
    date: { pt: '7 de abril', en: '7 April' },
    sessions: [
      { start: '09:00', end: '12:30', title: { pt: 'Receção', en: 'Check-in' }, type: 'logistica' },
      { start: '12:30', end: '14:00', title: { pt: 'Almoço', en: 'Lunch' }, type: 'logistica' },
      {
        start: '14:00', end: '16:00',
        title: { pt: 'Visitas', en: 'Visits' },
        note: {
          pt: 'DECivil · Universidade de Aveiro · cidade',
          en: 'DECivil · University of Aveiro · the city',
        },
        type: 'visita',
      },
      {
        start: '16:00', end: '19:30',
        title: { pt: 'Sessão de Abertura', en: 'Opening Session' },
        type: 'sessao',
        children: [
          { start: '16:00', end: '18:00', title: { pt: 'Sessão de abertura institucional', en: 'Institutional opening session' }, type: 'sessao' },
          { start: '18:00', end: '18:30', title: { pt: 'Coffee break', en: 'Coffee break' }, type: 'logistica' },
          {
            start: '18:30', end: '19:00',
            title: { pt: 'Ted Talk', en: 'Ted Talk' },
            type: 'palestra',
            provisional: true,
            note: { pt: 'convidado a anunciar', en: 'guest to be announced' },
          },
          { start: '19:00', end: '19:30', title: { pt: 'Sessão do Main Sponsor', en: 'Main Sponsor session' }, type: 'sessao' },
        ],
      },
      {
        start: '19:30', end: '21:30',
        title: { pt: 'Sunset', en: 'Sunset' },
        note: { pt: 'Bar do Estudante', en: 'Bar do Estudante' },
        type: 'social',
      },
    ],
  },
  {
    key: 'qui',
    weekday: { pt: 'Quinta-feira', en: 'Thursday' },
    date: { pt: '8 de abril', en: '8 April' },
    sessions: [
      { start: '08:30', end: '09:00', title: { pt: 'Receção', en: 'Check-in' }, type: 'logistica' },
      { start: '09:00', end: '09:30', title: { pt: 'Sessão de abertura', en: 'Opening session' }, type: 'sessao' },
      { start: '09:30', end: '10:30', title: { pt: 'Palestra Mola', en: 'Mola talk' }, type: 'palestra' },
      { start: '10:30', end: '11:30', title: { pt: 'Linha de Alta Velocidade', en: 'High-Speed Rail Line' }, type: 'palestra' },
      { start: '11:30', end: '16:00', title: { pt: 'Feira de Empresas', en: 'Company Fair' }, type: 'feira' },
      { start: '16:00', end: '17:00', title: { pt: 'Company Spotlights', en: 'Company Spotlights' }, type: 'sessao' },
      { start: '17:00', end: '18:30', title: { pt: 'Roundtable — Habitação', en: 'Roundtable — Housing' }, type: 'palestra' },
      { start: '18:30', end: '20:00', title: { pt: 'Alojamento', en: 'Accommodation' }, type: 'logistica' },
      { start: '20:00', end: '21:00', title: { pt: 'Jantar', en: 'Dinner' }, type: 'logistica' },
      { start: '21:00', title: { pt: 'After', en: 'After party' }, type: 'social' },
    ],
  },
  {
    key: 'sex',
    weekday: { pt: 'Sexta-feira', en: 'Friday' },
    date: { pt: '9 de abril', en: '9 April' },
    sessions: [
      { start: '08:30', end: '09:00', title: { pt: 'Receção', en: 'Check-in' }, type: 'logistica' },
      { start: '09:00', end: '09:30', title: { pt: 'Sessão de abertura', en: 'Opening session' }, type: 'sessao' },
      { start: '09:30', end: '13:00', title: { pt: 'Feira de Empresas', en: 'Company Fair' }, type: 'feira', track: 2 },
      {
        start: '09:30', end: '10:00',
        title: { pt: 'Palestra de investigação', en: 'Research talk' },
        type: 'palestra', track: 1, provisional: true,
        note: { pt: 'tema a anunciar', en: 'topic to be announced' },
      },
      { start: '10:00', end: '10:30', title: { pt: 'Coffee break', en: 'Coffee break' }, type: 'logistica', track: 1 },
      {
        start: '10:30', end: '11:00',
        title: { pt: 'Palestra de investigação', en: 'Research talk' },
        type: 'palestra', track: 1, provisional: true,
        note: { pt: 'tema a anunciar', en: 'topic to be announced' },
      },
      { start: '11:00', end: '11:30', title: { pt: 'Coffee break', en: 'Coffee break' }, type: 'logistica', track: 1 },
      {
        start: '11:30', end: '12:00',
        title: { pt: 'Palestra de investigação', en: 'Research talk' },
        type: 'palestra', track: 1, provisional: true,
        note: { pt: 'tema a anunciar', en: 'topic to be announced' },
      },
      { start: '12:00', end: '12:30', title: { pt: 'Coffee break', en: 'Coffee break' }, type: 'logistica', track: 1 },
      { start: '12:30', end: '13:00', title: { pt: 'Painel dos oradores', en: 'Speakers’ panel' }, type: 'sessao', track: 1 },
      { start: '13:00', end: '13:30', title: { pt: 'Almoço', en: 'Lunch' }, type: 'logistica' },
      { start: '13:30', end: '18:30', title: { pt: 'Visitas técnicas', en: 'Site visits' }, type: 'visita' },
      { start: '18:30', end: '20:00', title: { pt: 'Alojamento', en: 'Accommodation' }, type: 'logistica' },
      { start: '20:00', end: '21:30', title: { pt: 'Jantar de encerramento', en: 'Closing dinner' }, type: 'logistica' },
    ],
  },
  {
    key: 'sab',
    weekday: { pt: 'Sábado', en: 'Saturday' },
    date: { pt: '10 de abril', en: '10 April' },
    sessions: [
      { start: '08:30', end: '13:00', title: { pt: 'Atividade lúdica', en: 'Group activity' }, type: 'social' },
      { start: '13:00', title: { pt: 'Almoço de despedida', en: 'Farewell lunch' }, type: 'logistica' },
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

/** Chave estável para selecção e listas. Usa sempre o português, para a chave
    não mudar quando o visitante troca de língua. */
export const keyOf = (dayKey: string, s: Session) => `${dayKey}-${s.start}-${s.title.pt}`

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
