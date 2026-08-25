import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LANGS, isLang, HTML_LANG, type Lang } from '@/lib/i18n'

// Toda a V2 vive sob /v2/<lang> enquanto não substituir a V1 em produção, e sob
// noindex — é revisão interna, não é lançamento. Ver o vault, briefing-conteudos.
//
// 🚀 PARA LANÇAR (três passos, por esta ordem):
//   1. mover app/v2/[lang] → app/[lang] e pôr BASE = '' em lib/nav.ts
//   2. apagar o `robots` abaixo, e passar o <html lang> do layout de raiz a
//      seguir o segmento de língua (hoje é sempre "pt", e o <div lang> nesta
//      árvore é o que corrige a leitura em inglês)
//   3. tirar o ramo /v2 do proxy.ts, que deixa de ter para onde redirecionar
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
