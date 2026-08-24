import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LANGS, isLang, HTML_LANG, type Lang } from '@/lib/i18n'

// Toda a V2 vive sob /v2/<lang> enquanto não substituir a V1 em produção, e sob
// noindex — é revisão interna, não é lançamento. Ver o vault, briefing-conteudos.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export function generateStaticParams() {
  return LANGS.map(lang => ({ lang }))
}

export default async function V2Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: raw } = await params
  // Sem isto, /v2/qualquer-coisa renderizava a homepage com uma língua inventada.
  if (!isLang(raw)) notFound()
  const lang = raw as Lang

  return (
    // O <html lang> está no layout de raiz e é sempre pt; aqui marca-se a
    // língua real da árvore, que é o que os leitores de ecrã seguem.
    <div lang={HTML_LANG[lang]}>
      <Navbar lang={lang} />
      <main>{children}</main>
      <Footer lang={lang} />
    </div>
  )
}
