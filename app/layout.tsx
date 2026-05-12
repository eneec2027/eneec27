import type { Metadata } from "next"
import { Space_Grotesk, Space_Mono } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
})

const spaceMono = Space_Mono({
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
    <html lang="pt" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
