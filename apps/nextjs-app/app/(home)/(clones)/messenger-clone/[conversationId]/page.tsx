"use client"
interface Params {
    conversationId: string
}

import React, { useEffect, useState } from 'react'
import { getConversationById, getConversations} from '../_actions/conversation'
import EmptyState from '../_components/common/EmptyState'
import ConversationList from '../_components/sidebar/ConversationList'
import Header from '../_components/message/Header'
import Body from '../_components/message/Body'
import { getMessages } from '../_actions/message'
import MessageForm from '../_components/message/MessageForm'
import { FullMessageType } from '../types'
import { GetAllUsers } from '../_actions/users'

const  ConversationId= ({params}: {params: Params}) => {
    const {conversationId} = params

    const [conversation, setConversation] = useState<any>(null)
    const [messages, setMessages] = useState<FullMessageType[]>([])
    const [conversations, setConversations] = useState<any[]>([]);
    const [users, setUsers ] = useState<any[]>([])


    useEffect(() => {
        const fetchConversations = async () => {
            const conversations = await getConversations()
            setConversations(conversations)
        }
        const fetchUsers = async () => {
            const users = await GetAllUsers()
            setUsers(users)
        }
        fetchUsers()
        fetchConversations()
    }, [])

    useEffect(()=>{
        const fetchConversation = async () => {
            const conversation  = await getConversationById(conversationId)
            setConversation(conversation)
            const messages = await getMessages(conversationId )
            setMessages(messages || [])
        }
        fetchConversation()
    },[conversationId])

    if(!conversation){
        return (
            <div className='h-full w-full flex'>
                <div className='h-full hidden lg:block w-[350px] overflow-y-auto'>
                    <ConversationList conversations={conversations} users={users} />
                </div>
                <EmptyState />
            </div>
        )
    }

  return (
<div className="flex w-full h-full overflow-hidden">
  {/* Sidebar - independent scroll */}
  <div className="hidden lg:block w-[350px] overflow-y-auto ">
    <ConversationList conversations={conversations} users={users} />
  </div>

  {/* Main Chat View - flex layout */}
  <div className="flex flex-col flex-1 max-h-screen w-full ">
    <Header conversation={conversation} />
    
    {/* Message Body - scrollable */}
    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-sidebar">
      <Body initialMessages={messages} />
    </div>

    <MessageForm />
  </div>
</div>
  )
}

export default ConversationId