import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { EdgeDecorations } from '@/components/edge-decorations'
import { ScrollBirds } from '@/components/scroll-birds'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Cadencio | Gestão para Estúdios de Dança',
  description: 'Abandone o papel e as planilhas. Controle presença, turmas e alunos com um clique. Feito para quem administra estúdios, não para quem entende de tecnologia.',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Cadencio | Gestão Simplificada para Estúdios de Dança',
    description: 'A maneira mais fácil de organizar seu estúdio: controle de presença em 1 clique, histórico automático e tudo o que você precisa em um só lugar.',
    siteName: 'Cadencio',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Cadencio - Sistema de Controle para Estúdios',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cadencio | Gestão para Estúdios de Dança',
    description: 'Seu estúdio organizado, sem papel e sem planilha. O controle que você sempre quis, agora na palma da mão.',
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
