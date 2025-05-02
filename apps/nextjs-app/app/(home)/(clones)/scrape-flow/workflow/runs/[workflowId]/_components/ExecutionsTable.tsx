"use client"

import React from 'react'
import { GetWorkflowExecutions } from '../../../../_actions/workflows'
import { useQuery } from '@tanstack/react-query'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui/molecules/shadcn/table'
import { DatesToDurationString } from '../../../../../../../../lib/helper/dates'
import { Badge } from '@repo/ui/atoms/shadcn/badge'
import ExecutionStatusIndicator from './ExecutionStatusIndicator'
import { WorkflowExecutionStatus } from '@repo/ts-types/scrape-flow/workflow'
import { CoinsIcon } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'

type InitialDataType = Awaited<ReturnType<typeof GetWorkflowExecutions>>

const ExecutionsTable = ({workflowId,initialData}:{workflowId:string,initialData:InitialDataType}) => {
    const router = useRouter()
    const query = useQuery({
        queryKey: ['workflowExecutions',workflowId],
        initialData,
        queryFn: () => GetWorkflowExecutions(workflowId),
        refetchInterval: 5000
    })
  return (
    <div className='border rounded-lg shadow-md overflow-auto'>
        <Table className='h-full'>
            <TableHeader className='bg-muted'>
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Consumed</TableHead>
                    <TableHead className='text-right text-xs text-muted-foreground'>Stated at (desc)</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className='gap-2 h-full overflow-auto'>
                {query.data.map((execution) => {
                    const duration = DatesToDurationString(execution.completedAt, execution.startedAt)
                    const formattedStartedAt = execution.startedAt && 
                    formatDistanceToNow(execution.startedAt, { addSuffix: true })
                    return (
                    <TableRow key={execution.id} className='hover:bg-accent cursor-pointer'
                        onClick={() => router.push(`/scrape-flow/workflow/runs/${workflowId}/${execution.id}`)}>
                        <TableCell className='flex flex-col'>
                           <span className='font-semibold'>{execution.id}</span>
                           <div className='text-muted-foreground text-xs'>
                                <span>Triggered via</span>
                                <Badge variant={'outline'}>{execution.trigger}</Badge>
                           </div>
                        </TableCell>
                        <TableCell>
                            <div className='flex flex-col'>
                                <div className='flex gap-2 items-center'>
                                    <ExecutionStatusIndicator status={execution.status as WorkflowExecutionStatus}/>
                                    <span className='font-semibold capitalize'>{execution.status}</span>
                                </div>
                                <div className='text-xs text-muted-foreground mx-5'>{duration}</div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className='flex flex-col'>
                                <div className='flex gap-2 items-center'>
                                    <CoinsIcon size={16} className='text-primary'/>
                                    <span className='font-semibold capitalize'>{execution.creditsConsumed}</span>
                                </div>
                                <div className='text-xs text-muted-foreground mx-5'>Credits</div>
                            </div>
                        </TableCell>
                        <TableCell className='text-right text-muted-foreground'>
                            {formattedStartedAt}
                        </TableCell>
                    </TableRow>
                )})}
            </TableBody>
        </Table>
    </div>
  )
}

export default ExecutionsTable