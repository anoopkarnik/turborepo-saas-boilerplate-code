import React, { useCallback, useMemo } from 'react'
import { FullConversationType } from '../../types'
import useOtherUser from '../../_hooks/useOtherUser'
import { useSession } from '@repo/auth/better-auth/auth-client'
import { useRouter } from 'next/navigation'
import { cn } from '@repo/ui/lib/utils'
import Avatar from '../common/Avatar'
import { format } from 'date-fns'
import AvatarGroup from '../common/AvatarGroup'

interface ConversationBoxProps {
    data: FullConversationType,
    selected?: boolean
}

const ConversationBox = ({data,selected}:ConversationBoxProps) => {

    const otherUser = useOtherUser(data)
    const session = useSession()
    const router = useRouter()

    const handleClick = useCallback(()=>{
        router.push(`/messenger-clone/${data.id}`)
    },[data.id,router])

    const lastMessage = useMemo(()=>{
        const messages = data.messages || []
        return messages[messages.length - 1]
    },[data.messages])

    const userId = useMemo(() =>{
        return session?.data?.user?.id
    },[session?.data?.user?.id])

    const hasSeen = useMemo(()=>{
        if(!lastMessage) return false

        const seenArray = lastMessage.seen || []
        if(!userId) return false

        return seenArray.filter((user)=>user.userId === userId).length !== 0
    },[userId, lastMessage])

    const lastMessageText = useMemo(()=>{
        if(lastMessage?.image){
            return 'Sent an image';
        }
        if(lastMessage?.body){
            return lastMessage.body
        }
        return 'Started a conversation'
    },[lastMessage])

  return (
    <div onClick={handleClick} className={cn( 'w-full relative flex items-center space-x-3 p-3',
    'hover:bg-sidebar/30 rounded-lg transition cursor-pointer',
    selected ? 'bg-sidebar' : 'bg-background',)}>
        {data.isGroup ? (
            <AvatarGroup users={data.users}/>
        ) : (
            <Avatar user={otherUser} />
        )}
        <div className='min-w-0 flex-1'>
            <div className='focus:outline-none'>
                <div className='flex justify-between items-center mb-1'>
                    <p className='text-paragraph'>
                        {data.name || otherUser?.name}
                    </p>
                    {lastMessage?.createdAt && (
                        <p className='text-xs text-description'>
                            {format(new Date(lastMessage.createdAt), 'p')}
                        </p>
                    )}
                </div>
                <p className={cn('truncate',
                    hasSeen ? 'text-description' : 'text-sm',
                )}>
                    {lastMessageText}
                </p>
            </div>
        </div>
    </div>
  )
}

export default ConversationBox