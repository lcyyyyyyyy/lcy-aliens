'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import styles from './template.module.scss'

import Burst from '@/components/Common/Icons/Burst'
import Rocket from '@/components/Common/Icons/Rocket'

import { animatePageIn } from '@/services/animations'

export default function Template({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  useEffect(() => {
    document.fonts.ready.then(() => {
      animatePageIn()
    })
  }, [pathname])

  return (
    <>
      <div>{children}</div>
      <div id='transition-overlay' className={styles.overlay}>
        <div id='loader' className={styles.loader}>
          <div className={styles.icon}>
            <Rocket size={80} style={{}} />
          </div>
          <div className={styles.icon}>
            <Burst size={80} style={{}} />
          </div>
          <p id='failed'>
            送出失敗哦！
            <br />
            再試一次吧～
          </p>
          <p id='submitted'>送出囉～</p>
        </div>
      </div>
    </>
  )
}
