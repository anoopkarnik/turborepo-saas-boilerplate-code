"use client"
import { Input } from '@repo/ui/atoms/shadcn/input'
import { Label } from '@repo/ui/atoms/shadcn/label'
import React, { useEffect, useId, useState } from 'react'
import {ParamProps} from '@repo/ts-types/scrape-flow/param'
import { Textarea } from '@repo/ui/atoms/shadcn/textarea'


const StringParam = ({param,value,updateNodeParamValue,disabled}:ParamProps) => {
    const [internalValue, setInternalValue] = useState(value)
    const id = useId()

    useEffect(() => {
      setInternalValue(value)
    },[value])

    let Component: any = Input;

    if (param.variant == "textarea") {
       Component = Textarea
    }

  return (
    <div className='space-y-1 p-1 w-full'>
        <Label htmlFor={id} className='text-xs flex'>
            {param.name}
            {param.required && <p className='text-destructive px-1'>*</p>}
        </Label>
        <Component id={id} placeholder={param.helperText} value={internalValue} disabled={disabled}
        onChange={(e:any)=>setInternalValue(e.target.value)}
        onBlur={(e:any)=>updateNodeParamValue(e.target.value)}
        className='text-xs'
        />
        
    </div>
  )
}

export default StringParam