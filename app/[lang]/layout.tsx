import { notFound } from 'next/navigation'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LANGS, isLang, HTML_LANG, type Lang } from '@/lib/i18n'

// O site serve na raiz, uma árvore por língua: /pt e /en. Substituiu o teaser
// da V1 a 2026-08-24 — o histórico está no vault, proximos-passos › 0.5.
//
// O <html lang> do layout de raiz é sempre "pt", porque /admin e /candidatura
// vivem fora desta árvore e o Next só permite um <html>. É o <div lang> abaixo
// que corrige a leitura em inglês, e são as alternates de cada página que dizem
// aos motores de busca que as duas versões são traduções uma da outra.

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
