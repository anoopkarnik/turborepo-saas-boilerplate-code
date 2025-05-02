"use client"

import React, { useId } from 'react'
import {ParamProps} from '@repo/ts-types/scrape-flow/param'
import { Label } from '@repo/ui/atoms/shadcn/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/select'

type OptionType = {
  value: string
  label: string
}

const SelectParam = ({param,updateNodeParamValue,value}:ParamProps) => {
  const id = useId()
  return (
    <div className='flex flex-col gap-1 w-full'>
        <Label htmlFor={id} className='text-xs flex'>
          {param.name}
          {param.required && <p className='text-red-400 px-2'>*</p>}
        </Label>
        <Select onValueChange={value=>updateNodeParamValue(value)} defaultValue={value}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Select an option' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Options</SelectLabel>
              {param.options.map((option:OptionType) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

    </div>
  )
}

export default SelectParam