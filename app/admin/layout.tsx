export const metadata = { title: "Admin — ENEEC'27" }

// Minimal wrapper — sets dark context for all /admin routes.
// The sidebar layout lives in (dashboard)/layout.tsx (authenticated pages only).
// Login page renders here without sidebar.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="dark">{children}</div>
}
