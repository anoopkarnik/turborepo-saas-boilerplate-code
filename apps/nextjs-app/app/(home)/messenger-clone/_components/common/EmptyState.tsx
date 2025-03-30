import React from 'react'

const EmptyState = () => {
  return (
    <div className=' py-10 w-full lg:flex justify-center items-center bg-background hidden  
    h-full'>
      <div className='text-center flex flex-col items-center'>
        <h3 className='mt-2 text-xl font-semibold text-foreground'>
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  )
}

export default EmptyState