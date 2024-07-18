import { Client } from '@notionhq/client'

import Content from '@/components/Product/Content/Content'

const token = process.env.NEXT_PUBLIC_NOTION_TOKEN
const notion = new Client({ auth: token })

const Product = async ({
  params
}: {
  params: { id: string }
}) => {
  const response: any = await notion.pages.retrieve({ page_id: params.id })
  const data = response?.properties

  return (
    <main>
      <Content data={data} />
    </main>
  )
}

export const generateStaticParams = async () => {
  const id = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID!
  const pages = await notion.databases.query({ database_id: id })
  const data = pages.results ?? []

  return data.map((page) => ({
    id: page.id
  }))
}

export default Product
