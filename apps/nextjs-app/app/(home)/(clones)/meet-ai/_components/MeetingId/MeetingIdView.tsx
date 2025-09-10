"use client"
interface Props { 
    meetingId: string;
}

import { useTRPC } from '@/trpc/client';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import MeetingIdViewHeader from './MeetingIdViewHeader';
import { useRouter } from 'next/navigation';
import { useToast } from '@repo/ui/hooks/use-toast';
import { useConfirm } from '../../_hooks/useConfirm';
import UpdateMeetingDialog from './UpdateMeetingDialog';
import { AgentMeetingStatus } from "@prisma/client"
import UpcomingState from './UpcomingState';
import OngoingState from './OngoingState';
import CancelledState from './CancelledState';
import ProcessingState from './ProcessingState';
import CompletedState from './CompletedState';

const MeetingIdView = ({ meetingId }: Props) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }));
    const router = useRouter();
    const queryClient = useQueryClient();

    const { toast } = useToast();

    const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                router.push('/meet-ai/meetings');
            },
            onError: () => {
                toast({
                    title: 'Error',
                    description: 'Failed to remove meeting',
                    variant: 'destructive',
                });
            }
        })
    )

    const [RemoveConfirmation, confirmRemove] = useConfirm("Are you sure?",`
        The following action will remove the meeting <strong>${data.name}</strong>. This action cannot be undone.`);

    const handleRemoveMeeting = async() => {
        const ok = await confirmRemove();
        if (!ok) return;
        await removeMeeting.mutateAsync({id: meetingId})
    }

    const isOngoing = data.status === AgentMeetingStatus.ONGOING;
    const isUpcoming = data.status === AgentMeetingStatus.UPCOMING;
    const isCompleted = data.status === AgentMeetingStatus.COMPLETED;
    const isProcessing = data.status === AgentMeetingStatus.PROCESSING;
    const isCancelled = data.status === AgentMeetingStatus.CANCELLED;

  return (
    <>
        <RemoveConfirmation/>
        <UpdateMeetingDialog
            open={updateMeetingDialogOpen}
            onOpenChange={setUpdateMeetingDialogOpen}
            initialValues={data}
        />
        <div className='flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <MeetingIdViewHeader meetingId={meetingId} meetingname={data.name}
            onEdit={() => setUpdateMeetingDialogOpen(true)} onRemove={handleRemoveMeeting} />
            {isCancelled && <CancelledState />}
            {isCompleted && <CompletedState data={data} />}
            {isOngoing && <OngoingState meetingId={meetingId} />}
            {isProcessing && <ProcessingState />}
            {isUpcoming && <UpcomingState 
                meetingId={meetingId}
                isCancelling={false}
            />}

        </div>
    </>
  )
}

export default MeetingIdView