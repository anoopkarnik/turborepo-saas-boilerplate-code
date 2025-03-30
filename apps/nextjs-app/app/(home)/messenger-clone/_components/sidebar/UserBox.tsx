import React, { useCallback } from 'react'
import { MessengerUser } from "@prisma-mongo/prisma/client"
import { useRouter } from 'next/navigation'
import { createConversation } from '../../_actions/conversation'
import Avatar from '../common/Avatar'

const UserBox = ({user}: {user:MessengerUser}) => {
    const router = useRouter()
    const handleClick = useCallback( async () =>{
        const response = await createConversation(user.id)
        router.push(`/messenger-clone/${response?.id}`)
    }, [user,router])
  return (
    <div onClick={handleClick} className='w-full relative flex items-center space-x-3 p-3
    bg-background hover:bg-sidebar/30 rounded-lg transition cursor-pointer'>
        <Avatar user={user} />
        <div className='min-w-0 flex-1'>
            <div className='focus:outline-none'>
                <div className='flex justify-between items-center mb-1'>
                    <p className='text-description'>
                        {user.name}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserBox