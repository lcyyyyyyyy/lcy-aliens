import gsap from 'gsap'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export const animatePageIn = () => {
  const tl = gsap.timeline()
  const overlay = document.getElementById('transition-overlay')

  tl
    .set(overlay, {
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)'
    })
    .to(overlay, {
      ease: 'power4.inOut',
      delay: 0.5,
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
      duration: 1
    })
}

export const animatePageOut = (
  path: string,
  router: AppRouterInstance,
  scroll: boolean
) => {
  const tl = gsap.timeline()
  const overlay = document.getElementById('transition-overlay')

  tl
    .to(overlay, {
      ease: 'power4.inOut',
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1,
      onComplete: () => {
        router.push(path, { scroll: scroll ?? false })
      }
    })
}

const tlFloat = gsap.timeline({ repeat: -1 }).pause()

export const animateLoadingStart = () => {
  const tl = gsap.timeline()
  const rocket: any = document.getElementById('loader')?.querySelector('svg')
  const overlay = document.getElementById('transition-overlay')

  gsap
    .set(rocket, {
      x: -100,
      y: 100
    })

  tlFloat
    .to(rocket, {
      y: -30,
      rotation: -5,
      duration: 2
    })
    .to(rocket, {
      y: 30,
      rotation: 5,
      duration: 2
    })
    .to(rocket, {
      y: 0,
      rotation: 0,
      duration: 2
    })

  tl
    .to(overlay, {
      ease: 'power4.inOut',
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1
    })
    .to(rocket, {
      x: 0,
      y: 0,
      ease: 'power4.inOut',
      opacity: 1,
      duration: 2,
      onComplete: () => {
        tlFloat.resume()
      }
    })
}

export const animateLoadingEnd = (
  path: string,
  router: AppRouterInstance
) => {
  const tl = gsap.timeline().pause()
  const text: any = document.getElementById('loader')?.querySelector('p')
  const rocket: any = document.getElementById('loader')?.querySelector('svg')
  const overlay = document.getElementById('transition-overlay')

  tlFloat
    .set(rocket, {
      repeat: 0
    })
    .to(rocket, {
      x: '+=300',
      y: '-=300',
      opacity: 0,
      rotation: 0,
      duration: 2
    })
    // .to(rocket, {
    //   x: -100,
    //   y: 100
    // })
    .to(text, {
      delay: -1.8,
      opacity: 1,
      duration: 0.5
    })
    .to(text, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        tlFloat.pause()
        if (path === 'back') router.back()
        else  if (path !== '') router.push(path, { scroll: false })
        tl.resume()
      }
    })

  // tl
  //   .set(overlay, {
  //     clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)'
  //   })
  //   .to(overlay, {
  //     ease: 'power4.inOut',
  //     clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
  //     duration: 1,
  //     onComplete: () => {
  //       tlFloat.pause()
  //     }
  //   })
}
