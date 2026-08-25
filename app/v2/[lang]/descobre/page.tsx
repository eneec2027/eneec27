import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import EmailCapture from '@/components/site/EmailCapture'
import Reveal from '@/components/site/Reveal'
import Logo from '@/components/site/Logo'
import { EVENT, TEASER_VIDEO_URL, EARLY_BIRDS_OPEN } from '@/lib/siteConfig'
import { getDict, isLang } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  return { title: `${getDict(lang).cta.discover} — ${EVENT.name}` }
}

// 3.1 do briefing: a página de pré-lançamento para onde aponta o CTA principal.
// Fica deliberadamente curta — "sem necessidade de preencher a página com
// conteúdo provisório". Cresce com programa, bilhetes e convidados a seu tempo.
export default async function DescobrePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const dict = getDict(lang)
  const d = dict.descobre

  return (
    <section className="min-h-dvh grid-bg flex items-center">
      <div className="max-w-5xl mx-auto px-6 py-32 w-full">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <Logo variant="mark" height={120} className="mb-10" priority />

            <p className="section-label mb-5">{d.comingSoon}</p>
            <h1 className="heading-xl text-foreground mb-6 text-balance">{d.title}</h1>
            <p className="flex flex-col sm:flex-row justify-center sm:items-center gap-x-3 gap-y-0.5 text-lg md:text-xl mb-10">
              <span className="text-gold font-semibold">{dict.event.dates}</span>
              <span className="hidden sm:inline text-muted-foreground/50">·</span>
              <span className="text-foreground/90">{dict.event.venue}</span>
            </p>
          </div>
        </Reveal>

        {/* Placeholder de vídeo — substituir TEASER_VIDEO_URL em siteConfig e o
            player real aparece no lugar deste bloco, sem mexer no layout. */}
        <Reveal delay={0.1}>
          <div className="aspect-video w-full card-dark overflow-hidden relative flex items-center justify-center">
            {TEASER_VIDEO_URL ? (
              <video src={TEASER_VIDEO_URL} controls playsInline className="w-full h-full object-cover" />
            ) : (
              <>
                <div className="absolute inset-0 grid-bg" />
                {/* Esquadria de folha de desenho nos quatro cantos */}
                {[
                  'top-4 left-4 border-t border-l',
                  'top-4 right-4 border-t border-r',
                  'bottom-4 left-4 border-b border-l',
                  'bottom-4 right-4 border-b border-r',
                ].map(pos => (
                  <span key={pos} className={`absolute ${pos} w-8 h-8 border-gold/40`} />
                ))}
                <div className="relative z-10 text-center px-6">
                  <div className="w-16 h-16 border border-gold/50 rounded-full flex items-center justify-center mx-auto mb-5">
                    <span className="text-gold text-xl translate-x-0.5">▶</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{d.videoSoon}</p>
                </div>
                {/* Legenda do desenho, no canto inferior direito */}
                <div className="absolute bottom-4 right-4 border border-gold-subtle bg-background/70 backdrop-blur-sm rounded-sm px-3 py-2 text-right">
                  <p className="mono text-[0.68rem] tracking-widest uppercase text-gold/80">
                    {d.comingSoon}
                  </p>
                  <p className="mono text-[0.68rem] tracking-widest uppercase text-muted-foreground/60">
                    {d.videoSoonSub}
                  </p>
                </div>
              </>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14 items-start">
            <p className="text-muted-foreground leading-relaxed">{d.intro}</p>

            <EmailCapture
              lang={lang}
              source="v2_early_birds"
              label={EARLY_BIRDS_OPEN ? d.formLabelOpen : d.formLabel}
              cta={dict.footer.earlyCta}
              hint={dict.form.hintEarly}
              className="card-dark p-6"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
