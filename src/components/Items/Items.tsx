// import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Client } from '@notionhq/client'

import styles from './Items.module.scss'

const Items = async () => {
  let data: any[] = []

  try {
    const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_TOKEN })
    const pages = await notion.databases.query({ database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID! })
    data = pages.results ?? []
  } catch (error: unknown) {
    console.log('-----error-----');
    console.error(error.toString());

  }



  // const [data, setData] = useState([])

  // const handleGetData = async () => {
  //   const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_TOKEN })
  //   const pages = await notion.databases.query({ database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID! })

  //   setData(pages.results ?? [])
  // }

  // useEffect(() => {
  //   handleGetData()
  // }, [])

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
