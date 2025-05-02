import React, { useState } from 'react'
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger } from '@repo/ui/molecules/shadcn/dropdown'
import { Button } from '@repo/ui/atoms/shadcn/button'
import { MoreVerticalIcon } from 'lucide-react'
import TooltipWrapper from '@repo/ui/molecules/home/TooltipWrapper/v1'
import { TrashIcon } from 'lucide-react'
import DeleteWorkflowDialog from './DeleteWorkflowDialog'

const WorkflowActions = ({workflowName,workflowId}:{workflowName:string,workflowId:string}) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  return (
    <>
        <DeleteWorkflowDialog open={showDeleteDialog} setOpen={setShowDeleteDialog} workflowName={workflowName} workflowId={workflowId}/>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm'>
                    <TooltipWrapper content={"More actions"}>
                        <MoreVerticalIcon size={18}/>
                    </TooltipWrapper>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Actions </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className='text-destructive flex items-center gap-2 cursor-pointer' onSelect={
                    ()=>{setShowDeleteDialog(prev => !prev)}}>
                    <TrashIcon size={16}/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}

export default WorkflowActions