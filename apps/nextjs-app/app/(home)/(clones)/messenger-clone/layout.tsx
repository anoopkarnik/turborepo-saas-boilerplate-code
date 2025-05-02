import React from 'react'


export default async function Layout ({ children }: { children: React.ReactNode }) {

    

  return (
    <div className='h-[94%]'>
        {children}
    </div>
  )
}
