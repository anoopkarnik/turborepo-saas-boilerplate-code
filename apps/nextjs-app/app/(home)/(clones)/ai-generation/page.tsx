"use client"
import React, { useEffect, useState } from 'react'
import { Card } from '@repo/ui/molecules/shadcn/card'
import { sidebarItems } from '../../../../lib/constants/home'
import { sidebarHeaderItemsProps } from '@repo/ts-types/home/v1'
import { cn } from '@repo/ui/lib/utils'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'


const AISaaS = () => {

    const [routes, setRoutes] = useState<sidebarHeaderItemsProps[]>([]);

    const router = useRouter();

    useEffect(() => {
            // @ts-expect-error Object possibly undefined error
        setRoutes(sidebarItems["Application"]?.filter(x => x.title=="AI Generation")[0]?.items);
    }, [])

  return (
    <div>
        <div className='my-8 space-y-4'>
            <h2 className='text-2xl md:text-4xl font-bold text-center'>
                Explore the power of AI
            </h2>
            <p className='text-description text-center '>
                Chat with the smartest AI - Experience the power of AI
            </p>
        </div>
        <div className='px-4 md:px-20 lg:px-32 space-y-4'>
            {
                routes?.map((route:sidebarHeaderItemsProps) => (
                    <Card key={route.title} onClick={() => router.push(route.url as string)}
                    className='p-4 border-border border-[1px] flex items-center
                    justify-between hover:shadow-md hover:opacity-80 transition cursor-pointer'>
                        <div className='flex items-center gap-x-4 w-full'>
                            <div className={cn("p-2 w-full rounded-md flex items-center justify-between",)}>
                                <div className='flex items-center justify-start gap-2'>
                                    <route.icon size={30} />
                                    <div>{route.title}</div>
                                </div>
                                <ArrowRight size={20} />
                            </div>
                        </div>
                    </Card>
                ))
            }
        </div>
    </div>
  )
}

export default AISaaS