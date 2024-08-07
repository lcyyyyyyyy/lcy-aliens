/**
 * @file src/app/products/[id]/page.tsx
 */

'use client'

import { useRef, useState, useEffect } from 'react'
import { register } from 'swiper/element/bundle'
import Image from 'next/image'

import 'swiper/scss'
import styles from './Gallery.module.scss'

import Pagination from './Pagination/Pagination'

import { getRandom } from '@/services/utils'

register()

interface props {
  data: any,
  name: string
}

const Gallery = ({
  data,
  name
}: props) => {
  const swiperRef = useRef(null)
  const galleryRef = useRef(null)
  const swiperThumbsRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(1)
  let scrollTop = 0

  const handleScroll = () => {
    scrollTop = window.scrollY
    const swiper: any = swiperRef.current
    if (swiper) swiper.style.transform = `translateY(${scrollTop * 0.5}px) scale(1.05)`
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', () => handleScroll)
  }, [])

  useEffect(() => {
    const swiperEl: any = swiperRef.current
    const swiperThumbsEl: any = swiperThumbsRef.current

    const params = {
      speed: 800,
      watchSlidesProgress: true,
      thumbs: data?.length > 1 ? {
        swiper: swiperThumbsRef.current
      } : false,
      on: {
        init: () => {
          const thumbs: any = swiperThumbsRef.current
          const gallery: any = galleryRef.current

          if (gallery) gallery.style.borderRadius = `${getRandom(1, 4) * 10}% ${getRandom(2, 3) * 10}% ${getRandom(1, 4) * 10}% ${getRandom(2, 3) * 10}%`

          if (thumbs) {
            const items = thumbs.querySelectorAll(`.${styles.item}`)

            for (let i = 0; i < items.length; i++) {
              const item = items[i]
              item.style.borderRadius = `${getRandom(1, 4) * 10}% ${getRandom(2, 3) * 10}% ${getRandom(1, 4) * 10}% ${getRandom(2, 3) * 10}%`
            }
          }
        },
        progress: (swiper: { slides: { progress: any }[]; width: number }, progress: any) => {
          const slides = swiper.slides
          for (let i = 0; i < slides.length; i++) {
            const element: any = slides[i]
            const slideProgress = swiper.slides[i].progress
            const innerOffset = swiper.width * 0.2
            const innerTranslate = slideProgress * innerOffset
            element.querySelector(`.${styles.backgroundImage}`).style.transform = `translateX(${innerTranslate}px)`
          }
        },
        setTransition: (swiper: { slides: any }, transition: any) => {
          const slides = swiper.slides
          for (let i = 0; i < slides.length; i++) {
            const element = slides[i]
            element.style.transition = `${transition}ms`
            element.querySelector(`.${styles.backgroundImage}`).style.transition = `${transition}ms`
          }
        },
        activeIndexChange: (swiper: any) => {
          setActiveIndex(swiper.activeIndex + 1)
        }
      }
    }

    const paramsThumbs = {
      speed: 800,
      spaceBetween: 15,
      slidesPerView: 5,
      centerInsufficientSlides: true
    }

    if (swiperEl) {
      Object.assign(swiperEl, params)
      swiperEl.initialize()

      if (swiperThumbsEl) {
        swiperThumbsEl.initialize()
        Object.assign(swiperThumbsEl, paramsThumbs)
      }
    }
  }, [])

  return (
    <>
      <div className={styles.wrapper}>
        <div
          ref={galleryRef}
          className={styles.gallery}
        >
          <swiper-container
            ref={swiperRef}
            init={false}
          >
            {data.map((item: any) => {
              return (
                <swiper-slide key={item.name}>
                  <div className={styles.item}>
                    <figure
                      style={{ backgroundImage: `url(${item.name})` }}
                      className={styles.backgroundImage}
                    >
                      <Image
                        alt={name}
                        src={item.name}
                        fill={true}
                        sizes='100%'
                      />
                    </figure>
                  </div>
                </swiper-slide>
              )
            })}
          </swiper-container>
        </div>

        {data?.length > 1 &&
          <Pagination
            total={data?.length}
            active={activeIndex}
          />
        }
      </div>

      {data?.length > 1 &&
        <div className={styles.thumbs}>
          <swiper-container
            ref={swiperThumbsRef}
            init={false}
          >
            {data.map((item: any) => {
              return (
                <swiper-slide key={item.name}>
                  <div className={styles.item}>
                    <figure
                      style={{ backgroundImage: `url(${item.name})` }}
                      className={styles.backgroundImage}
                    >
                      <Image
                        alt={name}
                        src={item.name}
                        fill={true}
                        sizes='100%'
                      />
                    </figure>
                  </div>
                </swiper-slide>
              )
            })}
          </swiper-container>
        </div>
      }
    </>
  )
}

export default Gallery
