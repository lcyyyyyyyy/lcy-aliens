/**
 * @file src/components/Product/Information/Information.tsx
 */

import styles from './Links.module.scss'

import Shopee from '@/components/Common/Icons/Shopee/Shopee'
import Instagram from '@/components/Common/Icons/Instagram/Instagram'

const Links = () => {
  return (
    <div className={styles.wrapper}>
      <Shopee />
      <Instagram />
    </div>
  )
}

export default Links
