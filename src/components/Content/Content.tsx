/**
 * @file src/app/page.tsx
 */

'use client'

import { useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { useSearchParams } from 'next/navigation'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import Items from '@/components/Items/Items'
import Filters from '@/components/Filters/Filters'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface props {
  data: Array<object>
}

const Content = ({
  data
}: props) => {
  const searchParams = useSearchParams()
  const [tags, setTags] = useState<Array<object>>([])
  const [count, setCount] = useState<number>(0)
  const [items, setItems] = useState<Array<object>>([])
  const [filter, setFilter] = useState<string>(searchParams.get('filter') ?? '')

  // Filter tags
  useEffect(() => {
    let tagArray: any = []

    data
      .filter((item: any) => { return item?.properties?.Active?.checkbox })
      .forEach((item: any) => {
        const properties = item.properties
        const itemTags = properties?.Tags?.multi_select

        itemTags.forEach((tag: { name: string }) => {
          return tagArray.push(tag.name)
        })
      })

    const counts: any = {}
    const array: object[] = []
    let otherItem = {}

    tagArray.forEach((x: string | number) => { return counts[x] = (counts[x] || 0) + 1 })

    Object
      .entries(counts)
      .forEach(item => {
        const key = item[0].split('/')?.[0]
        const name = item[0].split('/')?.[1]

        let object = { key: key, name: name, count: item[1] }
        if (key === 'Other') otherItem = object
        else array.push(object)
      })

    array.push(otherItem)
    setTags(array)
  }, [data])

  useEffect(() => {
    let array: object[] = []

    if (filter === '') {
      array = data.filter((item: any) => { return item?.properties?.Active?.checkbox })
      setCount(array.length)
    } else {
      data
        .filter((item: any) => {
          const activeArray = data.filter((item: any) => { return item?.properties?.Active?.checkbox })
          setCount(activeArray.length)
          return item?.properties?.Active?.checkbox
        })
        .forEach((item: any) => {
          const properties = item.properties
          const itemTags = properties?.Tags?.multi_select
          let tagNames: string[] = []

          itemTags.forEach((tag: { name: string }) => {
            return tagNames.push(tag.name.split(/\//ig)[0])
          })

          if (tagNames.includes(filter)) array.push(item)
        })
    }

    setItems(array)
  }, [data, filter])

  return (
    <>
      {items.length > 0 && <Items data={items} />}
      <Filters
        tags={tags}
        count={count}
        filter={filter}
        setFilter={setFilter}
      />
    </>
  )
}

export default Content
