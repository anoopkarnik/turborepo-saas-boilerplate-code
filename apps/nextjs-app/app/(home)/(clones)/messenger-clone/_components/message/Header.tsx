"use client"
import React, { useMemo } from 'react'
import { Conversation, MessengerUser} from '@prisma/client'
import useOtherUser from '../../_hooks/useOtherUser'
import { HiChevronLeft } from 'react-icons/hi'
import { useRouter } from 'next/navigation'
import Avatar from '../common/Avatar'
import Profile from '../sidebar/Profile'
import AvatarGroup from '../common/AvatarGroup'
import useActiveList from '../../_hooks/useActiveList'

interface HeaderProps {
    conversation: Conversation & {
        users: MessengerUser[]
    }
}

const Header = ({conversation}:HeaderProps) => {
    const {members} = useActiveList()

    const router = useRouter()
    const otherUser = useOtherUser(conversation)
    const isActive = otherUser && members.includes(otherUser.userId)

    const statusText = useMemo(()=> {
        if(conversation.isGroup){
            return `${conversation.users.length} members`
        }
        return isActive? 'Active' : 'Offline'
    },[conversation, isActive])

  return (
    <div className=' w-full  flex border-b-[1px] border-border sm:px-4 py-3 sticky top-0 
    lg:px-6 justify-between items-center shadow-sm bg-background z-10'>
        <div className='flex gap-3 items-center'>
            <div onClick={()=>router.push('/messenger-clone')} 
            className='lg:hidden block  text-sidebar-foreground transition cursor-pointer'>
                <HiChevronLeft size={32}/>
            </div>
            {conversation.isGroup ? (
                <AvatarGroup users={conversation.users}/>
            ) : (
                <Avatar user={otherUser} />
            )}
            <div className='flex flex-col'>
                <div>
                    {conversation.name || otherUser?.name}
                </div>
                <div className='text-description'>
                    {statusText}
                </div>
            </div>
        </div>
        <Profile conversation={conversation}/>
    </div>
  )
}

export default Header