/**
 * @file src/app/products/[id]/page.tsx
 */

'use client'

import { useRef, useEffect } from 'react'
import { register } from 'swiper/element/bundle'
import Image from 'next/image'

import 'swiper/scss'
import styles from './Gallery.module.scss'

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
      thumbs: {
        swiper: swiperThumbsRef.current
      },
      on: {
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
      Object.assign(swiperThumbsEl, paramsThumbs)
      swiperEl.initialize()
      swiperThumbsEl.initialize()
    }
  }, [])

  return (
    <>
      <div className={styles.wrapper}>
        <div
          ref={galleryRef}
          style={{ borderRadius: `${getRandom(1, 4) * 10}% ${getRandom(2, 3) * 10}% ${getRandom(1, 4) * 10}% ${getRandom(2, 3) * 10}%` }}
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
      </div>

      <div className={styles.thumbs}>
        <swiper-container
          ref={swiperThumbsRef}
          init={false}
        >
          {data.map((item: any) => {
            return (
              <swiper-slide key={item.name}>
                <div
                  style={{ borderRadius: `${getRandom(1, 4) * 10}% ${getRandom(2, 3) * 10}% ${getRandom(1, 4) * 10}% ${getRandom(2, 3) * 10}%` }}
                  className={styles.item}
                >
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
    </>
  )
}

export default Gallery
