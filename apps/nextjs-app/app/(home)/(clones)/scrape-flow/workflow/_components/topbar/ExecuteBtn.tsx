"use client"

import { Button } from '@repo/ui/atoms/shadcn/button'
import { PlayIcon } from 'lucide-react'
import React from 'react'
import useExecutionPlan from '../../../_hooks/useExecutionPlan'
import { useMutation } from '@tanstack/react-query'
import { RunWorkflow } from '../../../_actions/workflows'
import { useToast } from '@repo/ui/hooks/use-toast'
import { useReactFlow } from '@xyflow/react'

const ExecuteBtn = ({workflowId}:{workflowId:string}) => {
    const generate = useExecutionPlan();
    const {toast} = useToast()
    const {toObject} = useReactFlow();

    const mutation = useMutation({
        mutationFn: RunWorkflow,
        onError: ()=>{
            toast({title: "Error", description: "Something went wrong", variant: 'destructive'})
        },
        onSuccess: ()=>{
            toast({title: "Success", description: "Execution started", variant: 'success'})
        }
    })
  return (
    <Button variant="outline" className=' flex items-center gap-2' disabled={mutation.isPending} onClick={()=>{
        const plan = generate();
        if (!plan){
            // Client side validation
            return 
        }
        mutation.mutate({
            workflowId: workflowId,
            flowDefinition: JSON.stringify(toObject()),

        })
    }} >
        <PlayIcon size={16} className="stroke-orange-400"/>
        Execute
    </Button>
  )
}

export default ExecuteBtn