import React from 'react'
import {Separator} from '@repo/ui/atoms/shadcn/separator'
const layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='flex flex-col w-full h-full overflow-y-hidden'>
        {children}
        <Separator/>
    </div>
  )
}

export default layout