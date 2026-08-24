import Link from 'next/link'

import Reveal from '@/components/site/Reveal'
import BlueprintRule from '@/components/site/BlueprintRule'
import { WHAT_IS_ENEEC } from '@/lib/content'
import { ROUTES } from '@/lib/nav'
import { EVENT } from '@/lib/siteConfig'

// Bloco 2 do briefing. O texto é da NEBEC e está verbatim em lib/content.ts.
export default function OQueE() {
  return (
    <section className="py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="section-label mb-6">O que é o {EVENT.name}?</p>
          <p className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl leading-snug text-foreground max-w-4xl text-balance">
            {WHAT_IS_ENEEC}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <BlueprintRule className="my-14 opacity-80" />
        </Reveal>

        <Reveal delay={0.15}>
          <Link
            href={ROUTES.evento}
            className="inline-flex items-center gap-2 mono text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors"
          >
            A história do ENEEC e a visão de Aveiro →
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
