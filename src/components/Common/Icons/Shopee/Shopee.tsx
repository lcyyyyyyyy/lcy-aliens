/**
 * @file src/components/Common/Links/Links.tsx
 */

import Link from 'next/link'
import { SiShopee } from 'react-icons/si'

import styles from './Shopee.module.scss'

const Shopee = () => {
  return (
    <Link
      href='https://shopee.tw/shop/3669883'
      target='_blank'
      className={styles.wrapper}
    >
      <SiShopee size={20} color='#fff' />
    </Link>
  )
}

export default Shopee
