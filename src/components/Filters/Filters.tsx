/**
 * @file src/components/Content/Content.tsx
 */

'use client'

import {
  useRef,
  useState,
  useEffect
} from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { FaFilter } from 'react-icons/fa6'
import { useSearchParams } from 'next/navigation'

import styles from './Filters.module.scss'

import { getRandom } from '@/services/utils'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface props {
  tags: Array<object>
  count: Number
  filter: string
  setFilter: Function
}

const Filters = ({
  tags,
  count,
  filter,
  setFilter
}: props) => {
  const isProd = process.env.NODE_ENV === 'production'
  const container = useRef(null)
  const searchParams = useSearchParams()
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
      duration: 0.5,
      onComplete: () => {
        setFilter(filter)
        window.scrollTo({ top: 0 })
        gsap.to('#items', {
          opacity: 1,
          duration: 0.5
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

  const clickEvent = (
    filter: any,
    filters: any
  ) => {
    if (filter.classList.contains('active')) return
    animateFontSize(`.active .${styles.title} span`, defaultFontSize)

    filters.forEach((f: any) => f.classList.remove('active'))
    filter.classList.add('active')

    animateFontSize(`.active .${styles.title} span`, activeFontSize)

    const filterValue: string = filter.getAttribute('data-filter') ?? ''

    const params = new URLSearchParams(searchParams.toString())
    params.set('filter', filterValue)

    window.history.pushState(null, '', filterValue === '' ? (isProd && (location?.host === 'lcyyyyyyyy.github.io')) ? '/lcy-aliens' : '/' : `?${params.toString()}`)
  }

  useEffect(() => {
    const selector: any = document.querySelector(`.${styles.selector}`)

    if (selector) {
      selector.style.borderRadius = `${getRandom(1, 3) * 10}% ${getRandom(1, 3) * 10}% ${getRandom(1, 3) * 10}% ${getRandom(1, 3) * 10}%`
    }
  }, [])

  useEffect(() => {
    if (tags.length > 0) {
      const filters: any = document.querySelectorAll(`.${styles.filter}`)
      const filterValue = searchParams.get('filter') ?? ''
      animateItems(filterValue)
      animateFontSize(`.active .${styles.title} span`, defaultFontSize)

      filters.forEach((f: any) => f.classList.remove('active'))
      filters.forEach((item: any) => {
        if (item.getAttribute('data-filter') === filterValue) {
          item.classList.add('active')
          animateFontSize(`.active .${styles.title} span`, activeFontSize)
        }
      })
    }
  }, [searchParams])

  useEffect(() => {
    if (tags.length > 0) splitTextIntoSpans()
  }, [tags])

  useEffect(() => {
    if (splited) {
      const filters = document.querySelectorAll(`.${styles.filter}`)

      filters.forEach(item => {
        if (item.getAttribute('data-filter') === filter) {
          item.classList.add('active')
          animateFontSize(`.active .${styles.title} span`, activeFontSize)
        }

        item.addEventListener('click', () => {
          clickEvent(item, filters)
        })
      })

      if (filter === '') {
        filters[0].classList.add('active')
        animateFontSize(`.active .${styles.title} span`, activeFontSize)
      }
    }
  }, [splited])

  return (
    <>
      <div ref={container} className={styles.wrapper}>
        {tags.length > 0 &&
          <>
            <div className={styles.filter} data-filter=''>
              <p>{`(${count})`}</p>
              <div className={styles.title}>所有商品</div>
            </div>
            {tags
              .filter((tag: any) => { return tag.name !== undefined })
              .map((tag: any) => {
                return (
                  <div
                    key={tag.key}
                    className={styles.filter}
                    data-filter={tag.key}
                  >
                    <p>({tag.count})</p>
                    <div className={styles.title}>{tag.name}</div>
                  </div>
                )
              })}
          </>
        }
      </div>
      <div className={styles.selector}>
        <select
          onChange={(e: { target: any }) => animateItems(e.target[e.target.selectedIndex].value)}
          defaultValue={filter}
        >
          <option value=''>所有商品</option>
          {tags
            .filter((tag: any) => { return tag.name !== undefined })
            .map((tag: any) => {
              return (
                <option
                  key={tag.key}
                  value={tag.key}
                >
                  {tag.name}({tag.count})
                </option>
              )
            })}
        </select>
        <div className={styles.icon}>
          <FaFilter size={18} color='#222222' />
        </div>
      </div>
    </>
  )
}

export default Filters
