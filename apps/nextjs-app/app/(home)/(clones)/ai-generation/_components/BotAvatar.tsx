import { Avatar, AvatarImage } from '@repo/ui/atoms/shadcn/avatar'
import React from 'react'

const BotAvatar = () => {
  return (
    <Avatar className='h-14 w-14'>
        <AvatarImage className="p-1" src="/anoop.jpg"/>
    </Avatar>
  )
}

export default BotAvatar