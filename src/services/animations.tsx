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
  const burst: any = document.getElementById('icon-burst')
  const rocket: any = document.getElementById('icon-rocket')
  const failed: any = document.getElementById('failed')
  const submitted: any = document.getElementById('submitted')
  const overlay = document.getElementById('transition-overlay')

  tlFloat
    .set(rocket, {
      repeat: 0
    })
    .to(rocket, {
      x: path === 'failed' ? 0 : '+=300',
      y: path === 'failed' ? 0 : '-=300',
      opacity: 0,
      rotation: 0,
      duration: path === 'failed' ? 0.3 : 2
    })
    .to(path === 'failed' ? burst : null,
      path === 'failed' ? {
        delay: -0.1,
        opacity: 1,
        duration: 0.1
      } : {})
    .to(path === 'failed' ? burst : null,
      path === 'failed' ? {
        delay: 0.8,
        opacity: 0,
        duration: 0.5
      } : {})
    .to(rocket, {
      x: -100,
      y: 100
    })
    .to(path === 'failed' ? failed : submitted, {
      delay: path === 'failed' ? -0.4 : -3.4,
      opacity: 1,
      duration: 0.5
    })
    .to(path === 'failed' ? failed : submitted, {
      delay: path === 'failed' ? 3 : 0,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        tlFloat.pause()
        if (path === 'back') router.back()
        else if (path !== 'failed') router.push(path, { scroll: false })
        tl.resume()
      }
    })

  tl
    .set(overlay, {
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)'
    })
    .to(overlay, {
      ease: 'power4.inOut',
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
      duration: 1,
      onComplete: () => {
        tlFloat.pause()
      }
    })
}
