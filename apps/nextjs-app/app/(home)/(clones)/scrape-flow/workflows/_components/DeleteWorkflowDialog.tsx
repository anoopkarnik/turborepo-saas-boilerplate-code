"use client"

import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,

} from '@repo/ui/molecules/shadcn/alert-dialog'
import { Input } from '@repo/ui/atoms/shadcn/input'
import { useMutation } from '@tanstack/react-query'
import { DeleteWorkflow } from '../../_actions/workflows'
import { DeleteWorkflowDialogProps } from '@repo/ts-types/scrape-flow/workflow'
import { useToast } from '@repo/ui/hooks/use-toast'

const DeleteWorkflowDialog = ({open, setOpen,workflowName,workflowId}:DeleteWorkflowDialogProps) => {
    const {toast} = useToast()
    const [confirmText, setConfirmText] = useState('')
    const deleteMutation = useMutation({
        mutationFn: DeleteWorkflow,
        onSuccess: ()=>{
            toast({title: "Success", description: "Workflow deleted", variant: 'success'})
            setConfirmText('')
        },
        onError: ()=>{
            toast({title: "Error", description: "Failed to delete workflow", variant: 'destructive'})

        }
    })
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure</AlertDialogTitle>
                <AlertDialogDescription>
                    If you delete this workflow, you will not be able to recover it.
                    <div className='flex flex-col py-4 gap-2'>
                        <p>If you are sure, enter <b>{workflowName} </b> to delete</p>
                        <Input value={confirmText} onChange={(e)=> setConfirmText(e.target.value)}/>
                    </div>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setConfirmText('')}>Cancel</AlertDialogCancel>
                <AlertDialogAction disabled={confirmText !== workflowName || deleteMutation.isPending} 
                className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                onClick={()=>{
                    toast({title: "Deleting workflow....", description: "Please wait", variant: 'default'})
                    deleteMutation.mutate(workflowId)
                }}>
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteWorkflowDialog