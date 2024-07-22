/**
 * @file src/components/Tag/Content/Content.tsx
 */

import styles from './Title.module.scss'

interface props {
  title: string
}

const Title = ({
  title
}: props) => {
  return (
    <div className={styles.wrapper}>{title.split(/\//ig)[1] ?? title}</div>
  )
}

export default Title
