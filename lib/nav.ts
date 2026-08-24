// Navegação do site, na estrutura que o briefing da NEBEC define:
// Início | O Evento | Programa | Equipa & Embaixadores | Parceiros | Contactos
//
// A V2 vive sob /v2 enquanto não substituir a V1 — ver o vault, briefing-conteudos.
// Quando substituir, pôr BASE a '' e mover app/v2/* para app/*. É a única
// alteração necessária: nenhum href está escrito à mão nos componentes.
export const BASE = '/v2'

export const path = (p: string) => `${BASE}${p}`

export interface NavItem {
  label: string
  href: string
  short?: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Início', href: path('') },
  { label: 'O Evento', href: path('/evento') },
  { label: 'Programa', href: path('/programa') },
  { label: 'Equipa & Embaixadores', href: path('/equipa'), short: 'Equipa' },
  { label: 'Parceiros', href: path('/parceiros') },
  { label: 'Contactos', href: path('/contactos') },
]

export const ROUTES = {
  // Fora do prefixo da V2 de propósito: o formulário de candidatura é o mesmo
  // que a V1 serve, com layout próprio, e vive na raiz desde maio.
  candidatura: '/candidatura',
  home: path(''),
  evento: path('/evento'),
  programa: path('/programa'),
  equipa: path('/equipa'),
  parceiros: path('/parceiros'),
  contactos: path('/contactos'),
  descobre: path('/descobre'),
  privacidade: path('/privacidade'),
} as const
