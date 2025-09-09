import React from 'react'
import EmptyState from '../EmptyState'
import { Button } from '@repo/ui/atoms/shadcn/button'
import { BanIcon, VideoIcon } from 'lucide-react'
import Link from 'next/link'

interface Props {
    meetingId: string;
    onCancelMeeting: () => void;
    isCancelling: boolean;
}

const UpcomingState = ({ meetingId, onCancelMeeting, isCancelling }: Props) => {
  return (
    <div className='rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center'>
        <EmptyState 
        title="Not started yet" 
        description="This meeting has not started yet. Please wait for the host to start the meeting." />
        <div className='flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full'>
            <Button variant={'secondary'} className='w-full lg:w-auto'  
            onClick={onCancelMeeting} disabled={isCancelling}>
                <BanIcon className='mr-2 size-4'/>
                Cancel Meeting
            </Button>
            <Button asChild className='w-full lg:w-auto' disabled={isCancelling}>
                <Link href={`/call/${meetingId}`}>
                    <VideoIcon className='mr-2 size-4'/>
                    Start Meeting
                </Link>
            </Button>
        </div>
    </div>
  )
}

export default UpcomingState