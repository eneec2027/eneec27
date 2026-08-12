/** Secções do painel. Partilhado entre a navegação e a legenda da barra lateral. */
export const ADMIN_SECTIONS = [
  { href: '/admin/candidaturas', label: 'Candidaturas' },
  { href: '/admin/email-signups', label: 'Newsletter' },
] as const

export function sectionLabelFor(pathname: string): string {
  return ADMIN_SECTIONS.find(s => pathname.startsWith(s.href))?.label ?? '—'
}
