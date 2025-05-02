"use client"
import React from 'react'
import { MessengerUser} from "@prisma-mongo/prisma/client"
import Image from 'next/image'
import useActiveList from '../../_hooks/useActiveList'

interface AvatarProps {
    user?: MessengerUser
}


const Avatar = ({user}:AvatarProps) => {
  const {members} = useActiveList()
  
  const isActive = user && members.includes(user.userId)
  return (
    <div className='relative'>
        <div className='relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11'>
            <Image 
                src={user?.profileImage || "https://strapi.bayesian-labs.com/uploads/user_placholder_ae64bf746d.png"}
                alt="Avatar"
                fill
                className='object-cover'
            />
        </div>
        {isActive && <span className='absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0
        h-2 w-3 md:h-3 md:w-3'/>}

    </div>
  )
}

export default Avatar