"use client"
import {  MeetingsGetOne } from '../../_utils/types';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { meetingsInsertSchema } from '../../_utils/zod';
import {z} from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/molecules/shadcn/form';
import { Input } from '@repo/ui/atoms/shadcn/input';
import { Button } from '@repo/ui/atoms/shadcn/button';
import { useToast } from '@repo/ui/hooks/use-toast';
import { useState } from 'react';
import CommandSelect from './CommandSelect';
import NewAgentDialog from '../Agents/NewAgentDialog';

interface MeetingFormProps {
    onSuccess?: (id?: string) => void;
    onCancel?: () => void;
    initialValues?: MeetingsGetOne
}
const MeetingForm = ({onSuccess, onCancel, initialValues}: MeetingFormProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const {toast} = useToast()

    const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
    const [agentSearch, setAgentSearch] = useState('');

    const agents = useQuery(trpc.agents.getMany.queryOptions({pageSize: 100, search: agentSearch }));

    const createMeeting = useMutation(
        trpc.meetings.create.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}));
                onSuccess?.(data.id);
            },
            onError: () =>{
                toast({
                    title: 'Error creating meeting',
                    variant: 'destructive',
                })
                onCancel?.();
            }
        }),
    );

    const updateMeeting = useMutation(
        trpc.meetings.update.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}));
                if (initialValues?.id) {
                    await queryClient.invalidateQueries(
                      trpc.meetings.getOne.queryOptions({id: initialValues.id}));
                }
                onSuccess?.();
            },
            onError: () =>{
                toast({
                    title: 'Error updating meeting',
                    variant: 'destructive',
                })
                onCancel?.();
            }
        }),
    );


    const form = useForm<z.infer<typeof meetingsInsertSchema>>({
        resolver: zodResolver(meetingsInsertSchema),
        defaultValues: {
            name: initialValues?.name || '',
            agentId: initialValues?.agentId || '',
        },
    });

    const isEdit = !!initialValues?.id;
    const isPending = createMeeting.isPending || updateMeeting.isPending;

    const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
        if (isEdit) {
            updateMeeting.mutate({...values, id: initialValues.id})
        } else {
            createMeeting.mutate(values);
        }
    }

    return (
        <>
            <NewAgentDialog open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog} />
            <Form {...form}>
                <form className='space-y-4 w-full' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='e.g. Math Consultations' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    name="agentId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Agent</FormLabel>
                            <FormControl>
                                <CommandSelect
                                    options={(agents.data?.items ?? []).map(agent => ({
                                        id: agent.id,
                                        value: agent.id,
                                        children:(<div>{agent.name}</div>)
                                    })) || []}
                                    onSelect={field.onChange}
                                    onSearch={setAgentSearch}
                                    value={field.value}
                                    placeholder='Select an agent'
                                    isSearchable
                                />
                            </FormControl>
                            <FormDescription>
                                    <span >Not found what you&apos;re looking for?&nbsp;</span>
                                        <button type="button" className='text-primary hover:underline'
                                        onClick={() => setOpenNewAgentDialog(true)}>
                                            Create a new agent
                                        </button>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div>
                        {onCancel && (
                            <Button variant="ghost" disabled={isPending} type="button" onClick={onCancel}>
                                Cancel
                            </Button>
                        )}
                        <Button disabled={isPending} type="submit">
                            {isEdit ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default MeetingForm