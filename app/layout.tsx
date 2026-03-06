import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { EdgeDecorations } from '@/components/edge-decorations'
import { ScrollBirds } from '@/components/scroll-birds'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Cadencio',
  description: 'Controle de presença e gestão de turmas para estúdios de dança, pilates e artes marciais. Grátis no beta.',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Cadencio',
    description: 'Controle de presença e gestão de turmas para estúdios de dança, pilates e artes marciais. Grátis no beta.',
    siteName: 'Cadencio',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 180,
        height: 180,
        alt: 'Cadencio',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Cadencio',
    description: 'Controle de presença e gestão de turmas para estúdios de dança, pilates e artes marciais. Grátis no beta.',
    images: ['/opengraph-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased text-[#1C1917] bg-[#FFFFFF] selection:bg-[#0D7377]/20 overflow-x-hidden`} suppressHydrationWarning>
        <svg className="pointer-events-none fixed isolate z-50 opacity-5 mix-blend-soft-light" width="100%" height="100%">
          <filter id="pedroduartenoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#pedroduartenoise)" />
        </svg>
        <EdgeDecorations />
        <ScrollBirds />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
