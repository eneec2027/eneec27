import { TEASER_VIDEO_URL, TEASER_POSTER_URL } from '@/lib/siteConfig'

// O mesmo leitor em /evento e /descobre. preload="metadata" para não
// descarregar os 17 MB antes de alguém carregar no play; o poster cobre o
// primeiro frame, que é preto.
export default function TeaserVideo({ label }: { label: string }) {
  if (!TEASER_VIDEO_URL) return null
  return (
    <video
      src={TEASER_VIDEO_URL}
      poster={TEASER_POSTER_URL}
      preload="metadata"
      controls
      playsInline
      aria-label={label}
      className="w-full h-full object-cover"
    />
  )
}
