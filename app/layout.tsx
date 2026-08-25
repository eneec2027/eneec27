import type { Metadata } from "next"
import { Libre_Baskerville, Inter, IBM_Plex_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { EVENT } from "@/lib/siteConfig"
import "./globals.css"

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "700"],
  style: ["normal", "italic"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "600", "700"],
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  // Sem metadataBase, o Next avisa e as imagens de partilha saem com caminho
  // relativo — que nenhuma rede social sabe resolver.
  metadataBase: new URL("https://eneec.pt"),
  title: `${EVENT.name} — ${EVENT.fullName}`,
  description:
    `O ${EVENT.fullName}. ${EVENT.city}, ${EVENT.datesLong}. ${EVENT.tagline}.`,
  keywords: ["ENEEC", "engenharia civil", "estudantes", "Aveiro", "2027", "NEBEC"],
  openGraph: {
    title: `${EVENT.name} — ${EVENT.fullName}`,
    description: `${EVENT.datesLong}. ${EVENT.venue}.`,
    type: "website",
    locale: "pt_PT",
    siteName: EVENT.name,
    url: "https://eneec.pt",
    images: [
      {
        url: "/og-eneec27.png",
        width: 1200,
        height: 630,
        alt: `${EVENT.name} — ${EVENT.datesLong}, ${EVENT.venue}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${EVENT.name} — ${EVENT.fullName}`,
    description: `${EVENT.datesLong}. ${EVENT.venue}.`,
    images: ["/og-eneec27.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt"
      className={`${libreBaskerville.variable} ${inter.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
