'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import ScrollTrigger from 'gsap/ScrollTrigger'

import styles from './Items.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface props {
  data: Array<object>
}

const Items = ({
  data
}: props) => {
  const container = useRef(null)
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

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

  return (
    <div
      id='items'
      ref={container}
      className={styles.wrapper}
    >
      {data.map((item: any, i) => {
        const properties = item?.properties
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
            <div className={styles.image}>
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
