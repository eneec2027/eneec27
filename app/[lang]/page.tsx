import { notFound } from 'next/navigation'

import Hero from '@/components/sections/Hero'
import OQueE from '@/components/sections/OQueE'
import Numeros from '@/components/sections/Numeros'
import Apoios from '@/components/sections/Apoios'
import { isLang } from '@/lib/i18n'
import { langAlternates } from '@/lib/nav'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return isLang(lang) ? { alternates: langAlternates(lang) } : {}
}

// Homepage na estrutura do briefing: impacto inicial, o que é o ENEEC27,
// razões para vir, apoios institucionais.
export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()

  return (
    <>
      <Hero lang={lang} />
      <OQueE lang={lang} />
      <Numeros lang={lang} />
      <Apoios lang={lang} />
    </>
  )
}
