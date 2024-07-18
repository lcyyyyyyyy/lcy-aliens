/**
 * @file src/app/products/[id]/page.tsx
 */

'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import ScrollTrigger from 'gsap/ScrollTrigger'

import styles from './Information.module.scss'


gsap.registerPlugin(useGSAP, ScrollTrigger)

interface props {
  data: object
}

const Information = ({
  data
}: props) => {
  const container = useRef(null)

  useGSAP(() => {
   
  }, { scope: container, dependencies: [data] })

  return (
    <div
      ref={container}
      className={styles.wrapper}
    >
      Information
    </div>
  )
}

export default Information
