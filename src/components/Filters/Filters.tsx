'use client'

import {
  useRef,
  useState,
  useEffect
} from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { IoFilterOutline } from 'react-icons/io5'

import styles from './Filters.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface props {
  tags: Array<object>
  count: Number
  filter: String
  setFilter: Function
}

const Filters = ({
  tags,
  count,
  filter,
  setFilter
}: props) => {
  const container = useRef(null)
  const activeFontSize = '20rem'
  const defaultFontSize = '6rem'
  const [splited, setSplited] = useState(false)

  console.log(count);


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
    if (tags.length > 0) splitTextIntoSpans()
  }, [tags])

  useEffect(() => {
    if (tags.length > 0) {
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
    }
  }, [tags])

  useGSAP(() => {
    if (splited) animateFontSize(`.active .${styles.title} span`, activeFontSize)
  }, { scope: container, dependencies: [tags, filter, splited] })

  return (
    <>
      <div ref={container} className={styles.wrapper}>
        {tags.length > 0 &&
          <>
            <div className={`${styles.filter} active`} data-filter=''>
              <p>{`(${count})`}</p>
              <div className={styles.title}>所有商品</div>
            </div>
            {tags.map((tag: any) => {
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
        <div className={styles.icon}>
          <IoFilterOutline size={26} />
        </div>
        <select
          onChange={(e: { target: any }) => animateItems(e.target[e.target.selectedIndex].value)}
          defaultValue=''
        >
          <option value=''>所有商品</option>
          {tags.map((tag: any) => {
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
      </div>
    </>
  )
}

export default Filters
