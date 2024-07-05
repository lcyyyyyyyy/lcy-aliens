import { Client } from '@notionhq/client'

  const token = process.env.NEXT_PUBLIC_NOTION_TOKEN
  const notion = new Client({ auth: token })

const Product = async ({
  params
}: {
  params: { id: string }
}) => {
  const response = await notion.pages.retrieve({ page_id: params.id })

  return (
    <main>
      <p>{params?.id}</p>
    </main>
  )
}

export async function generateStaticParams() {
  const id = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID!
  const pages = await notion.databases.query({ database_id: id })
  const data = pages.results ?? []

  return data.map((page) => ({
    id: page.id
  }))
}

export default Product
