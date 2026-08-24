import type { Lang } from '@/lib/i18n'
import { getDict } from '@/lib/i18n'

// Navegação do site, na estrutura que o briefing da NEBEC define:
// Início | O Evento | Programa | Equipa & Embaixadores | Parceiros | Contactos
//
// A V2 vive sob /v2/<lang> enquanto não substituir a V1 — ver o vault,
// briefing-conteudos. Quando substituir, pôr BASE a '' e mover app/v2/[lang]
// para app/[lang]. É a única alteração necessária: nenhum href está escrito à
// mão nos componentes.
export const BASE = '/v2'

export const path = (lang: Lang, p = '') => `${BASE}/${lang}${p}`

export interface NavItem {
  label: string
  href: string
  short?: string
}

export function navItems(lang: Lang): NavItem[] {
  const d = getDict(lang).nav
  return [
    { label: d.inicio, href: path(lang) },
    { label: d.evento, href: path(lang, '/evento') },
    { label: d.programa, href: path(lang, '/programa') },
    { label: d.equipa, href: path(lang, '/equipa'), short: d.equipaShort },
    { label: d.parceiros, href: path(lang, '/parceiros') },
    { label: d.contactos, href: path(lang, '/contactos') },
  ]
}

export function routes(lang: Lang) {
  return {
    home: path(lang),
    evento: path(lang, '/evento'),
    programa: path(lang, '/programa'),
    equipa: path(lang, '/equipa'),
    parceiros: path(lang, '/parceiros'),
    contactos: path(lang, '/contactos'),
    descobre: path(lang, '/descobre'),
    privacidade: path(lang, '/privacidade'),
    // Fora do prefixo da V2 e sem versão inglesa: o formulário de candidatura é
    // o mesmo que a V1 serve, com layout próprio, e vive na raiz desde maio.
    candidatura: '/candidatura',
  }
}

export type Routes = ReturnType<typeof routes>

/** O mesmo caminho na outra língua, para o selector de língua. */
export function swapLang(pathname: string, to: Lang): string {
  const rest = pathname.replace(new RegExp(`^${BASE}/[a-z]{2}`), '')
  return path(to, rest)
}
