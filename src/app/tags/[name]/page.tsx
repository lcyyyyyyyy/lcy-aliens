import { Client } from '@notionhq/client'

import Content from '@/components/Tag/Content/Content'

const id = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID!
const token = process.env.NEXT_PUBLIC_NOTION_TOKEN
const notion = new Client({ auth: token })

const Tag = async ({
  params
}: {
  params: { name: string }
}) => {
  const response: any = await notion.databases.query({
    database_id: id,
    filter: {
      property: 'Tags',
      multi_select: {
        contains: decodeURIComponent(params.name)
      }
    }
  })
  const data = response?.results

  return (
    <main>
      {data.length > 0 && <Content data={data} title={decodeURIComponent(params.name)} />}
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

export default Tag
