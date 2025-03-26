"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/atoms/shadcn/avatar'
import { useSession } from 'next-auth/react'
import React from 'react'

const UserAvatar = () => {
    const session = useSession()
  return (
    <Avatar className='h-14 w-14'>
        <AvatarImage src={session?.data?.user?.image || undefined }  className='object-cover'/>
        <AvatarFallback>
            {session?.data?.user?.name?.charAt(0) || 'U'}
        </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar