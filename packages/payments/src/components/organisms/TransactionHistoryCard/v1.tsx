import { Card, CardContent, CardDescription, CardTitle } from "@repo/ui/molecules/shadcn/card";
import { GetUserPurchaseHistory } from "../../../billing";
import { formatAmount, formatDate } from "../../../utils";
import InvoiceBtn from "../../molecules/InvoiceButton/v1";
import { ArrowLeftRightIcon } from "lucide-react";

export async function TransactionHistoryCard(){
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