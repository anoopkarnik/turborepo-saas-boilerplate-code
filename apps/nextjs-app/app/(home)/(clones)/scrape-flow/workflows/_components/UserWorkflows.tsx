import React from 'react'
import { GetWorflowsForUser } from '../../_actions/workflows'
import { Alert,AlertDescription,AlertTitle } from '@repo/ui/atoms/shadcn/alert'
import { AlertCircleIcon, InboxIcon } from 'lucide-react';
import CreateWorkflowDialog from './CreateWorkflowDialog';
import WorkflowCard from './WorkflowCard';

export async function UserWorkflows() {
    const workflows = await GetWorflowsForUser();
    if (!workflows) {
        return (
            <Alert variant='destructive'>
                <AlertCircleIcon className='w-4 h-4'/>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong, Please try again later</AlertDescription>
            </Alert>
        )
    } 
    if (workflows.length === 0) {
        return (
            <div className='flex flex-col gap-4 h-full items-center'>
                <div className='rounded-full w-20 h-20 flex items-center justify-center'>
                    <InboxIcon size={40} className='stroke-primary'/>
                </div>
                <div className='flex flex-col gap-1 text-center'>
                    <p className='text-emphasized'>No Workflows created yet</p>
                    <p className='text-description'>
                        Click the button below to create your first workflow
                    </p>
                </div>
                <CreateWorkflowDialog triggerText='Create your first workflow'/>
            </div>
        )
    }
  return (
    <div className='grid grid-cols-1 gap-4'>
        {workflows.map((workflow) => (
           <WorkflowCard key={workflow.id} workflow={workflow} />
        ))}
    </div>
  )
}
