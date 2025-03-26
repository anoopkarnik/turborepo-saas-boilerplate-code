"use client"
import React from 'react'

import { Companion, Message } from '@prisma/prisma/client'
import { Button } from '@repo/ui/atoms/shadcn/button';
import { ChevronLeft, Edit, MessageSquare, MoreVertical, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@repo/ui/molecules/shadcn/dropdown';
import { useToast } from '@repo/ui/hooks/use-toast';
import axios from 'axios';
import BotAvatar from './BotAvatar';


interface ChatHeaderProps {
    companion: Companion & {
        messages: Message[];
        _count: {
            messages: number;
        }
    }
}

const ChatHeader = ({companion}: ChatHeaderProps) => {
    const router = useRouter()
    const session = useSession()
    const {toast} = useToast()

    const onDelete = async () => {
        try {
            await axios.delete(`/api/ai-companion/${companion?.id}`)
            toast({
                title: 'Companion deleted',
                description: 'Your companion has been deleted',
                variant: 'success'
            })
            router.refresh()
            router.push('/ai-companion')
        }
        catch (error) {
            toast({
                title: 'Error deleting companion',
                description: error as string,
                variant: 'destructive'
            })
        }
    }

  return (
    <div className='flex w-full justify-between items-center border-b border-border
    pb-4'>
        <div className='flex gap-x-2 items-center'>
            <Button size ="icon" variant="blank" onClick={()=>router.back()}>
                <ChevronLeft className='h-8 w-8' />
            </Button>
            <BotAvatar src={companion?.src} name={companion?.name} />
            <div className='flex flex-col gap-y-1'>
                <div className='flex items-center gap-x-2'>
                    <p className='font-bold'>
                        {companion?.name}
                    </p>
                    <div className='flex items-center text-description'>
                        <MessageSquare className='h-3 w-3 mr-1' />
                        {companion?._count.messages}
                    </div>
                </div>
                <p className='text-description'>
                    Created by {companion?.userName}
                </p>
            </div>
        </div>
        {session?.data?.user?.id === companion?.userId && (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'blank'} size={'icon'}> 
                        <MoreVertical/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuItem onClick={()=>router.push(`/ai-companion/companion/${companion?.id}`)}>
                        <Edit className='w-4 h-4 mr-2'/>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete}>
                        <Trash className='w-4 h-4 mr-2'/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )}
    </div>
  )
}

export default ChatHeader