import { Card, CardContent } from "@repo/ui/molecules/shadcn/card"
import { GetAvailableCredits } from "../../../billing"
import { CoinsIcon } from "lucide-react"
import { CardFooter } from "@repo/ui/molecules/shadcn/card"

export async function BalanceCard() {
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