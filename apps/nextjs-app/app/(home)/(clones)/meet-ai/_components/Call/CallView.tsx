"use client"
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'
import { AgentMeetingStatus } from '@prisma/client';
import ErrorState from '../ErrorState';
import CallProvider from './CallProvider';

const CallView = ({ meetingId }: { meetingId: string }) => {

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }));

    if (data.status === AgentMeetingStatus.COMPLETED){
        return (
            <div className='flex h-screen items-center justify-center'>
                <ErrorState
                    title="Meeting Ended"
                    description="This meeting has already ended. You can no longer join the meeting."
                />
            </div>
        )
    }

  return (
    <CallProvider meetingId={data.id} meetingName={data.name} />
  )
}

export default CallView