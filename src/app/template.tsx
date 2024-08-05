'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

import styles from './template.module.scss'

import Rocket from '@/components/Common/Icons/Rocket'

import { animatePageIn } from '@/services/animations'

export default function Template({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // console.log(router);

    animatePageIn()
  }, [pathname])

  return (
    <>
      <div>{children}</div>
      <div id='transition-overlay' className={styles.overlay}>
        <div id='loader' className={styles.loader}>
          <Rocket size={80} style={{}} />
          <p>送出囉～</p>
        </div>
      </div>
    </>
  )
}
