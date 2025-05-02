"use client"

import { Tabs, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/tabs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavigationTabs = ({workflowId}:{workflowId:string}) => {
    const pathname = usePathname()
    const activeValue = pathname?.split('/')[3]

  return (
    <Tabs value={activeValue} className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
            <Link href={`/scrape-flow/workflow/editor/${workflowId}`}>
                <TabsTrigger value='editor' className='w-full'>Editor</TabsTrigger>
            </Link>
            <Link href={`/scrape-flow/workflow/runs/${workflowId}`}>
            <TabsTrigger value='runs' className='w-full'>Runs</TabsTrigger>
            </Link>
        </TabsList>
    </Tabs>
  )
}

export default NavigationTabs