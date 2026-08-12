export const metadata = { title: "Admin — ENEEC'27" }

// Nada em /admin pode ser pré-renderizado. As páginas lêem a base de dados com
// a service-role key, que só existe em Production e Development — em Preview o
// prerender rebentava o build inteiro, e não só o /admin. Além disso é um painel
// atrás de autenticação a ler dados vivos: estático nunca foi o comportamento
// certo. Declarado aqui, no layout, para valer também para páginas futuras.
export const dynamic = 'force-dynamic'

// Minimal wrapper — sets dark context for all /admin routes.
// The sidebar layout lives in (dashboard)/layout.tsx (authenticated pages only).
// Login page renders here without sidebar.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="dark">{children}</div>
}
