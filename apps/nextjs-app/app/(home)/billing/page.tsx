import React, { Suspense } from 'react'
import { Skeleton } from '@repo/ui/molecules/shadcn/skeleton'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@repo/ui/molecules/shadcn/card'
import { CoinsIcon, ArrowLeftRightIcon } from 'lucide-react'
import CreditsPurchase from '@repo/payments/components/organisms/v1/CreditsPurchase'
import { Period } from '@repo/ts-types/scrape-flow/analytics'
import { GetCreditsUsageInPeriod } from '../_actions/analytics'
import CreditUsageChart from '@repo/payments/components/organisms/v1/CreditUsageChart'
import InvoiceBtn from '@repo/payments/components/molecules/InvoiceBtn'
import { GetAvailableCredits, GetUserPurchaseHistory } from '../../../../../packages/payments/src/billing'

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

async function BalanceCard() {
  const userBalance = await GetAvailableCredits()
  return (
    <Card className='bg-gradient-to-br from-primary/10 via-primary/5 to-background 
    border-primary/20 shadow-lg flex justify-between flex-col overflow-hidden'>
      <CardContent className='p-6 relative items-center'>
        <div className='flex justify-between items-center'>
            <div>
                <h3 className='text-lg font-semibold text-foreground mb-1'>
                  Available Credits
                </h3>
                <p className='text-4xl font-bold text-primary'>
                  {userBalance}
                </p>
            </div>
            <CoinsIcon size={140} className='text-primary opacity-20 absolute bottom-0 right-0'/>
        </div>
      </CardContent>
      <CardFooter className='text-muted-foreground text-sm'>
        When your credit balance reaches zero, your workflows will stop working
      </CardFooter>
    </Card>
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



async function TransactionHistoryCard(){
  const purchases = await GetUserPurchaseHistory();
  return (
    <Card className='bg-sidebar p-4'>
      <CardTitle className='text-2xl font-bold flex items-center gap-2'>
        <ArrowLeftRightIcon className="h-6 w-6 text-primary"/>
        Transaction History
      </CardTitle>
      <CardDescription>
        View your transaction history and download invoices
      </CardDescription>
      <CardContent className='space-y-4'>
        {purchases.length===0 &&(
          <p className='text-muted-foreground text-center'>
            No transactions found
          </p>
        )}
        {purchases.map((purchase,index) => (
          <div key={purchase.id} className='flex justify-between items-center py-3 border-b last:border-b-0'>
            <div className='flex items-center gap-2 '>
              <div>
                {index+1})
              </div>
              <div >
                <p className='font-medium'> {formatDate(purchase.date)}</p>
                <p className='text-sm text-muted-foreground'>{purchase.description}</p>
              </div>
            </div>
            <div className='text-right flex items-center gap-4'>
              <p className='font-medium'>
                {formatAmount(purchase.amount, purchase.currency)}
              </p>
              <InvoiceBtn id={purchase.eventId}/>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default BillingPage

function formatDate (date:Date){
  return new Intl.DateTimeFormat("en-US",{
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date)
}

function formatAmount (amount:number, currency:string){
  return new Intl.NumberFormat('en-US',{
    style: 'currency',
    currency
  }).format(amount/100)
}