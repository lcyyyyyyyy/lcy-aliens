'use client'

import Image from 'next/image'
import styles from './Items.module.scss'
import { useEffect } from 'react'

interface props {
  data: Array<object>
}

const Items = (
  {
    data
  }: props
) => {
  return (
    <div className={styles.wrapper}>
      {data.map((item: any) => {
        const files = item.properties?.images?.files

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
            <p>{item.properties?.Name?.title[0]?.text.content}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Items
