"use client"


import React, { useEffect, useMemo, useState } from 'react'
import { FullConversationType } from '../../types'
import useConversation from '../../_hooks/useConversation'
import { useRouter } from 'next/navigation'
import ConversationBox from './ConversationBox'
import GroupChatModal from './GroupChatModal'
import { MessengerUser } from '@prisma/client'
import { useSession } from '@repo/auth/better-auth/auth-client'
import { pusherClient } from '../../../../../../lib/helper/pusher'

interface ConversationListProps {
  conversations: FullConversationType[]
  users: MessengerUser[]
}

const ConversationList = ({conversations,users}:ConversationListProps) => {
    const [items, setItems] = useState(conversations)
    const router = useRouter() 
    const { conversationId} = useConversation()
    const session = useSession()

    const pusherKey = useMemo(() => {
      return session.data?.user?.id
    }, [session.data?.user?.id])

    useEffect(()=>{
       if(!pusherKey){
         return
       }
       setItems(conversations)
       const newHandler = (conversation: FullConversationType) => {
          setItems((current) => {
            if (current.find((c) => c.id === conversation.id)) {
              return current
            }
            return [conversation, ...current]
          })
       }
        const updateHandler = (conversation: FullConversationType) => {
          setItems((current) => current.map((currentConversation) => {
            if (currentConversation.id === conversation.id) {
              return {
                ...currentConversation,
                messages: conversation.messages,
              }
            }
            return currentConversation
          }))
        }

        const removeHandler = (conversation: FullConversationType) => {
          setItems((current) => {
            return [...current.filter((c) => c.id !== conversation.id)]
          })
          if (conversationId === conversation.id) {
            router.push('/messenger-clone')
          }
        }
       pusherClient.subscribe(pusherKey)
       pusherClient.bind('conversation:new', newHandler)
        pusherClient.bind('conversation:update', updateHandler)
        pusherClient.bind('conversation:remove', removeHandler)

       return () => {
         pusherClient.unsubscribe(pusherKey)
         pusherClient.unbind('conversation:new', newHandler)
          pusherClient.unbind('conversation:update', updateHandler)
          pusherClient.unbind('conversation:remove', removeHandler)
       }
    }, [pusherKey, conversationId,router,conversations])



  return (
    <>
    <aside className=' h-full inset-y-0 pb-20 lg:pb-0  overflow-y-auto
    bg-background w-full left-0 border-r-[1px] border-border '>
        <div className='px-5'>
            <div className='flex-col r mb-2'>
                <div className='text-lg font-bold py-2 flex items-center justify-between'>
                    <div>Messages</div>
                    <GroupChatModal users={users}/>
                </div>
            </div>
            {items?.map((conversation)=>(
                <ConversationBox key={conversation.id} data={conversation} 
                selected={conversationId === conversation.id}/>
            ))}
        </div>
    </aside>
    </>
  )
}

export default ConversationList