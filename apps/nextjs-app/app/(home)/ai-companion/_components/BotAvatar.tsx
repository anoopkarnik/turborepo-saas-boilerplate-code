import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/atoms/shadcn/avatar';

interface AvatarProps {
    src?: string;
    name?: string;
}


const BotAvatar = ({src, name}:AvatarProps) => {
  return (
    <Avatar className='h-12 w-12'>
        <AvatarImage src={src} className='object-cover'/>
        <AvatarFallback className='bg-primary/50'>
            {name?.charAt(0) || 'C'}
        </AvatarFallback>
    </Avatar>
  )
}

export default BotAvatar