'use client'

import {
  useRef,
  useState,
  useEffect
} from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import styles from './Filters.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface props {
  data: Array<object>
  setFilter: Function
}

const Filters = ({
  data,
  setFilter
}: props) => {
  const container = useRef(null)
  const activeFontSize = '20rem'
  const defaultFontSize = '6rem'
  const [splited, setSplited] = useState(false)

  const animateFontSize = (
    target: gsap.TweenTarget,
    fontSize: string
  ) => {
    gsap.to(target, {
      ease: 'power2.out',
      stagger: 0.025,
      duration: 0.5,
      fontSize: fontSize
    })
  }

  const animateItems = (filter: any) => {
    gsap.to('#items', {
      opacity: 0,
      duration: 0.25,
      onComplete: () => {
        setFilter(filter)
        gsap.to('#items', {
          opacity: 1,
          duration: 0.25
        })
      }
    })
  }

  const splitTextIntoSpans = () => {
    const elements = document.querySelectorAll(`.${styles.title}`)
    elements.forEach((element: any) => {
      const text = element?.innerText ?? ''
      element.innerHTML = text
        .split('')
        .map((char: any) => `<span>${char}</span>`)
        .join('')
    })

    setSplited(true)
  }

  useEffect(() => {
    splitTextIntoSpans()
  }, [])

  useEffect(() => {
    const filters = document.querySelectorAll(`.${styles.filter}`)

    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        if (filter.classList.contains('active')) return
        animateFontSize(`.active .${styles.title} span`, defaultFontSize)

        filters.forEach(f => f.classList.remove('active'))
        filter.classList.add('active')

        animateFontSize(`.active .${styles.title} span`, activeFontSize)

        animateItems(filter.getAttribute('data-filter'))
      })
    })
  }, [])

  useGSAP(() => {
    if (splited) animateFontSize(`.active .${styles.title} span`, activeFontSize)
  }, { scope: container, dependencies: [data, splited] })

  return (
    <div ref={container} className={styles.wrapper}>
      <div className={`${styles.filter} active`} data-filter=''>
        <p>(233)</p>
        <div className={styles.title}>
          所有商品
        </div>
      </div>
      <div className={styles.filter} data-filter='Keychain'>
        <p>(39)</p>
        <div className={styles.title}>吊飾</div>
      </div>
      <div className={styles.filter} data-filter='Stuffed Toys'>
        <p>(56)</p>
        <div className={styles.title}>玩偶</div>
      </div>
      <div className={styles.filter} data-filter='Action Figures'>
        <p>(23)</p>
        <div className={styles.title}>公仔</div>
      </div>
    </div>
  )
}

export default Filters
