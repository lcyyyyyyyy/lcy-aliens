/**
 * @file src/components/Content/Content.tsx
 */

'use client'

import { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import styles from './Items.module.scss'

import { formatter, getRandom } from '@/services/utils'
import { animatePageOut } from '@/services/animations'

interface props {
  data: Array<object>
}

const Items = ({
  data
}: props) => {
  const router = useRouter()
  const container = useRef(null)

  const onClick = (path: string) => {
    animatePageOut(path, router, false)
  }

  useEffect(() => {
    const images = document.querySelectorAll(`.${styles.image}`)
    for (let i = 0; i < images.length; i++) {
      const image: any = images[i]
      image.style.borderRadius = `${getRandom(2, 3) * 10}% ${getRandom(2, 3) * 10}% ${getRandom(2, 3) * 10}% ${getRandom(2, 3) * 10}%`
    }
  }, [data])

  return (
    <div
      id='items'
      ref={container}
      className={styles.wrapper}
    >
      {data
        .map((item: any) => {
          const properties = item?.properties
          const id = item?.id
          const name = properties?.Name?.title[0]?.text.content
          const files = properties?.Images?.files
          const price = properties?.Price?.number
          const image = files[0]?.external?.url
          const status = properties?.Status?.status?.name
          const discount = properties?.Discount?.number

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
                <p className={discount ? styles.sale : undefined}>
                  {`NT${formatter.format(discount ? price * (1 - discount) : price)}`}
                </p>
              }
            </div>
          )
        })}
    </div>
  )
}

export default Items
