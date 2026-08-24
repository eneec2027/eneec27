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
  /** Decorre em paralelo com o resto do bloco. */
  parallel?: boolean
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
      { start: '09:30', end: '13:00', title: 'Feira de Empresas', type: 'feira', parallel: true },
      { start: '09:30', end: '10:00', title: 'Palestra de investigação', type: 'palestra', provisional: true, note: 'tema a anunciar' },
      { start: '10:00', end: '10:30', title: 'Coffee break', type: 'logistica' },
      { start: '10:30', end: '11:00', title: 'Palestra de investigação', type: 'palestra', provisional: true, note: 'tema a anunciar' },
      { start: '11:00', end: '11:30', title: 'Coffee break', type: 'logistica' },
      { start: '11:30', end: '12:00', title: 'Palestra de investigação', type: 'palestra', provisional: true, note: 'tema a anunciar' },
      { start: '12:00', end: '12:30', title: 'Coffee break', type: 'logistica' },
      { start: '12:30', end: '13:00', title: 'Painel dos oradores', type: 'sessao' },
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

// Ordem dos filtros na barra. 'todos' é sempre o primeiro.
export const FILTER_TYPES: SessionType[] = ['sessao', 'palestra', 'feira', 'visita', 'social']
