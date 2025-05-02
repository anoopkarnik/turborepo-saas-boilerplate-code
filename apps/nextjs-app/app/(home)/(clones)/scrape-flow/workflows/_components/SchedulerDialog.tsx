"use client"

import { Dialog, DialogTrigger,DialogContent, DialogFooter, DialogClose } from '@repo/ui/molecules/shadcn/dialog'
import React, { useEffect, useState } from 'react'
import { TriangleAlertIcon, CalendarIcon, ClockIcon } from 'lucide-react'
import { Button } from '@repo/ui/atoms/shadcn/button'
import { cn } from '@repo/ui/lib/utils'
import CustomDialogHeader from '@repo/ui/molecules/misc/CustomDialogHeader/v1'
import { Input } from '@repo/ui/atoms/shadcn/input'
import { useMutation } from '@tanstack/react-query'
import { RemoveWorkflowSchedule, UpdateWorkflowCron } from '../../_actions/workflows'
import { useToast } from '@repo/ui/hooks/use-toast'
import cronstrue from 'cronstrue'
import parser from 'cron-parser'

const SchedulerDialog = (props:{workflowId:string,cron:string | null}) => {
    const {toast} = useToast()
    const [cron, setCron] = useState(props.cron)
    const [validCron, setValidCron] = useState(false)
    const [readableCron, setReadableCron] = useState('')

    const mutation = useMutation({
        mutationFn: UpdateWorkflowCron,
        onError: ()=>{
            toast({title: "Error", description: "Something went wrong", variant: 'destructive'})
        },
        onSuccess: ()=>{
            toast({title: "Success", description: "Schedule Updated Successsfully", variant: 'success'})
        }
    })

    const removeScheduleMutation = useMutation({
        mutationFn: RemoveWorkflowSchedule,
        onError: ()=>{
            toast({title: "Error", description: "Something went wrong", variant: 'destructive'})
        },
        onSuccess: ()=>{
            toast({title: "Success", description: "Schedule Removed Successfully", variant: 'success'})
        }
    })

    useEffect(()=>{
        try {
            parser.parseExpression(cron as string)
            const humanCronStr = cronstrue.toString(cron as string)
            setValidCron(true)
            setReadableCron(humanCronStr)
        } catch {
            setValidCron(false)
        }
    },[cron])

    const workflowHasValidCron = props.cron && props.cron.length > 0
    const readableSavedCron = workflowHasValidCron && cronstrue.toString(props.cron!) 

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant='link' size='sm' className={cn('text-sm p-0 h-auto text-orange-500 shadow-none',
                workflowHasValidCron && 'text-primary'
            )}>
                {workflowHasValidCron &&(
                    <div className='flex items-center gap-2'>
                        <ClockIcon/>
                        {readableSavedCron}
                    </div>
                )}
                {!workflowHasValidCron &&(
                    <div className='flex gap-1 items-center'>
                        <TriangleAlertIcon className='h-3 w-3'/> Set schedule
                    </div>
                )}

            </Button>
        </DialogTrigger>
        <DialogContent className='px-0'>
            <CustomDialogHeader title='Schedule Workflow execution' icon={CalendarIcon}/>
            <div className='p-6 space-y-4'>
                <p> Specify a cron expression to schedule periodic workflow execution. 
                    All times are in UTC
                </p>
                <Input placeholder='E.g. * * * * *' value={cron as string} onChange={(e)=> setCron(e.target.value)}/>
                <div className={cn('bg-accent rounded-md p-4 border text-sm border-destructive text-destructive',
                    validCron && 'border-primary text-primary'
                 )}>
                    {validCron ? readableCron : 'Invalid cron expression'}
                </div>
                {workflowHasValidCron && <DialogClose asChild>
                <div className=''>
                    <Button className='w-full text-destructive border-destructive hover:text-destructive'
                    variant={'outline'} disabled={mutation.isPending || removeScheduleMutation.isPending} 
                    onClick={()=>{
                        toast({title: "Removing schedule", description: "Please wait", variant: 'default'})
                        removeScheduleMutation.mutate(props.workflowId)
                    }
                   }>
                        Remove Current Schedule
                    </Button>
                </div>
                    </DialogClose>}
            </div>
            <DialogFooter className='px-6 gap-2'>
            <DialogClose asChild>
                <Button className='w-full' variant={'secondary'}>
                    Cancel
                </Button>
            </DialogClose>
            <DialogClose asChild>
                <Button className='w-full' disabled={mutation.isPending || !validCron} onClick={()=>{
                    toast({title: "Saving schedule", description: "Please wait", variant: 'default'})
                    mutation.mutate({
                        id: props.workflowId,
                        cron: cron as string
                    })
                }}>
                    Save
                </Button>
            </DialogClose>
        </DialogFooter>
        </DialogContent>
        
    </Dialog>
  )
}

export default SchedulerDialog