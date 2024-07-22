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
  const pages = await notion.databases.query({ database_id: id })
  const data = pages.results ?? []

  let tagArray: any = []

  data.forEach((item: any, i) => {
    const properties = item.properties
    const itemTags = properties?.Tags?.multi_select

    itemTags.forEach((tag: { name: string }) => {
      if (!tagArray.includes(tag.name)) return tagArray.push(tag.name)
    })
  })

  return tagArray.map((tag: nay) => ({
    name: tag
  }))
}

export default Tag
