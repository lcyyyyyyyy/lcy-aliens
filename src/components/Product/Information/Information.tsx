/**
 * @file src/app/products/[id]/page.tsx
 */

'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import ScrollTrigger from 'gsap/ScrollTrigger'

import styles from './Information.module.scss'

import { formatter } from '@/services/utils'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface props {
  data: any
}

const Information = ({
  data
}: props) => {
  const container = useRef(null)
  const name = data?.Name?.title[0]?.plain_text
  const status = data?.Status?.status
  const statusColor = status.color === 'green' ? '#2b593f' : status.color === 'red' ? '#6e3630' : '#5a5a5a'
  const price = data?.Price?.number
  const discount = data?.Discount?.number
  console.log(discount);


  useEffect(() => {
    console.log(data)
  }, [data])

  useGSAP(() => {

  }, { scope: container, dependencies: [data] })

  return (
    <div
      ref={container}
      className={styles.wrapper}
    >
      <div className={styles.name}>{name}</div>
      <div className={styles.status}>
        <p style={{ backgroundColor: statusColor }}>{status?.name}</p>
      </div>
      {price &&
        <div className={styles.price}>
          <p className={discount ? styles.original : undefined}>NT{formatter.format(price)}</p>
          {discount &&
            <>
              <p className={styles.discount}>{100 - (discount * 100)}折</p>
              <p className={styles.sale}>NT{formatter.format(price * (1 - discount))}</p>
            </>
          }
        </div>
      }
    </div>
  )
}

export default Information
