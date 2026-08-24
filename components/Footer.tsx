import Link from 'next/link'
import { IconInstagram, IconLinkedIn, IconTikTok } from '@/components/site/SocialIcons'

import Logo from '@/components/site/Logo'
import EmailCapture from '@/components/site/EmailCapture'
import { NAV_ITEMS, ROUTES } from '@/lib/nav'
import { CONTACTS, EVENT, SOCIAL } from '@/lib/siteConfig'

export default function Footer() {
  return (
    <footer className="border-t border-gold-subtle bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Marca */}
          <div>
            <Logo variant="h" height={56} sizeClassName="h-12 sm:h-14 w-auto" className="mb-5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {EVENT.fullName}.<br />
              {EVENT.datesLong}.<br />
              {EVENT.venue}.
            </p>
            <p className="mono text-xs text-gold/70 mt-4 tracking-widest">{EVENT.tagline}</p>
          </div>

          {/* Navegação rápida */}
          <div>
            <p className="section-label mb-5">Navegação</p>
            <ul className="text-sm text-muted-foreground">
              {NAV_ITEMS.map(({ label, href }) => (
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
            <p className="section-label mb-5">Contactos</p>
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
          </div>

          {/* Captação de interesse — os dois formulários que o briefing pede,
              sobre o mesmo sistema, distinguidos pela coluna `source`. */}
          <div className="space-y-8">
            <EmailCapture
              source="v2_newsletter"
              label="Novidades"
              cta="Quero receber"
              hint="Só novidades do ENEEC27. Ao subscrever aceitas a nossa"
            />
            <EmailCapture
              source="v2_early_birds"
              label="Early Birds"
              cta="Avisa-me"
            />
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-gold-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="mono text-xs text-muted-foreground/70">
            © 2027 ENEEC27 / {EVENT.organizerFull}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href={ROUTES.privacidade}
              className="mono text-xs text-muted-foreground/70 hover:text-gold transition-colors py-2"
            >
              Política de Privacidade
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
