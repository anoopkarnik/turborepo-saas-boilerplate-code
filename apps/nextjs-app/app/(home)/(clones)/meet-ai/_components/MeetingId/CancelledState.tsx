import React from 'react'
import EmptyState from '../EmptyState'

const CancelledState = () => {
  return (
    <div className='rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center'>
        <EmptyState 
        title="Meeting has been cancelled" 
        description="This meeting has been cancelled. Please contact the host for more information." />
    </div>
  )
}

export default CancelledState