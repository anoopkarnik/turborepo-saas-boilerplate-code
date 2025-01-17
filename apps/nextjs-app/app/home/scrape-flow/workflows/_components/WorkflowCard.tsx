"use client"
import React from 'react'
import { Workflow } from "@prisma/client"
import { Card, CardContent } from '@repo/ui/molecules/shadcn/card'
import { WorkflowStatus } from '@repo/ts-types/scrape-flow/workflow'
import { FileTextIcon, PlayIcon } from 'lucide-react'
import { cn } from '@repo/ui/lib/utils'
import Link from 'next/link'
import {ShuffleIcon} from 'lucide-react'
import { buttonVariants } from '@repo/ui/atoms/shadcn/button'
import WorkflowActions from './WorkflowActions'

const statusColors = {
    [WorkflowStatus.DRAFT]: 'bg-yellow-400 text-yellow-600',
    [WorkflowStatus.PUBLISHED]: 'bg-primary',

}

const WorkflowCard = ({workflow}: {workflow: Workflow}) => {
    const isDraft = workflow.status == WorkflowStatus.DRAFT
  return (
    <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30">
        <CardContent className='p-4 flex items-center justify-between h-[100px]'>
            <div className='flex items-center gap-4'>
                <div className={cn("w-10 h-10 rounded-full flex items-center bg-destructive justify-center",
                    statusColors[workflow.status as WorkflowStatus])
                }>
                    {isDraft ? <FileTextIcon className='w-5 h-5'/>:<PlayIcon className='w-5 h-5 text-whites'/>}
                </div>
                <div>
                    <div className='text-emphasized text-muted-foreground flex items-center'>
                        <Link href={`/home/scrape-flow/workflow/editor/${workflow.id}`} className='flex items-center hover:underline'>
                            {workflow.name}
                        </Link>
                        {isDraft && (
                            <span className='ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full'>
                                Draft
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-2 space-x-2'>
                <Link href={`/home/scrape-flow/workflow/editor/${workflow.id}`} 
                className={cn(buttonVariants({variant: "outline", size: "sm"}),"flex items-center gap-2")}>
                    <ShuffleIcon size={16}/>
                    Edit
                </Link>
                <WorkflowActions workflowName={workflow.name} workflowId={workflow.id}/>
            </div>
        </CardContent>
    </Card>
  )
}

export default WorkflowCard