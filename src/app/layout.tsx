import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Short_Stack } from 'next/font/google'
import '../styles/default.scss'

const short_Stack = Short_Stack({ weight: '400', subsets: ['latin'] })

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
      <body className={short_Stack.className}>
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </body>
    </html>
  )
}
