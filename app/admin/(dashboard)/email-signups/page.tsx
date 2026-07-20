import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-PT', {
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

export default async function EmailSignupsPage() {
  const { data: signups, error } = await getSupabaseAdmin()
    .from('email_signups')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="p-8">
        <p className="font-mono text-sm text-red-400">Erro: {error.message}</p>
      </div>
    )
  }

  const total = signups?.length ?? 0

  return (
    <div className="p-8 space-y-8">
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold mb-1">ENEEC'27 · Admin</p>
        <h1 className="font-heading text-2xl text-foreground">Email Signups</h1>
      </div>

      <div className="inline-block bg-surface border border-border rounded-sm p-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground mb-1">Total</p>
        <p className="font-mono text-3xl font-bold text-gold">{total}</p>
      </div>

      {total === 0 ? (
        <p className="font-mono text-sm text-muted-foreground">Ainda não há emails registados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                {['Email', 'Data de Registo'].map(h => (
                  <th key={h} className="text-left py-3 px-4 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/70">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {signups?.map(s => (
                <tr key={s.id} className="border-b border-border/40 hover:bg-surface/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-[12px] text-foreground">{s.email}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-muted-foreground/60">{formatDate(s.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
