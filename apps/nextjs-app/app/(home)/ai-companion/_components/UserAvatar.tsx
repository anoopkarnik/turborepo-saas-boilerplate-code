import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/atoms/shadcn/avatar';
import { useSession } from 'next-auth/react';



const UserAvatar = () => {
  const session = useSession()
  return (
    <Avatar className='h-12 w-12'>
        <AvatarImage src={session?.data?.user?.image || undefined} className='object-cover'/>
        <AvatarFallback className='bg-primary/50'>
            {session?.data?.user?.image?.charAt(0) || 'C'}
        </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar