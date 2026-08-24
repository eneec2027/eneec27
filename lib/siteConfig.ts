// Fonte única para factos do evento, contactos e redes sociais.
// Estes valores estavam duplicados por V1Page, Footer e secções V2, e tinham
// divergido (mês errado no layout, edição errada no Hero, domínio de email
// inexistente). Alterar aqui — não voltar a escrever literais nos componentes.
//
// Actualizado a 2026-08-24 com o briefing de conteúdos da NEBEC, que fechou as
// datas, a morada e a estratégia de pré-lançamento.

export const EVENT = {
  name: "ENEEC'27",
  fullName: 'Encontro Nacional de Estudantes de Engenharia Civil',
  edition: '15.ª Edição',
  city: 'Aveiro',
  venue: 'Universidade de Aveiro',
  department: 'Departamento de Engenharia Civil',
  address: 'Campus Universitário de Santiago, 3810-193 Aveiro',
  mapsUrl: 'https://maps.google.com/?q=Departamento+de+Engenharia+Civil+Universidade+de+Aveiro',
  month: 'Abril 2027',
  monthLower: 'abril de 2027',
  // Briefing NEBEC, agosto 2026: "7 a 10 de abril · Universidade de Aveiro".
  dates: '7 a 10 de abril',
  datesShort: '7—10 abril 2027',
  datesLong: '7 a 10 de abril de 2027',
  days: 4,
  tagline: 'Construção em Movimento',
  organizer: 'NEBEC',
  organizerFull: 'NEBEC-AAUAv',
  organizerUrl: 'https://nebec.pt',
} as const

// Datas fechadas pelo briefing de 2026-08-24 (antes disto só o mês era público).
export const EVENT_DATES_CONFIRMED = true

// Primeiro dia do evento — alvo do countdown.
export const EVENT_TARGET_DATE = new Date('2027-04-07T09:00:00')

// Alvo do countdown da V1: abertura de inscrições.
// ⚠️ O briefing confirma que os Early Birds ainda não têm data. Esta promessa
// tem de mudar antes de 1 de setembro — ver o vault, proximos-passos › 1.
export const REGISTRATION_OPENS = new Date('2026-09-01T09:00:00')

// ── Estado do conteúdo ────────────────────────────────────────────────────
// Cada peça de conteúdo que a NEBEC ainda não fechou fica atrás de uma flag.
// Regra: se não está confirmado, o site diz que será anunciado. Nunca inventar.
// (Em agosto de 2026 houve duas vagas de conteúdo fabricado — 17 sessões, tiers
// de patrocínio, edições anteriores. O que não tem flag não tem defesa.)
export const SCHEDULE_ANNOUNCED = false
export const WORKSHOPS_ANNOUNCED = false
export const SPEAKERS_ANNOUNCED = false
export const TEAM_ANNOUNCED = false
export const AMBASSADORS_ANNOUNCED = false
export const SPONSORS_ANNOUNCED = false

// Enquanto false, o CTA principal do site é "Descobre o ENEEC27" e aponta para
// /descobre. Quando os Early Birds abrirem, passa a "Garantir Bilhete".
export const EARLY_BIRDS_OPEN = false

// Teaser "Coming Soon" em fase final de produção. Substituir por o caminho do
// ficheiro (ex.: '/teaser-eneec27.mp4') e o placeholder desaparece sozinho.
export const TEASER_VIDEO_URL: string | null = null

export const CONTACTS = {
  geral: 'geral@eneec.pt',
  parcerias: 'parcerias@eneec.pt',
  logistica: 'logistica.eneec@ua.pt',
} as const

// LinkedIn e TikTok ainda sem URL confirmado — '#' desactiva o link em vez de
// o renderizar morto. O briefing diz que o evento tem LinkedIn oficial; falta
// o endereço. TikTok tem espaço reservado, por pedido do briefing.
export const SOCIAL = {
  instagram: 'https://www.instagram.com/eneec2027',
  instagramHandle: '@eneec2027',
  instagramNebec: 'https://www.instagram.com/nebecaauav',
  instagramNebecHandle: '@nebecaauav',
  linkedin: '#',
  tiktok: '#',
  facebook: '#',
} as const
