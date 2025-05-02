"use client"

import { Button } from '@repo/ui/atoms/shadcn/button'
import { Dialog, DialogContent, DialogTrigger } from '@repo/ui/molecules/shadcn/dialog'
import { Layers2Icon, CopyIcon } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import CustomDialogHeader from '@repo/ui/molecules/misc/CustomDialogHeader/v1'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { duplicateWorkflowSchema, duplicateWorkflowSchemaType } from '@repo/zod/scrape-flow/workflow'
import  {Form, FormField, FormItem, FormMessage, FormControl, FormLabel, FormDescription} from '@repo/ui/molecules/shadcn/form'
import { Input } from '@repo/ui/atoms/shadcn/input'
import { Textarea } from '@repo/ui/atoms/shadcn/textarea'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@repo/ui/hooks/use-toast'
import {Loader2} from 'lucide-react'
import { DuplicateWorkflow } from '../../_actions/workflows'
import { cn } from '@repo/ui/lib/utils'

const DuplicateWorkflowDialog = ({workflowId}:{workflowId:string}) => {
    const [open, setOpen] = useState(false)
    const {toast} = useToast()

    const form = useForm<duplicateWorkflowSchemaType>({
      resolver: zodResolver(duplicateWorkflowSchema),
      defaultValues:{
        workflowId,
      }
    })

    const {mutate, isPending} = useMutation({
      mutationFn: DuplicateWorkflow,
      onSuccess: ()=>{
        toast({title: "Success", description: "Workflow dupliated", variant: 'default'});
        setOpen((prev) => !prev)
      },
      onError: ()=>{toast({title: "Error", description: "Failed to duplicated workflow", variant: 'destructive'})},
    })

    const onSubmit = useCallback((values:duplicateWorkflowSchemaType)=>{
      toast({title: "Dupliating workflow....", description: "Please wait", variant: 'default'})
      mutate(values)
    },[mutate,toast])

  return (
    <Dialog open={open} onOpenChange={(open)=>{form.reset();setOpen(open)}}>
        <DialogTrigger asChild>
            <Button variant={'ghost'} size={'icon'} className={cn(
              `ml-2 transition-opacity duration-200 opacity-0 group-hover/card:opacity-100 shadow-none`)}>
                <CopyIcon className='w-4 h-4 text-muted-foreground cursor-pointer'/>
            </Button>
        </DialogTrigger>
        <DialogContent className='px-0'>
          <CustomDialogHeader
            icon={Layers2Icon}
            title='Duplicate workflow'
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

export default DuplicateWorkflowDialog