"use client"
import { Button } from '@repo/ui/atoms/shadcn/button'
import { PlusIcon} from 'lucide-react'
import React, { useState } from 'react'



import NewMeetingDialog from './NewMeetingDialog'

const MeetingsListHeader = () => {
    const [openDialog, setOpenDialog] = useState(false)

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
            <div className='flex items-center gap-x-2 p-1'>
                
            </div>
        </div>
    </>
  )
}

export default MeetingsListHeader