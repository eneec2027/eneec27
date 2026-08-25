import Link from 'next/link'

import Reveal from '@/components/site/Reveal'
import BlueprintRule from '@/components/site/BlueprintRule'
import { routes } from '@/lib/nav'
import { getDict, type Lang } from '@/lib/i18n'

// Bloco 2 do briefing. O texto é da NEBEC e está verbatim em lib/content.ts.
export default function OQueE({ lang }: { lang: Lang }) {
  const d = getDict(lang).home
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="section-label mb-6">{d.whatIsLabel}</p>
          <p className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl leading-snug text-foreground max-w-4xl text-balance">
            {d.whatIs}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <BlueprintRule className="mt-12 mb-8 opacity-80" />
        </Reveal>

        <Reveal delay={0.15}>
          <Link
            href={routes(lang).evento}
            className="inline-flex items-center gap-2 py-2 mono text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors"
          >
            {d.historyLink}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
