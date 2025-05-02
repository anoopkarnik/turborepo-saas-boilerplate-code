"use client"
import React from 'react'
import { Workflow } from "@prisma/prisma/client"
import { Card, CardContent } from '@repo/ui/molecules/shadcn/card'
import { WorkflowExecutionStatus, WorkflowStatus } from '@repo/ts-types/scrape-flow/workflow'
import { FileTextIcon, PlayIcon, CornerDownRightIcon, MoveRightIcon,CoinsIcon, ChevronRightIcon,
    ClockIcon
 } from 'lucide-react'
import { cn } from '@repo/ui/lib/utils'
import Link from 'next/link'
import {ShuffleIcon} from 'lucide-react'
import { buttonVariants } from '@repo/ui/atoms/shadcn/button'
import WorkflowActions from './WorkflowActions'
import RunBtn from './RunBtn'
import SchedulerDialog from './SchedulerDialog'
import TooltipWrapper from '@repo/ui/molecules/home/TooltipWrapper/v1'
import { Badge } from '@repo/ui/atoms/shadcn/badge'
import ExecutionStatusIndicator, { ExecutionStatusLabel } from '../../workflow/runs/[workflowId]/_components/ExecutionStatusIndicator'
import {  format, formatDistanceToNow } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import DuplicateWorkflowDialog from './DuplicateWorkflowDialog'

const statusColors = {
    [WorkflowStatus.DRAFT]: 'bg-yellow-400 text-yellow-600',
    [WorkflowStatus.PUBLISHED]: 'bg-primary',

}

const WorkflowCard = ({workflow}: {workflow: Workflow}) => {
    const isDraft = workflow.status == WorkflowStatus.DRAFT
  return (
    <Card className="border border-separate bg-sidebar shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30 group/card">
        <CardContent className='p-4 flex items-center justify-between h-[100px]'>
            <div className='flex items-center gap-4'>
                <div className={cn("w-10 h-10 rounded-full flex items-center bg-destructive justify-center",
                    statusColors[workflow.status as WorkflowStatus])
                }>
                    {isDraft ? <FileTextIcon className='w-5 h-5'/>:<PlayIcon className='w-5 h-5 text-whites'/>}
                </div>
                <div>
                    <div className='text-emphasized text-muted-foreground flex items-center'>
                        <TooltipWrapper content={workflow.description}>
                            <Link href={`/scrape-flow/workflow/editor/${workflow.id}`} className='flex items-center hover:underline'>
                                {workflow.name}
                            </Link>
                        </TooltipWrapper>
                        {isDraft && (
                            <span className='ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full'>
                                Draft
                            </span>
                        )}
                        <DuplicateWorkflowDialog workflowId={workflow.id}/>
                    </div>
                    <ScheduleSection isDraft={isDraft} creditsCost={workflow.creditsCost} workflowId={workflow.id} 
                    cron={workflow.cron}/>
                </div>
            </div>
            <div className='flex items-center gap-2 space-x-2'>
                {!isDraft && <RunBtn workflowId={workflow.id}/>}
                <Link href={`/scrape-flow/workflow/editor/${workflow.id}`} 
                className={cn(buttonVariants({variant: "outline", size: "sm"}),"flex items-center gap-2")}>
                    <ShuffleIcon size={16}/>
                    Edit
                </Link>
                <WorkflowActions workflowName={workflow.name} workflowId={workflow.id}/>
            </div>
        </CardContent>
        <LastRunDetails workflow={workflow}/>
    </Card>
  )
}

function ScheduleSection({isDraft,creditsCost,workflowId,cron}:{
    isDraft:boolean,creditsCost:number,workflowId:string,cron:string | null}) {
    if (isDraft) {
        return null
    }
    return (
        <div className='flex items-center gap-2'>
            <CornerDownRightIcon className='w-4 h-4 text-muted-foreground'/>
            <SchedulerDialog workflowId={workflowId} cron={cron} key={`${cron}-${workflowId}`}/>
            <MoveRightIcon className='w-4 h-4 text-muted-foreground'/>
            <TooltipWrapper content='Credit consumption for full run'>
                <div className='flex items-center gap-3'>
                    <Badge variant={'outline'} className='space-x-2 text-muted-foreground rounded-sm'>
                        <CoinsIcon className='w-4 h-4'/>
                        <span>{creditsCost}</span>
                    </Badge>
                </div>
            </TooltipWrapper>
        </div>
    )

}
function LastRunDetails({workflow}:{workflow:Workflow}) {
    const isDraft = workflow.status == WorkflowStatus.DRAFT
    if (isDraft) {
        return null
    }
    const {lastRunAt,lastRunStatus,lastRunId, nextRunAt} = workflow
    const formattedStartedAt = lastRunAt && formatDistanceToNow(new Date(lastRunAt),{addSuffix:true})
    const nextSchedule = nextRunAt && format(nextRunAt,'yyyy-MM-dd HH:mm')
    const nextScheduleUTC = nextRunAt && formatInTimeZone(nextRunAt,'UTC','HH:mm')
    return(
        <div className='bg-primary/5 px-4 py-1 flex justify-between items-center text-muted-foreground'>
            <div className='flex items-center text-sm gap-2'>
                {lastRunAt && 
                <Link href={`/scrape-flow/workflow/runs/${workflow.id}/${lastRunId}`} className='flex items-center text-sm gap-2 group'>
                    <span>Last run:</span>
                    <ExecutionStatusIndicator status={lastRunStatus as WorkflowExecutionStatus}/>
                    <ExecutionStatusLabel status={lastRunStatus as WorkflowExecutionStatus}/>
                    <span>{formattedStartedAt}</span>
                    <ChevronRightIcon size={14} className='-translate-x-2 group-hover:translate-x-0 transition'/>
                </Link>
                }
                {
                    !lastRunAt && <span>No runs yet</span>
                }
            </div>
            {nextRunAt && (
                <div className='flex items-center text-sm gap-2'>
                    <ClockIcon size={12}/>
                    <span>Next run at:</span>
                    <span>{nextSchedule}</span>
                    <span className='text-xs'>({nextScheduleUTC} UTC)</span>
                </div>
            ) }
        </div>
    )
}
export default WorkflowCard