'use client'

import { useRef, useState, useEffect } from 'react'
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
  const [items, setItems] = useState(data)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    let array: object[] = []

    if (filter === '') setItems(data)
    else {
      data.forEach((item: any, i) => {
        const properties = item.properties
        const tags = properties?.Tags?.multi_select
        let tagNames: string[] = []
        tags.forEach((tag: { name: string }) => { return tagNames.push(tag.name) })
        if (tagNames.includes(filter)) array.push(item)
      })

      setItems(array)
    }
  }, [data, filter])

  return (
    <>
      <Items data={items} />
      <Filters data={data} setFilter={setFilter} />
    </>
  )
}

export default Content
