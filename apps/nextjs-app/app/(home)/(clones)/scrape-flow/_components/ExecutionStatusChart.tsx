"use client"

import React from 'react'
import { GetWorkflowExecutionStats } from '../../../_actions/analytics'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/card'
import { Layers2 } from 'lucide-react'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent} from '@repo/ui/molecules/shadcn/chart'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

type ChartData = Awaited<ReturnType<typeof GetWorkflowExecutionStats>>

const ExecutionStatusChart = ({data}:{data:ChartData}) => {
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
                <Layers2 className='w-6 h-6 text-primary'/>
                Workflow Execution Status
            </CardTitle>
            <CardDescription>
                Daily number of successful and failed workflow executions
            </CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className='max-h-[200px] w-full'>
                <AreaChart data={data} height={200} accessibilityLayer margin={{top:20}}>
                    <CartesianGrid vertical={false}/>
                    <XAxis dataKey={'date'} tickLine={false} axisLine={false} 
                    tickMargin={8} minTickGap={32} tickFormatter={(value)=>{
                        const date = new Date(value)
                        return date.toLocaleDateString("en-US",{month:"short",day:"numeric"})
                    }}/>
                    <ChartLegend content={<ChartLegendContent/>}/>
                    <ChartTooltip content={<ChartTooltipContent className='w-[250px]'/>}/>
                    <Area min={0} type={"bump"} dataKey="success" fill='var(--color-success)' 
                    fillOpacity={0.6} stroke='var(--color-success)' stackId={'a'}/>
                    <Area min={0} type={"bump"} dataKey="failed" fill='var(--color-failed)' 
                    fillOpacity={0.6} stroke='var(--color-failed)' stackId={'a'}/>
                </AreaChart>
            </ChartContainer>
        </CardContent>
    </Card>
  )
}

export default ExecutionStatusChart