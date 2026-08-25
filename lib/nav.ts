import type { Lang } from '@/lib/i18n'
import { getDict } from '@/lib/i18n'

// Navegação do site, na estrutura que o briefing da NEBEC define:
// Início | O Evento | Programa | Equipa & Embaixadores | Parceiros | Contactos
//
// O site vive na raiz, por língua: /pt e /en. Foi público a 2026-08-24, quando
// substituiu o teaser da V1 — ver o vault, proximos-passos › 0.5.
export const BASE = ''

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

/**
 * Alternativas de língua para os motores de busca. Sem isto, as duas versões
 * competem uma com a outra em vez de se apresentarem como traduções.
 */
export function langAlternates(lang: Lang, p = '') {
  return {
    canonical: path(lang, p),
    languages: { pt: path('pt', p), en: path('en', p) },
  }
}
