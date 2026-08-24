// Conteúdo editorial do site, transcrito do briefing da NEBEC (agosto 2026).
//
// Regra: o texto entre aspas neste ficheiro é da NEBEC e está verbatim. Não
// reescrever sem passar pela organização. O que não veio do briefing está
// marcado como hipótese.

// ── Homepage · Bloco 1 — frase de impacto ─────────────────────────────────
// O briefing dá três opções e deixa a escolha à NEBEC. Estão as três aqui;
// trocar HERO_HEADLINE_INDEX é a única alteração necessária.
export const HERO_HEADLINES = [
  'De norte a sul, todos os caminhos vão dar a Aveiro.',
  'Vem construir ligações que ficam muito para além destes quatro dias.',
  'Quatro dias. Uma cidade. A próxima geração da Engenharia Civil reunida em Aveiro.',
] as const

export const HERO_HEADLINE_INDEX = 0

export const HERO_HEADLINE = HERO_HEADLINES[HERO_HEADLINE_INDEX]

// ── Homepage · Bloco 2 — O que é o ENEEC27? ───────────────────────────────
// TODO(NEBEC): "Oito anos depois" não fecha com a história em EVENT_HISTORY,
// que diz que Aveiro recebeu a 10.ª edição em 2014 — são 13 anos. O briefing
// marca a numeração das edições como "confirmar junto da FNEEC". Mantido
// verbatim até haver resposta; corrigir os dois textos ao mesmo tempo.
export const WHAT_IS_ENEEC =
  'Oito anos depois, o ENEEC regressa a Aveiro!! Durante quatro dias, estudantes ' +
  'de Engenharia Civil de todo o país juntam-se para partilhar conhecimento, criar ' +
  'ligações e viver uma experiência que vai muito além da sala de aula.'

// ── Homepage · Bloco 3 — razões para vir ──────────────────────────────────
// `icon` liga a um desenho em components/site/Icons.tsx. Os três itens que o
// briefing não quantifica não levam número — levam o ícone no lugar dele, para
// não ficarem cartões vazios ao lado dos que têm.
export type HighlightIcon = 'estudantes' | 'dias' | 'workshops' | 'visitas' | 'festas'

export const HIGHLIGHTS: { value: string | null; label: string; icon: HighlightIcon }[] = [
  { value: '300+', label: 'Estudantes esperados', icon: 'estudantes' },
  { value: '4',    label: 'Dias de evento',       icon: 'dias' },
  { value: null,   label: 'Workshops',            icon: 'workshops' },
  { value: null,   label: 'Visitas Técnicas',     icon: 'visitas' },
  { value: null,   label: 'Festas & Convívios',   icon: 'festas' },
]

// ── 3.1 Descobre o ENEEC27 ────────────────────────────────────────────────
export const TEASER_INTRO =
  'O ENEEC27 junta durante quatro dias estudantes de Engenharia Civil de todo o ' +
  'país em Aveiro. O teaser está em fase final de produção — entretanto, deixa o ' +
  'teu email e sabes em primeira mão quando abrirem os Early Birds.'

// ── 3.2 O Evento ──────────────────────────────────────────────────────────
export const EVENT_HISTORY =
  'O ENEEC é um encontro nacional que reúne estudantes de Engenharia Civil de ' +
  'diferentes instituições, promovendo a partilha de conhecimento, a aproximação ' +
  'à profissão e a criação de ligações dentro da comunidade académica. Ao longo ' +
  'das suas edições, o encontro passou por várias cidades portuguesas. Aveiro ' +
  'recebeu a 10.ª edição em 2014, organizada pelo NEBEC-AAUAv, e em 2027 ' +
  'prepara-se para voltar a acolher o evento, na sua 15.ª edição, retomando uma ' +
  'tradição nacional e abrindo um novo capítulo do ENEEC.'

export const AVEIRO_VISION =
  'Aveiro é a cidade dos canais, dos moliceiros e de uma universidade que respira ' +
  'engenharia. É aqui, junto à Ria, que o ENEEC27 vai acontecer, entre o ' +
  'Departamento de Engenharia Civil, o campus e o coração da cidade. Uma edição ' +
  'pensada para quem vem de fora conhecer não só a engenharia civil portuguesa, ' +
  'mas também esta cidade.'

export const WELCOME_MESSAGE =
  'É com enorme entusiasmo que vos recebemos em Aveiro para o ENEEC27. Queremos ' +
  'que estes quatro dias sejam feitos de novas ideias, novas pessoas e ' +
  'experiências que ficam para além do evento, da engenharia às visitas, do campus ' +
  'à cidade, das conversas aos momentos de convívio. Façam desta edição também ' +
  'vossa. Sejam muito bem-vindos ao ENEEC27.'

// ── Parceiros ─────────────────────────────────────────────────────────────
// Apoios institucionais identificados no briefing. Os logos são os ficheiros
// oficiais da pasta da NEBEC, processados para public/logos/.
// A grelha é modular: acrescentar aqui chega, não é preciso mexer no layout.
export interface Partner {
  name: string
  logo: string
  url?: string
}

export const INSTITUTIONAL_PARTNERS: Partner[] = [
  { name: 'Ordem dos Engenheiros', logo: '/logos/ordem-engenheiros.png', url: 'https://www.ordemengenheiros.pt' },
  { name: 'Ordem dos Engenheiros Técnicos', logo: '/logos/ordem-engenheiros-tecnicos.png', url: 'https://www.oet.pt' },
  { name: 'AICCOPN', logo: '/logos/aiccopn.png', url: 'https://www.aiccopn.pt' },
  { name: 'ANIPB', logo: '/logos/anipb.png', url: 'https://www.anipb.pt' },
  { name: 'Infraestruturas de Portugal', logo: '/logos/infraestruturas-portugal.png', url: 'https://www.infraestruturasdeportugal.pt' },
]

export const ORGANIZERS: Partner[] = [
  { name: 'NEBEC — Núcleo de Estudantes de Engenharia Civil', logo: '/logos/nebec.png', url: 'https://nebec.pt' },
  { name: 'AAUAv — Associação Académica da Universidade de Aveiro', logo: '/logos/aauav.png', url: 'https://aauav.pt' },
  { name: 'Departamento de Engenharia Civil da Universidade de Aveiro', logo: '/logos/decivil.png', url: 'https://www.ua.pt/pt/decivil' },
  { name: 'Universidade de Aveiro', logo: '/logos/ua.png', url: 'https://www.ua.pt' },
]

// Patrocinadores: nenhum confirmado. Enquanto SPONSORS_ANNOUNCED for false, a
// área fica oculta — instrução explícita do briefing.
export const SPONSORS: Partner[] = []

// ── Equipa & Embaixadores ─────────────────────────────────────────────────
// Estruturas prontas; faltam as fotografias e os nomes. Preencher e pôr
// TEAM_ANNOUNCED / AMBASSADORS_ANNOUNCED a true em lib/siteConfig.ts.
export interface Member {
  name: string
  role: string
  photo?: string
}

export interface AmbassadorGroup {
  university: string
  members: Member[]
}

export const TEAM: Member[] = []

export const AMBASSADORS: AmbassadorGroup[] = []

// ── Os 3 pilares ──────────────────────────────────────────────────────────
// ⚠️ Hipótese de trabalho, não veio da NEBEC nem do briefing. Confirmar.
export const PILLARS = [
  {
    number: '01',
    title: 'Conhecimento Técnico',
    description:
      'Conferências, workshops e visitas técnicas que aprofundam a formação académica e expõem os estudantes ao estado da arte da engenharia civil.',
  },
  {
    number: '02',
    title: 'Networking Profissional',
    description:
      'Contacto direto com empresas, engenheiros seniores e instituições, criando pontes entre a academia e o mercado de trabalho.',
  },
  {
    number: '03',
    title: 'Cultura de Engenharia',
    description:
      'Debate de ideias, troca de experiências entre estudantes de todo o país e celebração da identidade coletiva da engenharia civil portuguesa.',
  },
] as const
