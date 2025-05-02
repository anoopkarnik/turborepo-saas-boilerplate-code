import React, { Suspense } from 'react'
import Topbar from '../../../_components/topbar/Topbar'
import { Loader2Icon } from 'lucide-react'
import { GetWorkflowExecutionWithPhases } from '../../../../_actions/workflows'
import ExecutionViewer from './_components/ExecutionViewer'

const page = ({params}:{
    params: {
        workflowId: string,
        executionId: string
    }
}) => {
  return (
    <div className='flex flex-col h-screen w-full overflow-hidden'>
        <Topbar workflowId={params.workflowId} title= "Workflow run details" 
        subtitle={`Run ID: ${params.executionId}`} 
        hideButtons/>
        <section className='flex h-full overflow-auto'>
            <Suspense fallback={
                <div className='flex w-full items-center justify-center'>
                    <Loader2Icon className='h-10 w-10 animate-spin stroke-primary'/>
                </div>
            }>
                <ExecutionViewerWrapper executionId={params.executionId}/>
            </Suspense>
        </section>
    </div>
  )
}

export default page

async function ExecutionViewerWrapper({executionId}:{executionId:string}){
    const workflowExecution = await GetWorkflowExecutionWithPhases(executionId)
    if(!workflowExecution){
        return <div>Execution not found</div>
    }
   return <ExecutionViewer initialData={workflowExecution}/>

}