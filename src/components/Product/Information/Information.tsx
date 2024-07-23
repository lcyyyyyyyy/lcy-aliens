/**
 * @file src/app/products/[id]/page.tsx
 */

'use client'

import { useRef, useEffect } from 'react'
import { FcLike } from 'react-icons/fc'
import { useGSAP } from '@gsap/react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import styles from './Information.module.scss'

import { formatter, getRandom } from '@/services/utils'
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
  const description = data?.Description?.rich_text[0]?.text?.content

  // Status
  const status = data?.Status?.status
  const statusColor = status.color === 'green' ? '#63987a' : status.color === 'red' ? '#d7a5a0' : '#5a5a5a'

  // Price
  const price = data?.Price?.number
  const discount = data?.Discount?.number

  // Links
  const linkFM = data?.FM?.url
  const link711 = data['711']?.url

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

      {status?.name === 'On Sale' &&
        <div className={styles.links}>
          {link711 &&
            <a
              href={link711}
              target='_blank'
              className={`${styles.link} ${styles.seven}`}
            >
              賣貨便
            </a>
          }
          {linkFM &&
            <a
              href={linkFM}
              target='_blank'
              className={`${styles.link} ${styles.fm}`}
            >
              好賣+
            </a>
          }
        </div>
      }

      {description &&
        <div
          style={{ borderRadius: `${getRandom(2, 3) * 10}% ${getRandom(2, 4) * 10}% ${getRandom(2, 3) * 10}% ${getRandom(2, 4) * 10}%` }}
          className={styles.description}
        >
          <p dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      }

      <div
        style={{ borderRadius: `${getRandom(2, 3) * 10}% ${getRandom(2, 4) * 10}% ${getRandom(2, 3) * 10}% ${getRandom(2, 4) * 10}%` }}
        className={styles.note}
      >
        <p>
          所有商品皆不接受退換貨
          <br />
          請詳閱商品描述
          <br />
          下單即同意此說明
          <br />
          有任何疑問請使用網站提供之LINE官方帳號詢問
          <FcLike style={{ marginLeft: 5 }} />
        </p>
      </div>
    </div>
  )
}

export default Information
