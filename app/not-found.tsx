import Link from 'next/link'

import { EVENT } from '@/lib/siteConfig'
import { DEFAULT_LANG } from '@/lib/i18n'
import { path } from '@/lib/nav'

export const metadata = {
  title: `Página não encontrada — ${EVENT.name}`,
}

// A 404 vinha sem estilo nenhum. Fica na linguagem do site e devolve o
// visitante à porta de entrada em vez de o deixar num beco.
export default function NotFound() {
  return (
    <main className="min-h-dvh grid-bg flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <p className="section-label mb-5">404</p>
        <h1 className="heading-lg text-foreground mb-4">Esta página não existe.</h1>
        <p className="text-muted-foreground leading-relaxed mb-10">
          O endereço pode ter mudado ou nunca ter existido. O {EVENT.name} continua
          a acontecer em {EVENT.city}, de {EVENT.dates} de 2027.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={path(DEFAULT_LANG)}
            className="inline-flex items-center px-6 py-3 bg-gold text-primary-foreground text-xs font-semibold tracking-widest uppercase mono rounded-sm hover:bg-gold-light transition-colors"
          >
            Voltar ao início
          </Link>
          <Link
            href={path(DEFAULT_LANG, '/contactos')}
            className="inline-flex items-center px-6 py-3 border border-gold/40 text-foreground/80 text-sm rounded-sm hover:border-gold hover:text-foreground transition-all"
          >
            Contactos
          </Link>
        </div>
      </div>
    </main>
  )
}
