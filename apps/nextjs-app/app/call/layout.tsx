import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='h-screen bg-background'>
        {children}
    </div>
  )
}

export default layout