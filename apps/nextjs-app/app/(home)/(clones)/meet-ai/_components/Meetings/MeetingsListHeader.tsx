"use client"
import { Button } from '@repo/ui/atoms/shadcn/button'
import { PlusIcon, XCircleIcon} from 'lucide-react'
import React, { useState } from 'react'



import NewMeetingDialog from './NewMeetingDialog'
import { useMeetingsFilters } from '../../_hooks/useMeetingsFilters'
import { DEFAULT_PAGE } from '../../_utils/constants'
import MeetingsSearchFilter from './MeetingsSearchFilter'
import { StatusFilter } from './StatusFilter'
import AgentIdFilter from './AgentIdFilter'
import { ScrollArea, ScrollBar } from '@repo/ui/molecules/shadcn/scroll-area'

const MeetingsListHeader = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [filters, setFilters] = useMeetingsFilters();
    const isAnyFilterModified = !!filters.search || !!filters.status || !!filters.agentId;

    const onClearFilters = () => {
        setFilters({ search: '',page: DEFAULT_PAGE, status: null, agentId: null });
    }
  return (
    <>
        <NewMeetingDialog open={openDialog} onOpenChange={setOpenDialog} />
        <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <div className='flex items-center justify-between'>
                <h5 className="text-xl font-medium">My Meetings</h5>
                <Button variant="default" onClick={() => {setOpenDialog(true)}}>
                    <PlusIcon className="mr-2" />
                    New Meeting
                </Button>
            </div>
            <ScrollArea>
                <div className='flex items-center gap-x-2 p-1'>
                    <MeetingsSearchFilter />
                    <StatusFilter />
                    <AgentIdFilter />
                    {isAnyFilterModified && (
                        <Button variant="outline" size="sm" onClick={onClearFilters}>
                            <XCircleIcon className='mr-2 size-4' />
                            Clear 
                        </Button>
                    )}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    </>
  )
}

export default MeetingsListHeader