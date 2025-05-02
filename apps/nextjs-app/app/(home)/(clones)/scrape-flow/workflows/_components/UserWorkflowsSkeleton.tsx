import { Skeleton } from '@repo/ui/molecules/shadcn/skeleton'
import React from 'react'

const UserWorkflowsSkeleton = () => {
  return (
    <div className='space-y-2'>
        {[1,2,3,4].map((i:number) => (
            <Skeleton key={i} className='h-32 w-full' />
        ))}
    </div>
  )
}

export default UserWorkflowsSkeleton