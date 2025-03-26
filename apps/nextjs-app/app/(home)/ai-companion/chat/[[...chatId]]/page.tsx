"use client"

import React, { useEffect, useState } from 'react'
import {  getCompanionWithMessages } from '../../_actions/prisma'
import { ClipLoader } from 'react-spinners'
import { useSession } from 'next-auth/react'
import ChatClient from '../../_components/ChatClient'


interface ChatIdProps {
    params: {
        chatId: string
    }
}


const ChatId =  ({params}: ChatIdProps) => {

    const session = useSession();
    const [companion, setCompanion] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        const fetchCompanion = async () => {
            setIsLoading(true)
            if(!params.chatId) return
            const companion = await getCompanionWithMessages(
                params.chatId?.[0] as string,session?.data?.user?.id as string)
            console.log(companion)
            setCompanion(companion)
            setIsLoading(false)
        }
        fetchCompanion()
    },[params.chatId, session?.data?.user])
    
    if(isLoading){
      return (
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="lightgreen" size={80} />
        </div>
      )
    }
    

  return (
    <ChatClient companion={companion} />
  )
}

export default ChatId