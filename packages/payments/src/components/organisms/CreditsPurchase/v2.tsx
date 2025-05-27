"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/card';
import { GetAvailableCredits } from '../../../billing';
import { useEffect, useState } from 'react'
import { Info } from 'lucide-react';
import { Slider } from '@repo/ui/molecules/shadcn/slider';
import { Button } from '@repo/ui/atoms/shadcn/button';
import { createCheckoutSession } from '../../../stripe/main';

const v2 = () => {
    const [creditsLeft, setCreditsLeft] = useState<number | null>(null);
    const [creditsToBuy, setCreditsToBuy] = useState<number[]>([100])

    const creditsToBuyAmount = creditsToBuy[0] ?? 100; // Default to 100 if no selection is made
    const price = (creditsToBuyAmount / 50).toFixed(2)

    useEffect(() =>{
        const fetchCredits = async () => {
            try {

            const data = await GetAvailableCredits();
            setCreditsLeft(data);
            } catch (error) {
            console.error('Failed to fetch credits:', error);
            }
        };

        fetchCredits();
    },[])

  return (
    <Card className='bg-sidebar'>
        <CardHeader>
            <CardTitle className='text-2xl font-bold flex items-center gap-2'>
                Purchase Credits
            </CardTitle>
            <CardDescription>
                You currently have { creditsLeft} credits.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <CardDescription>
                <div className='flex items-center gap-2'>
                    <Info className='h-4 w-4'/>
                    <p>Each credit allows you to index 1 file in a repository for Ai Github clone</p>
                </div>
                <p> E.g. If your project has 100 files, you will need 100 credits to index it.</p>
            </CardDescription>
            <div className='h-4'></div>
            <Slider  defaultValue={[100]} max={1000} min={50} step={50 }
            onValueChange={(value) => setCreditsToBuy(value)} value={creditsToBuy}/>
            <div className='h-4'></div>
            <Button onClick={()=>{
                createCheckoutSession(creditsToBuyAmount)
            }}>
                Buy {creditsToBuyAmount} Credits for ${price}
            </Button>

        </CardContent>

        <CardFooter className='flex items-center gap-4'>

        </CardFooter>
    </Card>
  )
}

export default v2