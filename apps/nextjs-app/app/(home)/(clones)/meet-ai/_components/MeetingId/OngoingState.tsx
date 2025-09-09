import React from 'react'
import EmptyState from '../EmptyState'
import { Button } from '@repo/ui/atoms/shadcn/button'
import { VideoIcon } from 'lucide-react'
import Link from 'next/link'

interface Props {
    meetingId: string;
}

const OngoingState = ({ meetingId}: Props) => {
  return (
    <div className='rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center'>
        <EmptyState 
        title="Meeting is Ongoing" 
        description="This meeting is currently ongoing. Meeting will end when all participants leave." />
        <div className='flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full'>

            <Button asChild className='w-full lg:w-auto' >
                <Link href={`/call/${meetingId}`}>
                    <VideoIcon className='mr-2 size-4'/>
                    Join Meeting
                </Link>
            </Button>
        </div>
    </div>
  )
}

export default OngoingState