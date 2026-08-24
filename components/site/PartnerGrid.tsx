import Image from 'next/image'
import type { Partner } from '@/lib/content'

// Os logos oficiais vêm em tinta escura sobre branco (e alguns em JPEG com fundo
// branco colado). Em vez de os inverter com filtros — que destroem os que têm
// cor — cada um vive numa placa clara, que se lê nos dois temas e respeita as
// normas gráficas de cada entidade.
export default function PartnerGrid({
  partners,
  size = 'md',
}: {
  partners: Partner[]
  size?: 'sm' | 'md' | 'lg'
}) {
  const plate = {
    sm: 'h-20 px-4',
    md: 'h-24 px-6',
    lg: 'h-28 px-8',
  }[size]

  const img = { sm: 40, md: 52, lg: 64 }[size]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {partners.map(({ name, logo, url }) => {
        const plateInner = (
          <div
            className={`${plate} w-full bg-white rounded-sm border border-gold-subtle flex items-center justify-center transition-all duration-200 group-hover:border-gold/50`}
          >
            <Image
              src={logo}
              alt={name}
              width={360}
              height={img * 2}
              style={{ maxHeight: img, width: 'auto' }}
              className="object-contain"
            />
          </div>
        )

        return url ? (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={name}
            className="group"
          >
            {plateInner}
          </a>
        ) : (
          <div key={name} title={name} className="group">
            {plateInner}
          </div>
        )
      })}
    </div>
  )
}
