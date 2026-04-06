import type { Metadata, Viewport } from 'next'
import { Inter, Amiri } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _amiri = Amiri({ weight: ["400", "700"], subsets: ["arabic", "latin"], variable: "--font-amiri" })

export const metadata: Metadata = {
  title: 'Salati - Prayer Times',
  description: 'Stay connected to your prayers with accurate times, Qibla direction, Hijri calendar, and spiritual guidance in multiple languages.',
  generator: 'v0.app',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1f3a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_inter.variable} ${_amiri.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
