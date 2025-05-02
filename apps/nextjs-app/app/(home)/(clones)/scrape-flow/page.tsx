import React, { Suspense } from 'react'
import { GetCreditsUsageInPeriod, GetPeriods, GetStatsCardsValues, GetWorkflowExecutionStats } from '../../_actions/analytics'
import PeriodSelector from './_components/PeriodSelector'
import { Period } from '@repo/ts-types/scrape-flow/analytics'
import { Skeleton } from '@repo/ui/molecules/shadcn/skeleton'
import {CirclePlayIcon, WaypointsIcon, CoinsIcon} from 'lucide-react'
import StatCard from './_components/StatCard'
import ExecutionStatusChart from './_components/ExecutionStatusChart'
import CreditUsageChart from '../../../../../../packages/payments/src/components/organisms/v1/CreditUsageChart'

const ScrapeFlowHome = ({searchParams}:{
  searchParams: {month?: string, year?: string}
}) => {
  const currentDate = new Date()
  const {month, year} = searchParams

  const period: Period = {
    month: month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear()
  }
  return (
    <div className='flex flex-1 flex-col h-full py-4'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
        <Suspense fallback={<Skeleton className='w-[180px] h-[40px]'/>}>
            <PeriodSelectorWrapper selectedPeriod={period} />
        </Suspense>
      </div>
      <div className='h-full py-6 flex flex-col gap-4'>
        <Suspense fallback={<StatsCardSkeleton/>}>
          <StatsCard selectedPeriod={period}/>
        </Suspense>
        <Suspense fallback={<Skeleton className='w-full h-[300px]'/>}>
          <StatsExecutionStatus selectedPeriod={period}/>
        </Suspense>
        <Suspense fallback={<Skeleton className='w-full h-[300px]'/>}>
          <CreditsUsageInPeriod selectedPeriod={period}/>
        </Suspense>
      </div>
    </div>
  )
}

async function PeriodSelectorWrapper({selectedPeriod}:{selectedPeriod:Period}) {
  const periods = await GetPeriods()

  return <PeriodSelector selectedPeriod={selectedPeriod} periods={periods} />
}

async function StatsCard({selectedPeriod}:{selectedPeriod:Period}) {
  const data = await GetStatsCardsValues(selectedPeriod)
  return (
    <div className='grid gap-3 lg-gap-8 lg:grid-cols-3 min-h-[120px]'>
      <StatCard 
      title='Workflow Executions' 
      value={data.WorkflowExecution}
      icon={CirclePlayIcon} />
      <StatCard 
      title='Phase Executions' 
      value={data.PhasesExecutions}
      icon={WaypointsIcon} />
      <StatCard 
      title='Credits Consumed' 
      value={data.CreditsConsumed}
      icon={CoinsIcon} />
   </div>
  )
}

function StatsCardSkeleton() {
  return (
    <div className='grid gap-3 lg-gap-8 lg:grid-cols-3 '>
      {[1,2,3].map((index) => (
        <Skeleton key={index} className='w-full min-h-[120px]'/>
      ))}
    </div>
  )
}

async function StatsExecutionStatus({selectedPeriod}:{selectedPeriod:Period}) {
  const data = await GetWorkflowExecutionStats(selectedPeriod)

  return (
   <ExecutionStatusChart data={data}/>
  )
}

async function CreditsUsageInPeriod({selectedPeriod}:{selectedPeriod:Period}) {
  const data = await GetCreditsUsageInPeriod(selectedPeriod)

  return (
   <CreditUsageChart data={data} title='Daily Credits Spent' 
   description='Daily credits spent in specified period'/>
  )
}


export default ScrapeFlowHome