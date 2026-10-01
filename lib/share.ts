import type { Metadata } from 'next'

import { EVENT } from '@/lib/siteConfig'
import { getDict, type Lang } from '@/lib/i18n'

type ShareImage = { url: string; width: number; height: number; alt: string }

// O Next junta os metadados chave a chave: um nível que declare `openGraph`
// substitui o openGraph inteiro de cima, imagens incluídas. Foi assim que o
// og:image do layout de raiz desapareceu de todas as páginas desde 25/08.
// Cada nível que mexa na partilha constrói o seu bloco a partir daqui.
export function shareMetadata(
  lang: Lang,
  { title, description, image }: { title: string; description: string; image?: ShareImage },
): Pick<Metadata, 'openGraph' | 'twitter'> {
  const d = getDict(lang)
  const img = image ?? {
    url: '/og-eneec27.png',
    width: 1200,
    height: 630,
    alt: `${EVENT.name} — ${d.event.datesLong}, ${d.event.venue}`,
  }
  return {
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: EVENT.name,
      locale: lang === 'pt' ? 'pt_PT' : 'en_GB',
      images: [img],
    },
    twitter: { card: 'summary_large_image', title, description, images: [img.url] },
  }
}
