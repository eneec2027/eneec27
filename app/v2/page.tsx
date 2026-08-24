import { redirect } from 'next/navigation'

import { DEFAULT_LANG } from '@/lib/i18n'
import { path } from '@/lib/nav'

// /v2 sem língua vai para o português, que é o original do site.
export default function V2Index() {
  redirect(path(DEFAULT_LANG))
}
