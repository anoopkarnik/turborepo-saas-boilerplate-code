"use client"

import { Button } from '@repo/ui/atoms/shadcn/button'
import { Dialog, DialogContent, DialogTrigger } from '@repo/ui/molecules/shadcn/dialog'
import { Layers2Icon } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import CustomDialogHeader from '@repo/ui/molecules/misc/CustomDialogHeader/v1'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { createWorkflowSchema, createWorkflowSchemaType } from '@repo/zod/scrape-flow/workflow'
import  {Form, FormField, FormItem, FormMessage, FormControl, FormLabel, FormDescription} from '@repo/ui/molecules/shadcn/form'
import { Input } from '@repo/ui/atoms/shadcn/input'
import { Textarea } from '@repo/ui/atoms/shadcn/textarea'
import { useMutation } from '@tanstack/react-query'
import { CreateWorkflow } from '../../_actions/workflows'
import { useToast } from '@repo/ui/hooks/use-toast'
import {Loader2} from 'lucide-react'

const CreateWorkflowDialog = ({triggerText}:{triggerText?:string}) => {
    const [open, setOpen] = useState(false)
    const {toast} = useToast()

    const form = useForm<createWorkflowSchemaType>({
      resolver: zodResolver(createWorkflowSchema),
      defaultValues:{}
    })

    const {mutate, isPending} = useMutation({
      mutationFn: CreateWorkflow,
      onSuccess: ()=>{toast({title: "Success", description: "Workflow created", variant: 'default'})},
      onError: ()=>{toast({title: "Error", description: "Failed to create workflow", variant: 'destructive'})},
    })

    const onSubmit = useCallback((values:createWorkflowSchemaType)=>{
      toast({title: "Creating workflow....", description: "Please wait", variant: 'default'})
      mutate(values)
    },[mutate,toast])

  return (
    <Dialog open={open} onOpenChange={(open)=>{form.reset();setOpen(open)}}>
        <DialogTrigger asChild>
            <Button>{triggerText ?? "Create Workflow"} </Button>
        </DialogTrigger>
        <DialogContent className='px-0'>
          <CustomDialogHeader
            icon={Layers2Icon}
            title='Create a new workflow'
            subTitle='Start building your workflow'
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
                        Choose a descriptive and unique name
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
                        Provide a brief description of what your workflow does.
                        <br/> This is optional but can help you remember the workflow&apos;s purpose.
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

export default CreateWorkflowDialog