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
  router: AppRouterInstance
) => {
  const tl = gsap.timeline()
  const overlay = document.getElementById('transition-overlay')

  tl
    .to(overlay, {
      ease: 'power4.inOut',
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1,
      onComplete: () => {
        router.push(path)
      }
    })
}
