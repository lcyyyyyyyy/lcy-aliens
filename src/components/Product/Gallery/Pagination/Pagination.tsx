/**
 * @file src\components\Product\Gallery\Gallery.tsx
 */

import styles from './Pagination.module.scss'

interface props {
  total: number,
  active: number
}

const Pagination = ({
  total,
  active
}: props) => {
  return (
    <div className={styles.wrapper}>{active} / {total}</div>
  )
}

export default Pagination
