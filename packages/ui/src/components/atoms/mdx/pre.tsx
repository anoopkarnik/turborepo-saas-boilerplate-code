import React from 'react'

const pre = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='overflow-auto w-full my-2 p-2 rounded-lg'>
        <pre>
            {children}
        </pre>
    </div>
  )
}

export default pre