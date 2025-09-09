"use client"
import React, { useState } from 'react'
import { useMeetingsFilters } from '../../_hooks/useMeetingsFilters';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import CommandSelect from './CommandSelect';

const AgentIdFilter = () => {
    const [filters, setFilters] = useMeetingsFilters();
    const trpc = useTRPC();

    const [agentSearch, setAgentSearch] = useState("");
    const {data} = useQuery(trpc.agents.getMany.queryOptions({
        search: agentSearch,pageSize: 100
    }))

  return (
     <CommandSelect placeholder="Agent" className="h-9 max-w-xs" 
     options={(data?.items ?? []).map(agent => ({
        id: agent.id, value: agent.id, children: (
        <div className='flex items-center gap-x-2'>{agent.name}</div>
        )}
     )) } 
        onSelect={value => setFilters({agentId: value})}
        onSearch={setAgentSearch} 
        value={filters.agentId ?? ""}
        />
  )
}

export default AgentIdFilter