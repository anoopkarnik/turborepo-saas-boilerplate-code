"use client"

import { Button } from '@repo/ui/atoms/shadcn/button'
import { UploadIcon } from 'lucide-react'
import React from 'react'
import useExecutionPlan from '../../../_hooks/useExecutionPlan'
import { useMutation } from '@tanstack/react-query'
import { PublishWorkflow} from '../../../_actions/workflows'
import { useToast } from '@repo/ui/hooks/use-toast'
import { useReactFlow } from '@xyflow/react'

const PublishBtn = ({workflowId}:{workflowId:string}) => {
    const generate = useExecutionPlan();
    const {toast} = useToast()
    const {toObject} = useReactFlow();

    const mutation = useMutation({
        mutationFn: PublishWorkflow,
        onError: ()=>{
            toast({title: "Error", description: "Something went wrong", variant: 'destructive'})
        },
        onSuccess: ()=>{
            toast({title: "Success", description: "Workflow Published", variant: 'success'})
        }
    })
  return (
    <Button variant="outline" className=' flex items-center gap-2' disabled={mutation.isPending} onClick={()=>{
        const plan = generate();
        if (!plan){
            // Client side validation
            return 
        }
        toast({title: "Publishing workflow.....s", description: "Please wait", variant: 'default'})
        mutation.mutate({
            id: workflowId,
            flowDefinition: JSON.stringify(toObject()),

        })
    }} >
        <UploadIcon size={16} className="stroke-green-400"/>
        Publish
    </Button>
  )
}

export default PublishBtn