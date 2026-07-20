import Image from 'next/image'
import { Users, Mail, LogOut } from 'lucide-react'
import { AdminNavLink } from '../_components/AdminNavLink'
import { logoutAction } from '../login/action'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">

      {/* Sidebar */}
      <aside className="flex flex-col w-[200px] shrink-0 bg-bg-sidebar border-r border-border-dim">

        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 h-14 border-b border-border-dim">
          <Image src="/logo-dark.png" alt="ENEEC'27" width={28} height={28} className="rounded-sm" />
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-foreground uppercase">
            Admin
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5">
          <AdminNavLink href="/admin/candidaturas">
            <Users size={13} strokeWidth={1.5} />
            Candidaturas
          </AdminNavLink>
          <AdminNavLink href="/admin/email-signups">
            <Mail size={13} strokeWidth={1.5} />
            Email Signups
          </AdminNavLink>
        </nav>

        {/* Logout */}
        <div className="px-2 pb-4 border-t border-border-dim pt-4">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground/60 hover:text-foreground transition-colors rounded-sm"
            >
              <LogOut size={13} strokeWidth={1.5} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
