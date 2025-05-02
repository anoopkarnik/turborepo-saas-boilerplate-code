import React, { useEffect, useRef, useState, ElementRef } from 'react'

import { Companion } from '@prisma/prisma/client'
import ChatMessage, { ChatMessageProps } from './ChatMessage';

interface ChatMessagesProps {
    messages: ChatMessageProps[];
    isLoading: boolean;
    companion: Companion;
}

const ChatMessages = ({messages, isLoading, companion}: ChatMessagesProps) => {
    const scrollRef = useRef<ElementRef<"div">>(null) 
    const [fakeLoading, setFakeLoading] = useState(messages?.length === 0 ? true : false)

    useEffect(()=>{
        const timeout = setTimeout(() => {
            setFakeLoading(false)
        }, 1000);
        return () => clearTimeout(timeout)
    },[])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    },[messages?.length])

  return (
    <div className='flex-1 overflow-y-auto pr-4 '>
        <ChatMessage src={companion?.src} role="system" name={companion?.name} isLoading={fakeLoading}
        content={`Hello, I am ${companion?.name}, ${companion?.description}`} />
        {messages?.map((message,index)=>(
            <ChatMessage
                key={index}
                src={companion?.src}
                role={message?.role}
                content={message?.content}
                isLoading={fakeLoading}
                name={companion?.name}
            />
                
        ))}
        {isLoading && 
        <ChatMessage 
            role="system" 
            isLoading={true} 
            src={companion?.src}
            />}
        <div ref={scrollRef}/>
    </div>
  )
}

export default ChatMessages