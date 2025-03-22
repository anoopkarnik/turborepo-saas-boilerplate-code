import React from 'react'

interface EmptyProps {
    label: string
}
const Empty = ({label}:EmptyProps) => {
  return (
    <div className='h-full p-20 flex flex-coll items-center justify-center'>
        <p className='text-description'>{label}</p>
    </div>
  )
}

export default Empty