import Image from 'next/image'
import { Users, Mail, LogOut } from 'lucide-react'
import { AdminNavLink } from '../_components/AdminNavLink'
import { TitleBlock } from '../_components/TitleBlock'
import { logoutAction } from '../login/action'
import { EVENT } from '@/lib/siteConfig'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    // Em ecrãs estreitos a barra passa a topo: 200px fixos ao lado do conteúdo
    // deixavam a tabela com ~150px úteis num telemóvel.
    <div className="flex flex-col md:flex-row md:h-screen bg-background text-foreground md:overflow-hidden">

      <aside className="relative flex flex-col md:w-[216px] shrink-0 bg-bg-sidebar border-b md:border-b-0 md:border-r border-border-dim">
        {/* Papel milimétrico, ao nível de textura e não de padrão. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.55]"
          style={{
            backgroundImage:
              'linear-gradient(var(--border-dim) 1px, transparent 1px), linear-gradient(90deg, var(--border-dim) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative flex flex-col md:h-full">
          {/* Cabeçalho */}
          <div className="flex items-center gap-2.5 px-4 h-14 border-b border-border-dim">
            <Image src="/logo-dark-theme.png" alt="" width={28} height={28} className="rounded-sm" />
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-foreground uppercase">
              Admin
            </span>
            <span aria-hidden className="ml-auto md:hidden h-4 w-px bg-border-dim" />
          </div>

          {/* Navegação */}
          <nav aria-label="Secções do painel" className="flex md:flex-col md:py-4 md:space-y-0.5">
            <AdminNavLink href="/admin/candidaturas">
              <Users size={13} strokeWidth={1.5} />
              Candidaturas
            </AdminNavLink>
            <AdminNavLink href="/admin/email-signups">
              <Mail size={13} strokeWidth={1.5} />
              Newsletter
            </AdminNavLink>

            <form action={logoutAction} className="md:hidden ml-auto">
              <button
                type="submit"
                className="flex items-center gap-2 h-full px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/60 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60 focus-visible:ring-inset"
              >
                <LogOut size={13} strokeWidth={1.5} />
                <span className="sr-only sm:not-sr-only">Sair</span>
              </button>
            </form>
          </nav>

          {/* Legenda + saída, ao fundo da folha */}
          <div className="hidden md:block mt-auto p-3 pb-4 space-y-2">
            <TitleBlock
              edition={EVENT.edition}
              month={EVENT.month}
              venue={EVENT.city}
            />
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex items-center gap-2.5 w-full px-2.5 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/50 hover:text-foreground transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60"
              >
                <LogOut size={12} strokeWidth={1.5} />
                Terminar sessão
              </button>
            </form>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0 md:overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
