import React, { Suspense } from 'react'
import { Skeleton } from '@repo/ui/molecules/shadcn/skeleton'

import CreditsPurchase from '@repo/payments/components/organisms/CreditsPurchase/v2'
import { Period } from '@repo/ts-types/scrape-flow/analytics'
import { GetCreditsUsageInPeriod } from '../_actions/analytics'
import CreditUsageChart from '@repo/payments/components/organisms/CreditUsageChart/v1'
import { BalanceCard } from '@repo/payments/components/organisms/BalanceCard/v1'
import { TransactionHistoryCard } from '@repo/payments/components/organisms/TransactionHistoryCard/v1'

const BillingPage = () => {
  return (
    <div className='mx-auto p-4 space-y-8 w-full'>
      <h1 className='text-3xl font-bold'>Billing</h1>
      <Suspense fallback={<Skeleton className='h-[166px] w-full'/>}>
        <BalanceCard />
      </Suspense>
      <CreditsPurchase/>
      <Suspense fallback={<Skeleton className='h-[300px] w-full'/>}>
        <CreditsUsageCard/>
      </Suspense>
      <Suspense fallback={<Skeleton className='h-[300px] w-full'/>}>
        <TransactionHistoryCard/>
      </Suspense>
    </div>
  )
}


async function CreditsUsageCard() {
  const period:Period = {
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  }

  const data = await GetCreditsUsageInPeriod(period)
  return (
    <CreditUsageChart data={data} title='Credit Usage' description='Credits used in the current month'/>
  )
}


export default BillingPage

