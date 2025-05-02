"use client"
import { Button } from '@repo/ui/atoms/shadcn/button'
import React from 'react'
import { CheckIcon } from 'lucide-react'
import { useReactFlow } from '@xyflow/react'
import { useMutation } from '@tanstack/react-query'
import { UpdateWorkflow } from '../../../_actions/workflows'
import { useToast } from '@repo/ui/hooks/use-toast'

const SaveBtn = ({workflowId}:{workflowId:string}) => {

    const {toast} = useToast()
    const {toObject} = useReactFlow()
    const saveMutation = useMutation(({
      mutationFn: UpdateWorkflow,
      onSuccess: ()=>{toast({title: "Success", description: "Workflow saved successfully", variant: 'success'})},
      onError: ()=>{toast({title: "Error", description: "Something went wrong", variant: 'destructive'})},
    }))

  return (
    <Button disabled={saveMutation.isPending} variant="outline" className=' flex items-center gap-2' onClick={()=>{
        const workflowDefinition = JSON.stringify(toObject())
        toast({title: "Saving workflow....", description: "Please wait", variant: 'default'})
        saveMutation.mutate({
          id: workflowId,
          definition: workflowDefinition
        })
    }}>
        <CheckIcon size={16} className="stroke-green-400"/>
        Save
    </Button>
  )
}

export default SaveBtn