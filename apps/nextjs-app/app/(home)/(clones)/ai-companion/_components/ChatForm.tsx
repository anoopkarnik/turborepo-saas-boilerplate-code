"use client"

import { Button } from '@repo/ui/atoms/shadcn/button';
import { Input } from '@repo/ui/atoms/shadcn/input';
import { ChatRequestOptions } from 'ai';
import { SendHorizonal } from 'lucide-react';
import React from 'react'

interface ChatFormProps {
    isLoading: boolean;
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?:ChatRequestOptions | undefined) => void;
}

const ChatForm = ({input,isLoading,handleInputChange,onSubmit}:ChatFormProps) => {
  return (
    <form onSubmit={onSubmit} className="border-t border-border py-4 flex items-center gap-x-2">
        <Input disabled={isLoading} value={input} onChange={handleInputChange} placeholder='Type a message' 
        className='rounded-lg' />
        <Button disabled={isLoading} variant='blank' size='icon' >
            <SendHorizonal className='h-6 w-6' />
        </Button>
    </form>
  )
}

export default ChatForm