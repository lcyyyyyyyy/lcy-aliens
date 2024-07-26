/**
 * @file src/components/Common/Links/Links.tsx
 */

import Link from 'next/link'
import { AiFillInstagram } from 'react-icons/ai'

import styles from './Instagram.module.scss'

const Instagram = () => {
  const LinearGradient = () => {
    return (
      <svg width='0' height='0'>
        <linearGradient id='instagram-gradient' x1='100%' y1='100%' x2='0%' y2='0%'>
          <stop stopColor='#fc2f57' offset='0%' />
          <stop stopColor='#fec900' offset='40%' />
          <stop stopColor='#fd21b1' offset='70%' />
          <stop stopColor='#7b24ff' offset='100%' />
        </linearGradient>
      </svg>
    )
  }

  return (
    <div className={styles.wrapper}>
      <LinearGradient />
      <Link href='https://www.instagram.com/pizzaplanetaliens/' target='_blank'>
        <AiFillInstagram size={38} color='#222' style={{ fill: 'url(#instagram-gradient)' }} />
      </Link>
    </div>
  )
}

export default Instagram
