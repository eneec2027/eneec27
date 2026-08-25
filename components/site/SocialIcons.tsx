// Ícones inline, no mesmo traço da V1 (stroke 1.5, 24×24). O lucide-react
// instalado não exporta os ícones de marca, e não vale a pena uma dependência
// nova para três caminhos SVG.
const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function IconInstagram() {
  return (
    <svg {...base}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconLinkedIn() {
  return (
    <svg {...base}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function IconTikTok() {
  return (
    <svg {...base}>
      <path d="M15 3v9.5a4.5 4.5 0 1 1-4-4.47" />
      <path d="M15 3a5 5 0 0 0 5 5" />
    </svg>
  )
}
