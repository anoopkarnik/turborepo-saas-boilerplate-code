"use client"

import React, {  useId } from 'react'
import {ParamProps} from '@repo/ts-types/scrape-flow/param'
import { Label } from '@repo/ui/atoms/shadcn/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/select'
import { useQuery } from '@tanstack/react-query'
import { ConnectionType } from '@repo/ts-types/home/v1'
import { GetConnectionsForUser } from '../../../../../../../actions/connections'

const APIKeysParam = ({param,updateNodeParamValue,value}:ParamProps) => {
  const id = useId()

  const query = useQuery({
    queryKey: ["credentials-for-user"],
    queryFn: () => GetConnectionsForUser(),
    refetchInterval: 10000
  })

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
              <SelectLabel>API Keys</SelectLabel>
              {query.data?.filter((apiKey)=> apiKey.type === ConnectionType.ApiKey).map((apiKey) => (
                  <SelectItem key={apiKey.id} value={apiKey.id}>
                    {apiKey.name}
                  </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

    </div>
  )
}

export default APIKeysParam