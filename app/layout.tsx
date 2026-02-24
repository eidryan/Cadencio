import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cadencio — Controle de presença para estúdios e academias',
  description: 'Presença, turmas e alunos num só lugar. Feito para estúdios de dança, pilates, yoga e academias. Beta gratuito.',
  openGraph: {
    title: 'Cadencio — Seu estúdio organizado, sem papel, sem planilha.',
    description: 'Controle de presença, turmas e alunos num só lugar. Beta gratuito para os primeiros estúdios.',
    type: 'website',
    url: 'https://cadencio.app',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
