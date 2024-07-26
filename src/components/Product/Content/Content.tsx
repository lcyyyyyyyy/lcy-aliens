/**
 * @file src/app/products/[id]/page.tsx
 */

'use client'

import { useState, useEffect } from 'react'

import Gallery from '../Gallery/Gallery'
import Information from '../Information/Information'

interface props {
  data: any
}

const Content = ({
  data
}: props) => {
  const [images, setImages] = useState<Array<object>>([])

  useEffect(() => {
    setImages(data?.Images?.files)
  }, [data])

  return (
    images.length > 0 &&
    <>
      <Gallery
        data={images}
        name={data?.Name?.title[0]?.text.content}
      />
      <Information data={data} />
    </>
  )
}

export default Content
