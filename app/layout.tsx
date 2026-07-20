import type { Metadata } from "next"
import { Libre_Baskerville, Inter, IBM_Plex_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
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
  title: "ENEEC'27 — Encontro Nacional de Estudantes de Engenharia Civil",
  description:
    "O Encontro Nacional de Estudantes de Engenharia Civil. Aveiro, março de 2027. Construção em Movimento.",
  keywords: ["ENEEC", "engenharia civil", "estudantes", "Aveiro", "2027", "NEBEC"],
  openGraph: {
    title: "ENEEC'27",
    description: "Construção em Movimento. Aveiro, março de 2027.",
    type: "website",
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
