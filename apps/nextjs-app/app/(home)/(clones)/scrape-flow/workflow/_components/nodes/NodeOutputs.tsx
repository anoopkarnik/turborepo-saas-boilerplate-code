"use client"

import React, { ReactNode } from 'react'

const NodeOutputs = ({children}:{children: ReactNode}) => {
  return (
    <div className='flex flex-col divide-y gap-1'>{children}</div>
  )
}

export default NodeOutputs