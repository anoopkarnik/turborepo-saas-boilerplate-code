"use client"
import { Button } from '@repo/ui/atoms/shadcn/button'
import TooltipWrapper from '@repo/ui/molecules/custom/v1/TooltipWrapper'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ChevronLeftIcon } from 'lucide-react'
import SaveBtn from './SaveBtn'

const Topbar = ({title,subtitle,workflowId}:{title:string, subtitle?:string,workflowId:string}) => {
    const router = useRouter()
  return (
    <header className='flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10'>
        <div className='flex gap-1 flex-1'>
            <TooltipWrapper content="Back">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeftIcon size={20}/>
                </Button>
            </TooltipWrapper>
            <div>
                <p className='font-bold text-ellipsis truncate'>{title}</p>
                {subtitle && (
                    <p className='text-xs text-muted-foreground truncate text-ellipsis'>{subtitle}</p>
                )}
            </div>
        </div>
        <div className='flex gap-1 flex-1 justify-end'>
            <SaveBtn workflowId={workflowId}/>
        </div>
    </header>
  )
}

export default Topbar