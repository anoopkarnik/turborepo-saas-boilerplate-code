"use client"

import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { RunWorkflow } from '../../_actions/workflows'
import { useToast } from '@repo/ui/hooks/use-toast'
import { Button } from '@repo/ui/atoms/shadcn/button'
import { PlayIcon } from 'lucide-react'

const RunBtn = ({workflowId}:{workflowId:string}) => {
    const {toast} = useToast()
    const mutation = useMutation({
        mutationFn: RunWorkflow,
        onError: ()=>{
            toast({title: "Error", description: "Something went wrong", variant: 'destructive'})
        },
        onSuccess: ()=>{
            toast({title: "Success", description: "Workflow Started", variant: 'success'})
        }
    })
  return (
    <Button variant={'outline'} size={'sm'} className='flex items-center gap-2' disabled={mutation.isPending} 
    onClick={()=>{
        toast({title: "Running workflow.....", description: "Please wait", variant: 'default'})
        mutation.mutate({
            workflowId
        })
        }}>
        <PlayIcon size={16} className="stroke-green-400"/>
    </Button>
  )
}

export default RunBtn