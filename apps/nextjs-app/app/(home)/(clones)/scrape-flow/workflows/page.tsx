import React, { Suspense } from 'react'
import UserWorkflowsSkeleton from './_components/UserWorkflowsSkeleton'
import {UserWorkflows} from './_components/UserWorkflows'
import CreateWorkflowDialog from './_components/CreateWorkflowDialog'

const page = () => {
  return (
    <div className='flex flex-1 flex-col h-full m-4'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <div className='text-title-h3'>Workflows</div>
          <div className='text-description'>Manage your workflows</div>
        </div>
        <CreateWorkflowDialog/>
      </div>
      <div className='h-full py-6'>
        <Suspense fallback={<UserWorkflowsSkeleton/>}>
          <UserWorkflows/>
        </Suspense>
      </div>
    </div>
  )
}

export default page