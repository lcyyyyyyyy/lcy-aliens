import { Client } from '@notionhq/client'

import Items from '@/components/Items/Items'

const Home = async () => {
  let data: any[] = []
  const id = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID!
  const token = process.env.NEXT_PUBLIC_NOTION_TOKEN

  try {
    const notion = new Client({ auth: token })
    const pages = await notion.databases.query({ database_id: id })
    data = pages.results ?? []
  } catch (error) {
    console.log(error)
  }

  if (!id || !token) console.log('The secret keys are missing')

  return (
    <main>
      <Items
        data={data}
      />
    </main>
  )
}

export default Home
