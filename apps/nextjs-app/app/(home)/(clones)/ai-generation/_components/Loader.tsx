import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='h-full flex flex-col gap-y-4 items-center justify-center bg-transparent'>
        <div className='w-20 h-20 relative '>
            <Image alt="logo" src="/loading.webp" layout='fill' />
        </div>
        <p className='text-description'>
            Sam is thinking...
        </p>
    </div>
  )
}

export default Loader