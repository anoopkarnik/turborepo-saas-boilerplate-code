"use client"

import React from 'react'
import {ParamProps} from '@repo/ts-types/scrape-flow/param'

const BrowserInstanceParam = ({param}:ParamProps) => {
  return (
    <p className='text-xs'>
        {param.name}
    </p>
  )
}

export default BrowserInstanceParam