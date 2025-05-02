"use client"
import { useToast } from '@repo/ui/hooks/use-toast';
import { cn } from '@repo/ui/lib/utils';
import React from 'react'
import BotAvatar from './BotAvatar';
import { BeatLoader } from 'react-spinners';
import UserAvatar from './UserAvatar';
import { Button } from '@repo/ui/atoms/shadcn/button';
import { Copy } from 'lucide-react';
import { useTheme } from '@repo/ui/providers/theme-provider';

export interface ChatMessageProps {
    role: "system" | "user";
    content?: string;
    isLoading?: boolean;
    name?: string;
    src?: string
}


const ChatMessage = ({role,content,name,isLoading,src}: ChatMessageProps) => {

    const {toast} = useToast()
    const {theme} = useTheme()


    const onCopy = () => {
        if (!content) return
        navigator.clipboard.writeText(content)
        toast({
            title: 'Copied to clipboard',
            variant: 'success',
        })
    }
  return (
    <div className={cn('group flex items-center gap-x-3 py-4 w-full',
    role === 'system' ? 'justify-start' : 'justify-end'
    )}>
        {role === 'system' && src && <BotAvatar src={src} name={name} />}
        <div className='rounded-md px-4 py-2 max-w-sm text-sm bg-sidebar'>
            {isLoading ? <BeatLoader size={5} color={theme=== 'dark' ? 'white' : 'black'}/> : content}
        </div>
        {role === 'user' && <UserAvatar />}
        {role !== "user" && !isLoading && (
            <Button onClick={onCopy} className="opacity-0 group-hover:opacity-100 transition"
            size="icon" variant="blank">
                <Copy className="h-4 w-4" />
            </Button>
        )}
    </div>
  )
}

export default ChatMessage