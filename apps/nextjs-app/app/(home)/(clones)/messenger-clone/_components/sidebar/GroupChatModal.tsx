import React from 'react'

import { MessengerUser } from '@prisma-mongo/prisma/client'
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createConversation } from '../../_actions/conversation';
import { useToast } from '@repo/ui/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@repo/ui/molecules/shadcn/form'
import { Button } from '@repo/ui/atoms/shadcn/button';
import { Input } from '@repo/ui/atoms/shadcn/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@repo/ui/molecules/shadcn/dialog';
import { MdOutlineGroupAdd } from 'react-icons/md';
import Select from './Select';


interface GroupChatModalProps {
    users: MessengerUser[];
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    members: z.any()
})

const GroupChatModal = ({users}: GroupChatModalProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false)
    const {toast} = useToast()
    const [open, setOpen] = React.useState(false)

     const form = useForm<z.infer<typeof formSchema>>({
                resolver: zodResolver(formSchema),
                defaultValues: {
                    name: "",
                    members: []
                }
            })
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {
            await createConversation(undefined,true,data.members,data.name)
            router.refresh()
        }
        catch (error) {
            console.log("Error creating group chat", error)
            toast({
                title: "Error creating group chat",
                description: "Please try again later",
                variant: "destructive"
            })
        }
        finally {
            setIsLoading(false)
            setOpen(false)
            router.push(`/messenger-clone`)
            form.reset()
        }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <div className='rounded-full text-description cursor-pointer hover:opacity-75 transition'>
                <MdOutlineGroupAdd size={20}/>
            </div>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create a group chat</DialogTitle>
                <DialogDescription>
                    Create a chat with more than 2 people
                </DialogDescription>
            </DialogHeader>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} 
                className='flex flex-col gap-4 mt-6'>
                    <FormField name="name" 
                        render={({field})=>(
                        <FormItem className="">
                            <FormLabel>Group Name</FormLabel>
                            <FormControl className='m-0 px-2'>
                                <Input className='flex-1' disabled={isLoading} 
                                placeholder='Name the group' {...field}/>
                            </FormControl>
                        </FormItem>
                        )}
                    />
                    <FormField name="members" 
                        render={({field})=>(
                        <FormItem className=" ">
                            <FormLabel>Members</FormLabel>
                            <FormControl className='m-0 px-2'>
                                <Select
                                    placeholder='Select members'
                                    disabled={isLoading}
                                    onChange={field.onChange}
                                    value={field.value}
                                    options={users?.map((user) => ({
                                        label: user.name,
                                        value: user.id,
                                    }))}
                                    />
                            </FormControl>
                        </FormItem>
                        )}
                    />
                    <div className='flex items-center justify-end gap-2'>
                        <Button className='cursor-pointer ' size='sm' onClick={() =>{
                            setOpen(false)
                            form.reset()
                            router.refresh()
                        }}
                        variant="outline" disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button className=' cursor-pointer ' size='sm'
                        variant="default" type="submit" disabled={isLoading}>
                            {isLoading ? "Creating..." : "Create"}
                        </Button>
                    </div>

                </form>
            </Form>
        </DialogContent>

    </Dialog>
  )
}

export default GroupChatModal