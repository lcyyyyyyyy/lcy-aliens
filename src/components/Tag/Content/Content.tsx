/**
 * @file src/app/tags/[name]/page.tsx
 */

import Items from '@/components/Items/Items'
import Title from '@/components/Tag/Title/Title'

interface props {
  data: any,
  title: string
}

const Content = ({
  data,
  title
}: props) => {
  return (
    <>
      <Items data={data} />
      <Title title={title} />
    </>
  )
}

export default Content
