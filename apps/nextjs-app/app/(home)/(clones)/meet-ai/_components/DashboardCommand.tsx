"use client"
import { useTRPC } from '@/trpc/client';
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from '@repo/ui/molecules/shadcn/command'
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useState } from 'react'

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const DashboardCommand = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const trpc = useTRPC();

  const meetings = useQuery(
    trpc.meetings.getMany.queryOptions({search,pageSize: 100})
  )
  const agents = useQuery(
    trpc.agents.getMany.queryOptions({search,pageSize: 100})
  )
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
        <CommandInput
          placeholder='Find a meeting or agent... '
          value={search}
          onValueChange={(value) => setSearch(value)}
        />
        <CommandList>
            <CommandGroup heading="Meetings">
                <CommandEmpty>
                    <span className='text-muted-foreground text-sm'>No meetings found.</span>
                </CommandEmpty>
                {meetings.data?.items.map(meeting => (
                    <CommandItem key={meeting.id} onSelect={()=>{
                        router.push(`/meet-ai/meetings/${meeting.id}`);
                        setOpen(false);
                    }}>
                        {meeting.name}
                    </CommandItem>
                ))}
            </CommandGroup>
            <CommandGroup heading="Agents">
                <CommandEmpty>
                    <span className='text-muted-foreground text-sm'>No agents found.</span>
                </CommandEmpty>
                {agents.data?.items.map(agent => (
                    <CommandItem key={agent.id} onSelect={()=>{
                        router.push(`/meet-ai/agents/${agent.id}`);
                        setOpen(false);
                    }}>
                        {agent.name}
                    </CommandItem>
                ))}
            </CommandGroup>
        </CommandList>
    </CommandResponsiveDialog>
  )
}

export default DashboardCommand