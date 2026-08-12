// Fonte única para factos do evento, contactos e redes sociais.
// Estes valores estavam duplicados por V1Page, Footer e secções V2, e tinham
// divergido (mês errado no layout, edição errada no Hero, domínio de email
// inexistente). Alterar aqui — não voltar a escrever literais nos componentes.

export const EVENT = {
  name: "ENEEC'27",
  fullName: 'Encontro Nacional de Estudantes de Engenharia Civil',
  edition: '15.ª Edição',
  city: 'Aveiro',
  venue: 'Universidade de Aveiro',
  month: 'Abril 2027',
  monthLower: 'abril de 2027',
  tagline: 'Construção em Movimento',
  organizer: 'NEBEC',
  organizerUrl: 'https://nebec.pt',
} as const

// Dias exactos ainda não confirmados pela NEBEC — só o mês está fechado.
// Enquanto assim for, mostrar apenas EVENT.month e não intervalos de dias.
export const EVENT_DATES_CONFIRMED = false

// Alvo do countdown do evento (V2). Dia provisório — actualizar quando a NEBEC fechar as datas.
export const EVENT_TARGET_DATE = new Date('2027-04-15T09:00:00')

// Alvo do countdown da V1: abertura de inscrições.
export const REGISTRATION_OPENS = new Date('2026-09-01T09:00:00')

export const CONTACTS = {
  geral: 'geral@eneec.pt',
  parcerias: 'parcerias@eneec.pt',
  logistica: 'logistica.eneec@ua.pt',
} as const

// LinkedIn e Facebook ainda sem handle confirmado — '#' desactiva o link.
export const SOCIAL = {
  instagram: 'https://www.instagram.com/eneec2027',
  instagramHandle: '@eneec2027',
  linkedin: '#',
  facebook: '#',
} as const
