import Image from "next/image"

import { Client } from '@notionhq/client'

import { prefix } from '../utils/prefix'

import Items from '@/components/Items/Items'

export default async function Home() {
  const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_TOKEN })
  const pages = await notion.databases.query({ database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID! })

  // console.log(pages.results[0].properties.images.files)

  return (
    <main>
      <Items data={pages.results ?? []} />
    </main>
  )
}
