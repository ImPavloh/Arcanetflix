import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer } from '@/components/Footer'
import { ScrollIndicators } from '@/components/ScrollIndicator'
import { Navigation } from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Arcane: League of Legends',
    template: '%s | Arcane',
  },
  description:
    'Explora el mundo de Arcane, la serie de animación ambientada en el universo de League of Legends.',
  keywords: [
    'Arcane',
    'ArcaneSeason2',
    'League of Legends',
    'Riot Games',
    'Netflix',
    'Serie de TV',
    'Serie de animación',
    'Arcane Netflix',
    'Arcane Riot Games',
    'LoL',
    'Animación',
    'Serie',
    'Vi',
    'Jinx',
    'Ekko',
    'Silco',
    'Heimerdinger',
    'Jayce',
    'Viktor',
    'Caitlyn',
    'Powder',
    'Ezreal',
    'Hextech',
    'Zaun',
    'Piltover',
    'Zaun',
    'TimeBomb',
    'Pavloh',
  ],
  authors: [{ name: 'Pavloh' }],
  creator: 'Pavloh',
  publisher: 'Riot Games',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Arcane: League of Legends',
    description:
      'Explora el mundo de Arcane, la serie de animación ambientada en el universo de League of Legends.',
    url: 'https://arcanetflix.vercel.app',
    siteName: 'Arcane Fan Website',
    images: [
      {
        url: 'https://arcanetflix.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Arcane: League of Legends',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arcane: League of Legends',
    description:
      'Explora el mundo de Arcane, la serie de animación ambientada en el universo de League of Legends.',
    creator: '@impavloh',
    images: ['https://arcanetflix.vercel.app/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://arcanetflix.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-arcane-dark `}
      >
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,180,216,0.15),transparent_70%)]" />
        <Navigation />
        <ScrollIndicators />
        <main className="flex-grow relative">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
