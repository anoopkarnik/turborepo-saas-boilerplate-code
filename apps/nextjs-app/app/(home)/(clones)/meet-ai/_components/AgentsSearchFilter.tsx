
import React from 'react'
import { useAgentsFilters } from '../_hooks/useAgentsFilters';
import { Input } from '@repo/ui/atoms/shadcn/input';
import { SearchIcon } from 'lucide-react';

const AgentsSearchFilter = () => {
    const [filters, setFilters] = useAgentsFilters();
  return (
    <div className='relative'>
        <Input
          placeholder='Search by name'
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className='h-9 bg-background w-[200px] pl-7'
        />
        <SearchIcon className='absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
    </div>
  )
}

export default AgentsSearchFilter