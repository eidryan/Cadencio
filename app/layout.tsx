import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Outfit, Cormorant_Garamond, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const cormorantGaramond = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], style: ['normal', 'italic'], variable: '--font-cormorant' })
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Cadencio — Precisão em Gestão',
  description: 'Controle de presença e gestão de turmas com precisão milimétrica.',
  openGraph: {
    title: 'Cadencio — Precisão em Gestão',
    description: 'Controle de presença e gestão de turmas.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${plusJakartaSans.variable} ${outfit.variable} ${cormorantGaramond.variable} ${ibmPlexMono.variable} font-sans antialiased text-[#1A1A1A] bg-[#F2F0E9] selection:bg-[#2E4036]/20 overflow-x-hidden`} suppressHydrationWarning>
        {/* SVG filter for noise overlay */}
        <svg className="pointer-events-none fixed isolate z-50 opacity-5 mix-blend-soft-light" width="100%" height="100%">
          <filter id="pedroduartenoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#pedroduartenoise)" />
        </svg>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
