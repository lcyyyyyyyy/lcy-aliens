import type { Metadata } from 'next'
import { Suspense } from 'react'
import localFont from 'next/font/local'
import '../styles/default.scss'

const ChenYuluoyan = localFont({ src: '../../public/fonts/ChenYuluoyan-Thin-Monospaced.ttf' })

export const metadata: Metadata = {
  title: 'lcy Store',
  keywords: 'lcy Store,三眼怪,玩具總動員,alien,toy story',
  description: '購買最可愛的三眼怪商品！'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={ChenYuluoyan.className}>
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </body>
    </html>
  )
}
