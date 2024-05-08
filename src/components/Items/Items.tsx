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

  return (
    <div ref={container} className={styles.wrapper}>
      {data.map((item: any) => {
        const properties = item.properties
        const tags = properties?.Tags?.multi_select
        const name = item.properties?.Name?.title[0]?.text.content
        const files = item.properties?.Images?.files
        const price = properties?.Price?.number

        return (
          <div key={item.id} className={styles.item}>
            <div className={styles.image}>
              {files.length > 0 &&
                <Image
                  alt={item.properties?.Name?.title[0]?.text.content}
                  src={files[0]?.file?.url}
                  fill
                  sizes='100%'
                />
              }
            </div>

            {/* Name */}
            <p>{name}</p>

            {/* Price */}
            {
              tags
                .filter((tag: { name: string }) => { return tag.name !== 'Not for Sale' })
                .map((tag: { id: string }) => {
                  return (
                    <p key={tag.id}>NT${price}</p>
                  )
                })
            }
          </div>
        )
      })}
    </div>
  )
}

export default Items
