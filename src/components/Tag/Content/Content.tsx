/**
 * @file src/app/tags/[name]/page.tsx
 */

'use client'

import { useState, useEffect } from 'react'

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

  useEffect(() => {
    console.log(data);
  }, [data])

  return (
    <>
      <Items data={data} />
      <Title title={title} />
    </>
  )
}

export default Content
