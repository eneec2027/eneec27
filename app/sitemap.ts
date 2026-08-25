import type { MetadataRoute } from 'next'

import { LANGS } from '@/lib/i18n'
import { path } from '@/lib/nav'

const SITE = 'https://eneec.pt'

// Páginas públicas, nas duas línguas. /admin fica de fora (é privado) e
// /candidatura entra uma vez só, porque não tem versão inglesa.
const PAGES = ['', '/evento', '/programa', '/equipa', '/parceiros', '/contactos', '/descobre', '/privacidade']

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = LANGS.flatMap(lang =>
    PAGES.map(p => ({
      url: SITE + path(lang, p),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: p === '' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(LANGS.map(l => [l, SITE + path(l, p)])),
      },
    })),
  )

  return [
    ...pages,
    { url: `${SITE}/candidatura`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
