"use client"

import { Button } from '@repo/ui/atoms/shadcn/button'
import { Dialog, DialogContent, DialogTrigger } from '@repo/ui/molecules/shadcn/dialog'
import { ShieldEllipsisIcon } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import CustomDialogHeader from '@repo/ui/molecules/custom/v1/CustomDialogHeader'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { addOAuthConnectionSchema, addOAuthConnectionSchemaType} from '@repo/zod/scrape-flow/connection'
import  {Form, FormField, FormItem, FormMessage, FormControl, FormLabel, FormDescription} from '@repo/ui/molecules/shadcn/form'
import { Input } from '@repo/ui/atoms/shadcn/input'
import { Textarea } from '@repo/ui/atoms/shadcn/textarea'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@repo/ui/hooks/use-toast'
import {Loader2} from 'lucide-react'
import { ConnectionCardProps } from '@repo/ts-types/home/v1'
import { AddOAuthConnection } from '../../../../actions/connections'

const AddOAuthConnectionsDialog = ({connection}:{connection:ConnectionCardProps}) => {
    const [open, setOpen] = useState(false)
    const {toast} = useToast()

    const form = useForm<addOAuthConnectionSchemaType>({
      resolver: zodResolver(addOAuthConnectionSchema),
      defaultValues:{
        connection: connection.title
      }
    })

    const {mutate, isPending} = useMutation({
      mutationFn: AddOAuthConnection,
      onSuccess: ()=>{
        setOpen(false);
        form.reset();
        toast({title: "Success", description: "Connection Created", variant: 'default'})
      },
      onError: ()=>{toast({title: "Error", description: "Failed to create connection", variant: 'destructive'})},
    })

    const onSubmit = useCallback((values:addOAuthConnectionSchemaType)=>{
      toast({title: "Creating connection....", description: "Please wait", variant: 'default'})
      mutate(values)
    },[mutate,toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button>{"Add OAuth Creds"} </Button>
        </DialogTrigger>
        <DialogContent className='px-0'>
          <CustomDialogHeader
            icon={ShieldEllipsisIcon}
            title={`Add OAuth Credentials for ${connection.title}`}
          />
          <div className='p-6'>
            <Form {...form}>
              <form className='space-y-8 w-full' onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className='flex gap-1 items-center'>
                        Name
                        <p className='text-xs text-primary'>(required)</p>
                      </FormLabel>
                      <FormControl>
                        <Input className='bg-background' {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter a unique and descriptive name for this connection.
                      </FormDescription>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientId"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className='flex gap-1 items-center'>
                        Client ID
                        <p className='text-xs text-primary'>(required)</p>
                      </FormLabel>
                      <FormControl>
                        <Input className='bg-background' {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide the Client ID for this OAuth connection.
                      </FormDescription>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientSecret"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className='flex gap-1 items-center'>
                        Client Secret
                        <p className='text-xs text-primary'>(required)</p>
                      </FormLabel>
                      <FormControl>
                        <Input className='bg-background' {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide the Client Secret for this OAuth connection.
                      </FormDescription>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className='flex gap-1 items-center'>
                        Description
                        <p className='text-xs text-primary'>(optional)</p>
                      </FormLabel>
                      <FormControl>
                        <Textarea className='resize-none' {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide a brief description of what you intend to use this connection for.
                        <br/> This is optional but can help you remember the api&apos;s purpose.
                      </FormDescription>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <Button type="submit" className='w-full' disabled={isPending}>
                  {!isPending && "Proceed"}
                  {isPending && <Loader2 className='animate-spin'/>}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
    </Dialog>
  )
}

export default AddOAuthConnectionsDialog;