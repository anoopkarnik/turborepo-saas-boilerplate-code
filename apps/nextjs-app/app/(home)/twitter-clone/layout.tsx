import React from 'react'
import RightSidebar from './_components/RightSidebar'
import ProfileModal from './_components/ProfileModal'
import EditModal from './_components/modals/EditModal'

export default function Layout ({ children }: { children: React.ReactNode }) {

  return (
    <div className='h-full'>
        <ProfileModal />
        <EditModal />
        <div className=' h-full w-full '>
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
