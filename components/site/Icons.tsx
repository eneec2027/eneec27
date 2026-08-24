// Ícones de linha, no mesmo traço dos sociais (24×24, stroke 1.5, currentColor)
// e no vocabulário do sítio: capacete, grua, ponte — desenho técnico, não
// pictograma cheio. Sem dependência nova: o lucide instalado não traz metade
// destes e os que traz não combinam com a linguagem blueprint.
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

type Props = { size?: number; className?: string }

const svg = ({ size = 28, className = '' }: Props) => ({
  ...base,
  width: size,
  height: size,
  className,
})

/** Estudantes — três figuras, a do meio à frente. */
export function IconEstudantes(p: Props) {
  return (
    <svg {...svg(p)}>
      <circle cx="12" cy="8" r="3" />
      <path d="M6.5 20v-1.5a5.5 5.5 0 0 1 11 0V20" />
      <path d="M5 11.5a2.5 2.5 0 1 1 1.6-4.4M2.5 19v-1a4 4 0 0 1 2.6-3.7" />
      <path d="M19 11.5a2.5 2.5 0 1 0-1.6-4.4M21.5 19v-1a4 4 0 0 0-2.6-3.7" />
    </svg>
  )
}

/** Dias de evento — folha de calendário com quatro marcas. */
export function IconDias(p: Props) {
  return (
    <svg {...svg(p)}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M7.5 14h1.5M11.5 14H13M15.5 14H17M7.5 17.5h1.5" />
    </svg>
  )
}

/** Workshops — capacete de obra. */
export function IconWorkshops(p: Props) {
  return (
    <svg {...svg(p)}>
      <path d="M3 16a9 9 0 0 1 18 0" />
      <path d="M2 16h20v1.5a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 17.5V16Z" />
      <path d="M10 7.6V5.5a1.5 1.5 0 0 1 1.5-1.5h1A1.5 1.5 0 0 1 14 5.5v2.1" />
      <path d="M12 8v8" />
    </svg>
  )
}

/** Visitas técnicas — grua de obra. */
export function IconVisitas(p: Props) {
  return (
    <svg {...svg(p)}>
      <path d="M4 21V6l6 3" />
      <path d="M2 6h18" />
      <path d="M11 3 4 6" />
      <path d="M16 6v5" />
      <path d="M14.5 11h3l-1.5 3-1.5-3Z" />
      <path d="M2 21h8" />
    </svg>
  )
}

/** Festas & convívios — dois copos a brindar. */
export function IconFestas(p: Props) {
  return (
    <svg {...svg(p)}>
      <path d="M5 3h5l-1 7a1.5 1.5 0 0 1-3 0L5 3Z" />
      <path d="M14 3h5l-1 7a1.5 1.5 0 0 1-3 0l-1-7Z" />
      <path d="M7.5 11.5V20M16.5 11.5V20" />
      <path d="M5 20h5M14 20h5" />
    </svg>
  )
}
