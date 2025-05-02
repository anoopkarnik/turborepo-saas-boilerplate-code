"use client"
import React, { useEffect, useRef } from 'react'
import { FullMessageType } from '../../types'
import useConversation from '../../_hooks/useConversation'
import MessageBox from './MessageBox'
import { makeConversationSeen } from '../../_actions/conversation'
import { pusherClient } from '../../../../../../lib/helper/pusher'
import { useRouter } from 'next/navigation'

interface BodyProps {
    initialMessages: FullMessageType[]
}

const Body = ({initialMessages}: BodyProps) => {

    const [messages, setMessages] = React.useState<FullMessageType[]>(initialMessages);    const bottomRef = useRef<HTMLDivElement>(null)
    const { conversationId } = useConversation();
    const router = useRouter()

    useEffect(() =>{
        makeConversationSeen(conversationId as string)
    },[conversationId])

    useEffect(() => {
        setMessages(initialMessages)
    }, [initialMessages])

    useEffect(() => {
        pusherClient.subscribe(conversationId as string)
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })

        const messageHandler = (message: FullMessageType) => {
            makeConversationSeen(conversationId as string)
            setMessages((prev) => {
                if (prev.find((m) => m.id === message.id)) {
                    return prev;
                }
                return [...prev, message]
            })
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
        }

        const updateMessageHandler = (newMessage: FullMessageType)=>{
            setMessages((current) => current.map((currentMessage) =>{
                if (currentMessage.id === newMessage.id){
                    return newMessage
                }
                return currentMessage
            }))
        }

        pusherClient.bind('messages:new', messageHandler);
        pusherClient.bind('messages:update', updateMessageHandler);
        router.refresh();
        return () =>{
            pusherClient.unsubscribe(conversationId as string)
            pusherClient.unbind('messages:new', messageHandler);
            pusherClient.unbind('messages:update', updateMessageHandler);
        }

    },[conversationId,router])

  return (
    <div className='flex-1 overflow-y-auto '>
        {messages?.map((message,i) => (
            <MessageBox
                key={message.id}
                data={message}
                isLast={i === messages.length - 1}
            />   
        ))}
        <div ref={bottomRef} className='pt-24' />
    </div>
  )
}

export default Body