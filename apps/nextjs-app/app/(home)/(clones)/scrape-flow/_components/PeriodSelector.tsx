"use client"

import { Period } from '@repo/ts-types/scrape-flow/analytics'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/select'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] as const

const PeriodSelector = ({selectedPeriod,periods}:{selectedPeriod:Period,periods:Period[]}) => {
    const searchParams = useSearchParams()
    const router = useRouter()
  return (
    <Select value={`${selectedPeriod.month}-${selectedPeriod.year}`} onValueChange={value=>{
        const [month,year] = value.split('-')
        const params = new URLSearchParams(searchParams)
        params.set('month',month as string)
        params.set('year',year as string)
        router.push(`?${params.toString()}`)
    }}>
        <SelectTrigger className='w-[180px]'>
            <SelectValue/>
        </SelectTrigger>
        <SelectContent>
            {periods.map((period:Period,index) => (
                <SelectItem key={index} value={`${period.month}-${period.year}`}>
                    {`${MONTH_NAMES[period.month]}-${period.year}`}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}

export default PeriodSelector