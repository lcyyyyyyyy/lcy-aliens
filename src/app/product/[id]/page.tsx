import { Client } from '@notionhq/client'

import Content from '@/components/Content/Content'

const Product = async ({ params }: { params: { id: string } }) => {

  return (
    <main>
      <p>{params.id}</p>
    </main>
  )
}

export default Product
