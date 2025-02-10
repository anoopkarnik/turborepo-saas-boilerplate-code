import React from 'react'
import RightSidebar from './_components/RightSidebar'

export default function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full'>
        <div className='container mx-auto xl:px-30 h-full'>
            <div className='grid grid-cols-6 h-full'>
                <div className='col-span-5 border-r-[1px] border-border'>
                    {children}
                </div>
                <RightSidebar />
            </div>
        </div>
    </div>
  )
}
