import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import PageHeader from '@/components/site/PageHeader'
import Reveal from '@/components/site/Reveal'
import Programa from '@/components/sections/Programa'
import Oradores from '@/components/sections/Oradores'
import { getDict, isLang } from '@/lib/i18n'
import { EVENT, SCHEDULE_ANNOUNCED, SOCIAL } from '@/lib/siteConfig'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  return { title: `${getDict(lang).programa.label} — ${EVENT.name}` }
}

// "Concentra o programa dos quatro dias: horários, workshops, visitas técnicas e
// restantes atividades. Até estar fechado, pode surgir como 'Brevemente'" — briefing.
export default async function ProgramaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const d = getDict(lang).programa

  return (
    <>
      <PageHeader
        lang={lang}
        label={d.label}
        title={SCHEDULE_ANNOUNCED ? d.title : d.titleSoon}
        intro={SCHEDULE_ANNOUNCED ? d.intro : d.introSoon}
      />

      {!SCHEDULE_ANNOUNCED && (
        <section className="pt-16 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-2 mono text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors"
              >
                {d.followAnnouncements(SOCIAL.instagramHandle)}
              </a>
            </Reveal>
          </div>
        </section>
      )}

      <Programa lang={lang} />
      <Oradores lang={lang} />
    </>
  )
}
