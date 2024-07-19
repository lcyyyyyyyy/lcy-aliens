/**
 * @file src/components/Content/Content.tsx
 */

'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import Image from 'next/image'
import ScrollTrigger from 'gsap/ScrollTrigger'

import styles from './Items.module.scss'

import { formatter } from '@/services/utils'
import { animatePageOut } from '@/services/animations'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface props {
  data: Array<object>
}

const Items = ({
  data
}: props) => {
  const router = useRouter()
  const container = useRef(null)

  useGSAP(() => {
    gsap.set(`.${styles.item} img`, {
      scale: 1.1,
      yPercent: -2.5
    })

    gsap.to(`.${styles.item} img`, {
      ease: 'none',
      yPercent: 5,
      scrollTrigger: {
        scrub: true
      }
    })
  }, { scope: container, dependencies: [data] })

  const getRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const onClick = (path: string) => {
    animatePageOut(path, router)
  }

  return (
    <div
      id='items'
      ref={container}
      className={styles.wrapper}
    >
      {data.map((item: any, i) => {
        const properties = item?.properties
        const id = item?.id
        const name = item?.properties?.Name?.title[0]?.text.content
        const files = item?.properties?.Images?.files
        const price = properties?.Price?.number
        const image = files[0]?.external?.url
        const status = properties?.Status?.status?.name

        return (
          <div
            key={item.id}
            className={`${styles.item}${status === 'Sold' ? ` ${styles.sold}` : ''}`}
          >
            <div
              onClick={() => onClick(`/products/${id}`)}
              className={styles.image}
            >
              {files.length > 0 &&
                <Image
                  alt={name}
                  src={image}
                  fill
                  sizes='100%'
                />
              }
            </div>

            {/* Name */}
            {/* <p>{name}</p> */}

            {/* Price */}
            {status !== 'Not for Sale' &&
              <p>{`NT${formatter.format(price)}`}</p>
            }
          </div>
        )
      })}
    </div>
  )
}

export default Items
