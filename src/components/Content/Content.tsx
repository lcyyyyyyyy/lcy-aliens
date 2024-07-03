'use client'

import { useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import Items from '@/components/Items/Items'
import Filters from '@/components/Filters/Filters'

import styles from './Content.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface props {
  data: Array<object>
}

const Content = ({
  data
}: props) => {
  const count = data.length
  const [tags, setTags] = useState([])
  const [items, setItems] = useState(data)
  const [filter, setFilter] = useState('')

  // Filter tags
  useEffect(() => {
    let tagArray: any = []

    data.forEach((item: any, i) => {
      const properties = item.properties
      const itemTags = properties?.Tags?.multi_select

      itemTags.forEach((tag: { name: string }) => {
        return tagArray.push(tag.name)
      })
    })

    const counts: any = {}
    let array: object[] = []
    let otherItem = {}

    tagArray.forEach((x: string | number) => { return counts[x] = (counts[x] || 0) + 1 })

    Object.entries(counts)
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

    if (filter === '') setItems(data)
    else {
      data.forEach((item: any, i) => {
        const properties = item.properties
        const itemTags = properties?.Tags?.multi_select
        let tagNames: string[] = []

        itemTags.forEach((tag: { name: string }) => {
          return tagNames.push(tag.name.split(/\//ig)[0])
        })

        if (tagNames.includes(filter)) array.push(item)
      })

      setItems(array)
    }
  }, [data, filter])

  return (
    <>
      <Items data={items} />
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
