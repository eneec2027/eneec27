// Dados do site que não são texto: parceiros, equipa, destaques.
//
// O texto vive todo em lib/i18n.ts, nas duas línguas. Aqui ficam só os dados —
// ficheiros de logo, valores numéricos, estruturas — e as chaves que ligam cada
// item à sua tradução.

// Qual das três frases de impacto do briefing está em uso. As três estão em
// lib/i18n.ts (home.heroHeadlines), nas duas línguas; a NEBEC ainda não escolheu.
export const HERO_HEADLINE_INDEX = 0

// ── Homepage · Bloco 3 — razões para vir ──────────────────────────────────
// `icon` liga a um desenho em components/site/Icons.tsx e `key` à etiqueta
// traduzida. Os três itens que o briefing não quantifica não levam número —
// levam o ícone no lugar dele, para não ficarem cartões vazios ao lado dos que têm.
export type HighlightKey = 'estudantes' | 'dias' | 'workshops' | 'visitas' | 'festas'

export const HIGHLIGHTS: { value: string | null; key: HighlightKey }[] = [
  { value: '300+', key: 'estudantes' },
  { value: '4',    key: 'dias' },
  { value: null,   key: 'workshops' },
  { value: null,   key: 'visitas' },
  { value: null,   key: 'festas' },
]

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
  { name: 'CNJ — Conselho Nacional de Juventude', logo: '/logos/cnj.png', url: 'https://www.cnj.pt' },
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
