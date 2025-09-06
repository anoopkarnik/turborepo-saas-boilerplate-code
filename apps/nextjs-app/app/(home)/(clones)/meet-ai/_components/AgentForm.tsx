import { AgentsGetOne } from '../_utils/types';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { agentsInsertSchema } from '../_utils/zod';
import {z} from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/molecules/shadcn/form';
import { Input } from '@repo/ui/atoms/shadcn/input';
import { Textarea } from '@repo/ui/atoms/shadcn/textarea';
import { Button } from '@repo/ui/atoms/shadcn/button';
import { useToast } from '@repo/ui/hooks/use-toast';

interface AgentFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    initialValues?: AgentsGetOne
}
const AgentForm = ({onSuccess, onCancel, initialValues}: AgentFormProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const {toast} = useToast()

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({}));
                if (initialValues?.id) {
                    await queryClient.invalidateQueries(
                      trpc.agents.getOne.queryOptions({id: initialValues.id}));
                }
                onSuccess?.();
            },
            onError: () =>{
                toast({
                    title: 'Error creating agent',
                    variant: 'destructive',
                })
                onCancel?.();
            }
        }),
    );

    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema),
        defaultValues: {
            name: initialValues?.name || '',
            instructions: initialValues?.instructions || '',
        },
    });

    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending;

    const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
        if (isEdit) {
            console.log("Edit agent not implemented yet");
        } else {
            createAgent.mutate(values);
        }
    }

    return (
        <Form {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                   name="name"
                   control={form.control}
                   render={({ field }) => (
                       <FormItem>
                           <FormLabel>Name</FormLabel>
                           <FormControl>
                               <Input {...field} placeholder='e.g. Math Tutor' />
                           </FormControl>
                           <FormMessage />
                       </FormItem>
                   )}
                />
                <FormField
                   name="instructions"
                   control={form.control}
                   render={({ field }) => (
                       <FormItem>
                           <FormLabel>Instructions</FormLabel>
                           <FormControl>
                               <Textarea {...field} 
                               placeholder='You are a helpful math assistant that can answer questions and help with assignments' />
                           </FormControl>
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
    )
}

export default AgentForm