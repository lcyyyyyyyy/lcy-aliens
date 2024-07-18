/**
 * @file src/app/products/[id]/page.tsx
 */

'use client'

import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { register } from 'swiper/element/bundle'
import { Draggable } from 'gsap/Draggable'
import gsap from 'gsap'
import Image from 'next/image'
import ScrollTrigger from 'gsap/ScrollTrigger'

import 'swiper/scss'
import styles from './Gallery.module.scss'

gsap.registerPlugin(useGSAP, Draggable, ScrollTrigger)

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
  const container = useRef(null)

  useEffect(() => {
    console.log(data)
  }, [data])

  useGSAP(() => {

    const getRatio = (el: any) => {
      return window.innerHeight / (window.innerHeight + el.offsetHeight)
    }

    const wrapper = document.getElementsByClassName(styles.wrapper)[0]
    const gallery = document.getElementsByClassName(styles.gallery)[0]

    // Parallax vertical
    gsap.fromTo(gallery, {
      y: () => `${-window.innerHeight * getRatio(wrapper)}px`
    }, {
      y: () => `${window.innerHeight * (1 - getRatio(wrapper))}px`,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        end: 'bottom top',
        scrub: true,
        start: () => 'top bottom',
        invalidateOnRefresh: true
      }
    })
  }, { scope: container, dependencies: [data] })

  useEffect(() => {
    const swiperEl: any = swiperRef.current

    const params = {
      speed: 800,
      watchSlidesProgress: true,
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

    if (swiperEl) {
      Object.assign(swiperEl, params)
      swiperEl.initialize()
    }
  }, [])

  return (
    <div ref={container}>
      <div className={styles.wrapper}>
        <div className={styles.gallery}>
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
    </div>
  )
}

export default Gallery
