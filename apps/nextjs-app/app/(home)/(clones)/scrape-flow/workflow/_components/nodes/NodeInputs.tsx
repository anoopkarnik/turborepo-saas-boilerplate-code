import React from 'react'

const NodeInputs = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex flex-col divide-y gap-2'>
        {children}
    </div>
  )
}

export default NodeInputs