import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import PageHeader from '@/components/site/PageHeader'
import { CONTACTS, EVENT } from '@/lib/siteConfig'
import { langAlternates } from '@/lib/nav'
import { getDict, isLang } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  return {
    title: `${getDict(lang).privacidade.title} — ${EVENT.name}`,
    alternates: langAlternates(lang, '/privacidade'),
  }
}

// O briefing pede um link permanente no rodapé, porque a newsletter e o aviso de
// Early Birds recolhem email. Esta página descreve o que o site faz hoje — nada
// mais. ⚠️ Falta revisão de quem responde pelo tratamento de dados na NEBEC.
export default async function PrivacidadePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const dict = getDict(lang)
  const d = dict.privacidade

  const fill = (s: string) =>
    s
      .replace('{email}', CONTACTS.geral)
      .replace('{org}', EVENT.organizerFull)
      .replace('{department}', dict.event.department)
      .replace('{venue}', dict.event.venue)
      .replace('{address}', EVENT.address)

  return (
    <>
      <PageHeader lang={lang} label={d.label} title={d.title} intro={d.intro} />

      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          {d.sections.map(({ title, body }) => (
            <div key={title}>
              <h2 className="section-label mb-4">{title}</h2>
              <div className="space-y-3">
                {body.map(p => (
                  <p key={p} className="text-muted-foreground leading-relaxed">{fill(p)}</p>
                ))}
              </div>
            </div>
          ))}

          <p className="mono text-xs text-muted-foreground/60 pt-8 border-t border-gold-subtle">
            {d.updated}
          </p>
        </div>
      </section>
    </>
  )
}
