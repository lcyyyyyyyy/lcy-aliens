/**
 * @file src/app/products/[id]/page.tsx
 */

'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import styles from './Information.module.scss'

import Links from '@/components/Common/Links/Links'

import LOL from '@/components/Common/Icons/LOL'
import Form from '@/components/Common/Icons/Form'
import Star from '@/components/Common/Icons/Star'
import Heart from '@/components/Common/Icons/Heart'

import { formatter, getRandom } from '@/services/utils'
import { animatePageOut } from '@/services/animations'

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
  const size = data?.Size?.rich_text[0]?.text?.content
  const links = data?.Links?.rich_text
  const description = data?.Description?.rich_text[0]?.text?.content

  // Status
  const status = data?.Status?.status
  const statusColor = status.color === 'green' ? '#63987a' : status.color === 'red' ? '#d7a5a0' : '#5a5a5a'

  // Price
  const price = data?.Price?.number
  const discount = data?.Discount?.number

  const handleTagClicked = (name: string) => {
    animatePageOut(`/tags/${(encodeURIComponent(name))}`, router, false)
  }

  const handleFormClicked = (path: string) => {
    animatePageOut(path, router, true)
  }

  return (
    <div
      ref={container}
      className={styles.wrapper}
    >
      <div className={styles.name}>{name}</div>

      <div className={styles.status}>
        <p style={{
          borderRadius: `${getRandom(1, 3) * 10}% ${getRandom(1, 3) * 10}% ${getRandom(1, 3) * 10}% ${getRandom(1, 3) * 10}%`,
          backgroundColor: statusColor
        }}>
          {status?.name}
        </p>
      </div>

      {(price && status?.name !== 'Not for Sale') &&
        <div className={styles.price}>
          <p className={discount ? styles.original : undefined}>NT{formatter.format(price)}</p>
          {discount &&
            <>
              <p className={styles.discount}>{(100 - (discount * 100)) * 0.1}折</p>
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

      {(
        (links.length > 0) &&
        (status?.name === 'On Sale')
      ) &&
        <div className={styles.links}>
          {links
            .filter((link: any) => { return link?.text?.link })
            .map((link: any) => {
              const name = link?.text?.content
              return (
                <Link
                  key={link?.text?.link?.url}
                  href={link?.text?.link?.url}
                  style={{ borderRadius: `${getRandom(1, 3) * 10}% ${getRandom(1, 3) * 10}% ${getRandom(1, 3) * 10}% ${getRandom(1, 3) * 10}%` }}
                  target='_blank'
                  className={`${styles.link} ${name === '賣貨便' ? styles.seven : name === '好賣+' ? styles.fm : name === '蝦皮' ? styles.shopee : ''}`}
                >
                  {name}
                </Link>
              )
            })}
        </div>
      }

      {description &&
        <div
          style={{ borderRadius: `${getRandom(2, 3) * 10}% ${getRandom(2, 4) * 10}% ${getRandom(2, 3) * 10}% ${getRandom(2, 4) * 10}%` }}
          className={styles.description}
        >
          {size && <p>{size}</p>}
          <p dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      }

      <div
        style={{ borderRadius: `${getRandom(2, 3) * 10}% ${getRandom(2, 4) * 10}% ${getRandom(2, 3) * 10}% ${getRandom(2, 4) * 10}%` }}
        className={styles.note}
      >
        <p>此網頁用意為整理多年陸續收購之收藏品</p>
        <p>
          <div className={styles.icon}>
            <Star
              size={30}
              color='#fefe8b'
              style={{}}
            />
          </div>
          <span>價格皆以下單賣場顯示為主</span>
        </p>
        <p>
          <span>所有商品皆不接受退換貨</span>
          <div className={styles.icon}>
            <Star
              size={30}
              color='#fefe8b'
              style={{}}
            />
          </div>
        </p>
        <p>請詳閱商品描述</p>
        <p>下單即同意此說明</p>
        <p>
          有任何疑問請使用下方管道詢問
          <div className={styles.icon}>
            <Heart
              size={30}
              color='#f76767'
              style={{}}
            />
          </div>
        </p>

        <div style={{ marginTop: '15px' }}>
          <Links />
        </div>
      </div>

      <div
        style={{ borderRadius: `${getRandom(2, 3) * 10}% ${getRandom(2, 4) * 10}% ${getRandom(2, 3) * 10}% ${getRandom(2, 4) * 10}%` }}
        className={styles.contact}
      >
        <p>
          有關網頁相關建議或疑問都可以透過填寫表單告訴我哦～
          <div className={styles.icon}>
            <LOL
              size={30}
              style={{ lineHeight: '30px' }}
            />
          </div>
        </p>
        <div className={styles.link}>
          <Form
            size={50}
            color='#222'
            style={{
              margin: '0 auto',
              cursor: 'pointer'
            }}
            onClick={() => handleFormClicked('/contact')}
          />
        </div>
      </div>
    </div>
  )
}

export default Information
