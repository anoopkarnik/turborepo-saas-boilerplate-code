"use client"
import { Conversation, MessengerUser } from '@prisma-mongo/prisma/client'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@repo/ui/molecules/shadcn/sheet'
import React, { useMemo } from 'react'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import Avatar from '../common/Avatar'
import useOtherUser from '../../_hooks/useOtherUser'
import { format } from 'date-fns'
import { TrashIcon } from 'lucide-react'
import ConfirmDialog from '@repo/ui/molecules/misc/ConfirmDialog/v1'
import { deleteConversation } from '../../_actions/conversation'
import { useRouter } from 'next/navigation'
import AvatarGroup from '../common/AvatarGroup'
import useActiveList from '../../_hooks/useActiveList'

interface ProfileProps {
    conversation: Conversation & {
        users: MessengerUser[]
    }
}

const Profile = ({conversation}:ProfileProps) => {

    const router = useRouter()

    const {members } = useActiveList()
    const otherUser = useOtherUser(conversation)
    const isActive = otherUser && members.includes(otherUser.userId)

    const title = useMemo(() => {
        return conversation.name || otherUser?.name
    }, [conversation.name, otherUser?.name])

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`
        }
        return isActive ? 'Active' : 'Offline'
    }
    , [conversation, isActive])


    const onDelete = () => {
        deleteConversation(conversation.id)
        router.push('/messenger-clone')
        router.refresh()
    }
     
  return (
    <Sheet>
        <SheetTrigger>
        <HiEllipsisHorizontal size={32}
        className='text-sidebar-foreground cursor-pointer hover:text-description transition'/>
        </SheetTrigger>
    <SheetContent>
        <SheetHeader>
        <SheetTitle className='flex flex-col items-center gap-x-3 mt-4'>
            {conversation.isGroup ? (
                <AvatarGroup users={conversation.users}/>
            ) : (
                <Avatar user={otherUser} />
            )}
            {title}
            <div className='text-description'>
                {statusText}
            </div>
            <ConfirmDialog 
                buttonDiv= {
                    <div className='bg-sidebar rounded-full mt-4 p-2 text-description 
                    cursor-pointer hover:opacity-75 transition'>
                        <TrashIcon size={16} />
                    </div>
                }
                alertTitle='Delete conversation'
                alertDescription='Are you sure you want to delete this conversation?'
                alertActionText='Delete'
                alertCancelText='Cancel'
                alertActionFunction={onDelete}
            />
            <div className='text-description'>
                Delete
            </div>
        </SheetTitle>
        <SheetDescription>
            <div className='flex flex-col gap-2 mt-4 overflow-y-auto'>
                {conversation.isGroup && (
                    <div className='flex flex-col  pb-4'>
                        <div className='text-description pb-4'>
                            Members
                        </div>
                        <div className='text-description text-foreground flex flex-col gap-4'>
                            {conversation.users.map((user) => (
                                <div key={user.id} className='flex items-center gap-2'>
                                    <Avatar user={user} />
                                    <div className='text-description'>
                                        {user.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className='flex flex-col pb-4'>
                    <div className='text-description'>
                        {conversation.isGroup ? "Created" : "Joined"}
                    </div>
                    <div className='text-description text-foreground'>
                        {format(new Date(conversation.createdAt), 'MMMM dd, yyyy')}
                    </div>
                </div>
            </div>
            
        </SheetDescription>
        </SheetHeader>
    </SheetContent>
    </Sheet>

  )
}

export default Profile