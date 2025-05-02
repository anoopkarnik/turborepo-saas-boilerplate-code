import React, { Suspense } from 'react'
import Topbar from '../../_components/topbar/Topbar'
import { GetWorkflowExecutions } from '../../../_actions/workflows'
import { InboxIcon, Loader2Icon } from 'lucide-react'
import ExecutionsTable from './_components/ExecutionsTable'

const ExecutionPage = ({params}:{params:{workflowId:string}}) => {
  return (
    <div className='h-full w-full overflow-auto'> 
        <Topbar workflowId={params.workflowId} hideButtons title="All Runs" subtitle='List of all runs for this workflow'/>
        <Suspense fallback={
            <div className='flex h-full w-full items-center justify-center'>
                <Loader2Icon size={30} className='animate-spin stroke-primary'/>
            </div>
        }>
            <ExecutionTableWrapper workflowId={params.workflowId}/>
        </Suspense>
    </div>
  )
}

export default  ExecutionPage

async function ExecutionTableWrapper({workflowId}:{workflowId:string}){
    const executions = await GetWorkflowExecutions(workflowId)
    if(!executions){
        return <div>No executions found</div>
    }
    if(executions.length === 0){
        return (
            <div className='container w-full py-6'>
                <div className='flex items-center gap-2 justify-center h-full w-full'>
                    <div className='rounded-full bg-accent w-20 h-20 flex items-center justify-center'>
                        <InboxIcon size={40} className='stroke-primary'/>
                    </div>
                    <div className='flex flex-col gap-1 items-center'>
                       <p className='font-bold'>
                         No runs have been triggered yet for this workflow
                        </p>
                        <p className='text-muted-foreground'>
                            You can trigger a new run in the editor page
                        </p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='container p-6 w-full'>
            <ExecutionsTable workflowId={workflowId} initialData={executions}/>
        </div>
    )
}