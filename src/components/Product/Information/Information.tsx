/**
 * @file src/app/products/[id]/page.tsx
 */

'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import Image from 'next/image'
import ScrollTrigger from 'gsap/ScrollTrigger'

import styles from './Information.module.scss'

import { formatter } from '@/services/utils'
import { animatePageOut } from '@/services/animations'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface props {
  data: any
}

const Information = ({
  data
}: props) => {
  const router = useRouter()
  const container = useRef(null)
  const tags = data?.Tags?.multi_select
  const name = data?.Name?.title[0]?.plain_text
  const status = data?.Status?.status
  const statusColor = status.color === 'green' ? '#63987a' : status.color === 'red' ? '#d7a5a0' : '#5a5a5a'
  const price = data?.Price?.number
  const discount = data?.Discount?.number

  useEffect(() => {
    console.log(data)
  }, [data])

  useGSAP(() => {

  }, { scope: container, dependencies: [data] })

  const handleTagClicked = (name: string) => {
    animatePageOut(`/tags/${(encodeURIComponent(name))}`, router)
  }

  return (
    <div
      ref={container}
      className={styles.wrapper}
    >
      <div className={styles.name}>{name}</div>
      <div className={styles.status}>
        <p style={{ backgroundColor: statusColor }}>{status?.name}</p>
      </div>
      {(price && status?.name !== 'Not for Sale') &&
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

      <div className={styles.tags}>
        {tags.map((item: any) => {
          const isFilterTag = item?.name.match(/\//ig)
          const tagName = isFilterTag ? item?.name.split(/\//ig)[1] : item?.name

          return (
            <div
              key={item?.name}
              onClick={() => handleTagClicked(item?.name)}
              className={styles.tag}
            >
              #{tagName}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Information
