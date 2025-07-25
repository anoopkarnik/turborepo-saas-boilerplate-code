'use client'
import { Button } from '@repo/ui/atoms/shadcn/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import {ArrowLeft} from 'lucide-react'

const NotFoundPage = () => {
    const router = useRouter()
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-2'>
      <h1 className='text-8xl text-primary'>404</h1>
      <h1 className='text-2xl'>Page Not Found</h1>
      <div className='text-description'>Don&apos;t worry, even the best data sometimes gets lost in the internet</div>
      <Button className='flex items-center gap-2 my-8' onClick={()=>router.push('/')}>
          <ArrowLeft size={20}/>  Back to Home
      </Button>
        <div className='text-description'>If you believe this is an error, please contack our support team</div>

    </div>
  )
}

export default NotFoundPage