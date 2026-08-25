import Link from 'next/link'

import { IconInstagram, IconLinkedIn, IconTikTok } from '@/components/site/SocialIcons'
import Logo from '@/components/site/Logo'
import EmailCapture from '@/components/site/EmailCapture'
import { navItems, routes } from '@/lib/nav'
import { CONTACTS, EVENT, SOCIAL } from '@/lib/siteConfig'
import { getDict, type Lang } from '@/lib/i18n'

export default function Footer({ lang }: { lang: Lang }) {
  const dict = getDict(lang)
  const d = dict.footer
  const r = routes(lang)

  return (
    <footer className="border-t border-gold-subtle bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Marca */}
          <div>
            <Logo variant="h" height={56} sizeClassName="h-12 sm:h-14 w-auto" className="mb-5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {dict.event.fullName}.<br />
              {dict.event.datesLong}.<br />
              {dict.event.venue}.
            </p>
            <p className="mono text-xs text-gold/70 mt-4 tracking-widest">{EVENT.tagline}</p>
          </div>

          {/* Navegação rápida */}
          <div>
            <p className="section-label mb-5">{d.navLabel}</p>
            <ul className="text-sm text-muted-foreground">
              {navItems(lang).map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="inline-block py-2 hover:text-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contactos e redes */}
          <div>
            <p className="section-label mb-5">{d.contactsLabel}</p>
            <ul className="text-sm text-muted-foreground">
              <li>
                <a href={`mailto:${CONTACTS.geral}`} className="inline-block py-2 hover:text-gold transition-colors">
                  {CONTACTS.geral}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACTS.parcerias}`} className="inline-block py-2 hover:text-gold transition-colors">
                  {CONTACTS.parcerias}
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-1 mt-4 -ml-2">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${SOCIAL.instagramHandle}`}
                title={SOCIAL.instagramHandle}
                className="p-2.5 text-muted-foreground hover:text-gold transition-colors"
              >
                <IconInstagram />
              </a>
              <a
                href={SOCIAL.instagramNebec}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${SOCIAL.instagramNebecHandle}`}
                title={SOCIAL.instagramNebecHandle}
                className="p-2.5 text-muted-foreground hover:text-gold transition-colors"
              >
                <IconInstagram />
              </a>
              {/* Só renderiza quando houver URL real — ver SOCIAL em siteConfig. */}
              {SOCIAL.linkedin !== '#' && (
                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2.5 text-muted-foreground hover:text-gold transition-colors"
                >
                  <IconLinkedIn />
                </a>
              )}
              {SOCIAL.tiktok !== '#' && (
                <a
                  href={SOCIAL.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="p-2.5 text-muted-foreground hover:text-gold transition-colors"
                >
                  <IconTikTok />
                </a>
              )}
            </div>

            <p className="mono text-[0.7rem] text-muted-foreground/60 mt-4 tracking-widest uppercase">
              {SOCIAL.instagramHandle} · {SOCIAL.instagramNebecHandle}
            </p>

            {/* Os dois caminhos de entrada que vêm da V1: candidatura à equipa
                e contacto de patrocínios. Estavam só na homepage da V1. */}
            <div className="flex flex-col items-start gap-2 mt-6">
              <Link
                href={r.candidatura}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-gold/30 rounded-sm text-sm text-foreground/85 hover:border-gold/70 hover:text-foreground hover:bg-gold/5 transition-all"
              >
                {d.joinTeam} <span className="text-gold">→</span>
              </Link>
              <a
                href={`mailto:${CONTACTS.parcerias}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-gold/30 rounded-sm text-sm text-foreground/85 hover:border-gold/70 hover:text-foreground hover:bg-gold/5 transition-all"
              >
                {d.support} <span className="text-gold">→</span>
              </a>
            </div>
          </div>

          {/* Captação de interesse — os dois formulários que o briefing pede,
              sobre o mesmo sistema, distinguidos pela coluna `source`. */}
          <div className="space-y-8">
            <EmailCapture
              lang={lang}
              source="v2_newsletter"
              label={d.newsletterLabel}
              cta={d.newsletterCta}
              hint={d.newsletterHint}
            />
            <EmailCapture
              lang={lang}
              source="v2_early_birds"
              label={d.earlyLabel}
              cta={d.earlyCta}
            />
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-gold-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="mono text-xs text-muted-foreground/70">{d.rights}</p>
          <div className="flex items-center gap-6">
            <Link
              href={r.privacidade}
              className="mono text-xs text-muted-foreground/70 hover:text-gold transition-colors py-2"
            >
              {d.privacy}
            </Link>
            <a
              href={EVENT.organizerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-xs text-muted-foreground/70 hover:text-gold transition-colors py-2"
            >
              {EVENT.organizer}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
