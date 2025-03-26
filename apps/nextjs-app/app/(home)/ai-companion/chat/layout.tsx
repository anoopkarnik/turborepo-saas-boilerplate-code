import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='mx-auto max-w-4xl h-full w-full'>
        {children}
    </div>
  )
}

export default layout