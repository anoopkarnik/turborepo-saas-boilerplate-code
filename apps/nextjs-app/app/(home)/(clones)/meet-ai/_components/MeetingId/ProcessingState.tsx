import React from 'react'
import EmptyState from '../EmptyState'

const ProcessingState = () => {
  return (
    <div className='rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center'>
        <EmptyState 
        title="Meeting is completed" 
        description="This meeting is currently being processed. Please wait for the summary." />
    </div>
  )
}

export default ProcessingState