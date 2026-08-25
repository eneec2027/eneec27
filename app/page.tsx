import { redirect } from 'next/navigation'

import { DEFAULT_LANG } from '@/lib/i18n'
import { path } from '@/lib/nav'

// A raiz manda para o português, que é o original do site.
//
// Até 2026-08-24 esta rota servia o teaser da V1 (`components/V1Page.tsx`), com
// o countdown para a abertura das inscrições. O ficheiro fica no repo, sem rota:
// é o registo do que esteve público entre junho e agosto de 2026.
export default function RootPage() {
  redirect(path(DEFAULT_LANG))
}
