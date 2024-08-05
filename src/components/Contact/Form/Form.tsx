/**
 * @file src/components/Contact/Content/Content.tsx
 */

'use client'

import {
  useRef,
  useState,
  useEffect
} from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import styles from './Form.module.scss'

import { getRandom } from '@/services/utils'
import {
  animateLoadingEnd,
  animateLoadingStart
} from '@/services/animations'

const Form = () => {
  const router = useRouter()
  const wrapperRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  const {
    register,
    handleSubmit
  } = useForm()

  const onSubmit = async (data: any) => {
    animateLoadingStart()

    const url = '/api'

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data?.name === '' ? '#' : data?.name,
        email: data?.email === '' ? '#' : data?.email,
        message: data?.message
      })
    })
      .then(response => {
        const { status }: any = response

        if (status === 200) {
          animateLoadingEnd('back', router)
        }
      })
      .catch(error => {
        console.error('Send message error:', error)
      })
  }

  useEffect(() => {
    const wrapper: any = wrapperRef.current
    if (wrapper) {
      if (window.innerWidth > 790) {
        wrapper.style.borderRadius = `${getRandom(2, 3) * 10}% ${getRandom(1, 2) * 10}% ${getRandom(2, 3) * 10}% ${getRandom(1, 2) * 10}%`
      } else {
        wrapper.style.borderRadius = `${getRandom(1, 2) * 10}% ${getRandom(1, 2) * 10}% ${getRandom(1, 2) * 10}% ${getRandom(1, 2) * 10}%`
      }

      const children = wrapper.children
      for (let i = 0; i < children.length; i++) {
        const element = children[i]
        element.style.borderRadius = `${getRandom(1, 3) * 10}% ${getRandom(1, 3) * 10}% ${getRandom(1, 3) * 10}% ${getRandom(1, 3) * 10}%`
      }

      setLoaded(true)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      style={{ opacity: loaded ? 1 : 0 }}
      className={styles.wrapper}
    >
      <p>希望有回覆的話要記得填名字和Email哦～</p>
      <input
        type='text'
        {...register('name')}
        placeholder='名字'
      />
      <input
        type='email'
        {...register('email')}
        placeholder='Email'
      />
      <textarea
        {...register('message', { required: true })}
        placeholder='訊息'
      />
      <button onClick={() => handleSubmit(onSubmit)()}>
        送出
      </button>
    </div>
  )
}

export default Form
