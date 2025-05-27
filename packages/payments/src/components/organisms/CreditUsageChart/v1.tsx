"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/card'
import { ChartColumnStacked } from 'lucide-react'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent} from '@repo/ui/molecules/shadcn/chart'
import {  Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { GetCreditsUsageInPeriod } from '../../../../../../apps/nextjs-app/app/(home)/_actions/analytics'

type ChartData = Awaited<ReturnType<typeof GetCreditsUsageInPeriod>>

const CreditUsageChart= ({data,title,description}:{data:ChartData,title:string,description:string}) => {
    const chartConfig = {
        success:{
            label: "Success",
            color: "hsl(var(--chart-2))"
        },
        failed:{
            label: "Failed",
            color: "hsl(var(--chart-3))"
        },
    }
  return (
    <Card className='bg-sidebar'>
        <CardHeader>
            <CardTitle className='text-2xl font-bold flex text-center gap-2'>
                <ChartColumnStacked className='w-6 h-6 text-primary'/>
                {title}
            </CardTitle>
            <CardDescription>
                {description}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className='max-h-[200px] w-full'>
                <BarChart data={data} height={200} accessibilityLayer margin={{top:20}}>
                    <CartesianGrid vertical={false}/>
                    <XAxis dataKey={'date'} tickLine={false} axisLine={false} 
                    tickMargin={8} minTickGap={32} tickFormatter={(value)=>{
                        const date = new Date(value)
                        return date.toLocaleDateString("en-US",{month:"short",day:"numeric"})
                    }}/>
                    <ChartLegend content={<ChartLegendContent/>}/>
                    <ChartTooltip content={<ChartTooltipContent className='w-[250px]'/>}/>
                    <Bar dataKey="success" fill='var(--color-success)' radius={[0,0,4,4]}
                    fillOpacity={0.8} stroke='var(--color-success)' stackId={'a'}/>
                    <Bar dataKey="failed" fill='var(--color-failed)' radius={[4,4,0,0]}
                    fillOpacity={0.8} stroke='var(--color-failed)' stackId={'a'}/>
                </BarChart>
            </ChartContainer>
        </CardContent>
    </Card>
  )
}

export default CreditUsageChart