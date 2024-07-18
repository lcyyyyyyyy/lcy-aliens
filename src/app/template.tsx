'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import styles from './template.module.scss'

import { animatePageIn } from '@/services/animations'

export default function Template({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  useEffect(() => {
    animatePageIn()
  }, [pathname])

  return (
    <>
      <div>{children}</div>
      <div id='transition-overlay' className={styles.overlay} />
    </>
  )
}
