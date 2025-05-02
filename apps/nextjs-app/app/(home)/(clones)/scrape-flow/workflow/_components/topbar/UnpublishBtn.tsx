"use client"

import { Button } from '@repo/ui/atoms/shadcn/button'
import { DownloadIcon } from 'lucide-react'
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { UnpublishWorkflow} from '../../../_actions/workflows'
import { useToast } from '@repo/ui/hooks/use-toast'

const UnpublishBtn = ({workflowId}:{workflowId:string}) => {
    const {toast} = useToast()

    const mutation = useMutation({
        mutationFn: UnpublishWorkflow,
        onError: ()=>{
            toast({title: "Error", description: "Something went wrong", variant: 'destructive'})
        },
        onSuccess: ()=>{
            toast({title: "Success", description: "Workflow Unublished", variant: 'success'})
        }
    })
  return (
    <Button variant="outline" className=' flex items-center gap-2' disabled={mutation.isPending} onClick={()=>{
        toast({title: "Unpublishing workflow.....s", description: "Please wait", variant: 'default'})
        mutation.mutate({
            id: workflowId,
        })
    }} >
        <DownloadIcon size={16} className="stroke-orange-500"/>
        Unpublish
    </Button>
  )
}

export default UnpublishBtn