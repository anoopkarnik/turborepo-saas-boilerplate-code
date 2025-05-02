"use client"
import { Button } from '@repo/ui/atoms/shadcn/button'
import TooltipWrapper from '@repo/ui/molecules/home/TooltipWrapper/v1'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ChevronLeftIcon } from 'lucide-react'
import SaveBtn from './SaveBtn'
import ExecuteBtn from './ExecuteBtn'
import NavigationTabs from './NavigationTabs'
import PublishBtn from './PublishBtn'
import UnpublishBtn from './UnpublishBtn'

const Topbar = ({title,subtitle,workflowId, hideButtons=false,isPublished=false}:{
    title:string, subtitle?:string,workflowId:string,hideButtons?:boolean,isPublished?:boolean}) => {
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
        <NavigationTabs workflowId={workflowId}/>
        <div className='flex gap-1 flex-1 justify-end'>
            {!hideButtons &&
            <>
                <ExecuteBtn workflowId={workflowId}/>
                {isPublished && <UnpublishBtn  workflowId={workflowId}/>}
                {!isPublished &&
                    <>
                        <SaveBtn workflowId={workflowId}/>
                        <PublishBtn workflowId={workflowId}/>
                    </>
                }
            </>
            }
        </div>
    </header>
  )
}

export default Topbar