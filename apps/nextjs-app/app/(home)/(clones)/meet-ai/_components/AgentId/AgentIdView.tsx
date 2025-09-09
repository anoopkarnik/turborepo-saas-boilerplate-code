"use client"
interface Props { 
    agentId: string;
}

import { useTRPC } from '@/trpc/client';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import AgentIdViewHeader from './AgentIdViewHeader';
import { Badge } from '@repo/ui/atoms/shadcn/badge';
import { VideoIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@repo/ui/hooks/use-toast';
import { useConfirm } from '../../_hooks/useConfirm';
import UpdateAgentDialog from './UpdateAgentDialog';
import GeneratedAvatar from '../GeneratedAvatar';

const AgentIdView = ({ agentId }: Props) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));
    const router = useRouter();
    const queryClient = useQueryClient();

    const { toast } = useToast();

    const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

    const removeAgent = useMutation(
        trpc.agents.remove.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
                router.push('/meet-ai/agents');
            },
            onError: () => {
                toast({
                    title: 'Error',
                    description: 'Failed to remove agent',
                    variant: 'destructive',
                });
            }
        })
    )

    const [RemoveConfirmation, confirmRemove] = useConfirm("Are you sure?",`
        The following action will remove ${data.meetingCount} associated meetings`);

    const handleRemoveAgent = async() => {
        const ok = await confirmRemove();
        if (!ok) return;
        await removeAgent.mutateAsync({id: agentId})
    }
  return (
    <>
        <RemoveConfirmation/>
        <UpdateAgentDialog 
            open={updateAgentDialogOpen}
            onOpenChange={setUpdateAgentDialogOpen}
            initialValues={data}
        />
        <div className='flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <AgentIdViewHeader agentId={agentId} agentname={data.name}
            onEdit={() => setUpdateAgentDialogOpen(true)} onRemove={handleRemoveAgent} />
            <div className='bg-background rounded-lg border'>
                <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
                    <div className='flex items-center gap-x-3'>
                        <GeneratedAvatar seed={data.name} variant="botttsNeutral" className="size-8"/>
                        <h2 className='text-2xl font-medium'>{data.name}</h2>
                        
                    </div>
                    <Badge variant={'outline'} className='flex items-center gap-x-2 [&>svg]:size-4 max-w-36 py-2'>
                        <VideoIcon className='mr-2'/>
                        {data.meetingCount} {data.meetingCount === 1 ? 'meeting' : 'meetings'}
                    </Badge>
                    <div className='flex flex-col gap-y-4'>
                        <p  className='text-lg font-medium'>Instructions</p>
                        <p className='text-neutral-400'>{data.instructions}</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AgentIdView