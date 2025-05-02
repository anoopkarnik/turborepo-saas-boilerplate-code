"use client"
import React, { useState } from 'react'
import Heading from '../_components/Heading'
import { MessageSquare } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { formSchema } from '../lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@repo/ui/molecules/shadcn/form'
import { Input } from '@repo/ui/atoms/shadcn/input'
import { Button } from '@repo/ui/atoms/shadcn/button'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { ChatCompletionMessageParam } from 'openai/src/resources.js'
import Empty from '../_components/Empty'
import Loader from '../_components/Loader'
import { cn } from '@repo/ui/lib/utils'
import UserAvatar from '../_components/UserAvatar'
import BotAvatar from '../_components/BotAvatar'

const Conversation = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting

    const router = useRouter()

    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([])

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const userMessage:ChatCompletionMessageParam = {
                role: 'user',
                content: values.prompt
            }
            const newMessages = [...messages, userMessage]
            const response = await axios.post('/api/ai-generation/conversation', {messages: newMessages})
            setMessages((current) => [...current, userMessage, response.data])
            form.reset()
        }catch(err){
            // @ts-expect-error Object possibly undefined error
            toast({title: "Error", description: err?.response.data.error , variant: 'destructive'})
            console.log(err)
        }finally{
            router.refresh()
        }
    }
  return (
    <div className='px-4 lg:px-8'> 
        <Heading title="Conversation" description='Our most advanced conversation model.' 
        icon={MessageSquare} iconColor='text-violet-500' bgColor='bg-violet-500/10'/>
        <div >
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} 
                className='rounded-lg border w-full p-4 px-3 md:px6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
                    <FormField name="prompt" 
                       render={({field})=>(
                        <FormItem className="col-span-12 lg:col-span-10">
                            <FormControl className='m-0 p-0'>
                                <Input className='border-0 outline-none focus-visible:ring-0 bg-transparent
                                focus-visible:ring-transparent' disabled={isLoading} 
                                placeholder='How do I calculate radius of a cirle?' {...field}/>
                            </FormControl>
                        </FormItem>
                       )}
                    />
                    <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>
                        Generate
                    </Button>
                </form>
            </Form>
        </div>
        <div className='space-y-4 mt-4 '>
            {isLoading && (
                <Loader/>
            )}
            {messages.length===0 && !isLoading && (
                <Empty label='No conversation started'/>
            )}
            <div className='flex flex-col-reverse gap-y-4'>
                {messages.map((message, index) => (
                    <div 
                        key={index}
                        className={cn('p-8 w-full flex items-start gap-x-8 rounded-lg',
                            message.role === 'user' ? "bg-background border-border border-[1px]" : "bg-sidebar")}
                    >
                        {message.role === 'user' ? <UserAvatar/> : <BotAvatar   />}
                        {message.content as string}
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Conversation