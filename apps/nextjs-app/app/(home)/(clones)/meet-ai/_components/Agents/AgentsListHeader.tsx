"use client"
import { Button } from '@repo/ui/atoms/shadcn/button'
import { PlusIcon, XCircleIcon } from 'lucide-react'
import React, { useState } from 'react'
import NewAgentDialog from './NewAgentDialog'
import { useAgentsFilters } from '../../_hooks/useAgentsFilters'
import AgentsSearchFilter from './AgentsSearchFilter'
import { DEFAULT_PAGE } from '../../_utils/constants'

const AgentsListHeader = () => {
    const [filters, setFilters] = useAgentsFilters();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const isAnyFilterModified = !!filters.search;

    const onClearFilters = () => {
        setFilters({ search: '',page: DEFAULT_PAGE });
    }

  return (
    <>
        <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <div className='flex items-center justify-between'>
                <h5 className="text-xl font-medium">My Agents</h5>
                <Button variant="default" onClick={() => setIsDialogOpen(true)}>
                    <PlusIcon className="mr-2" />
                    New Agent
                </Button>
            </div>
            <div className='flex items-center gap-x-2 p-1'>
                <AgentsSearchFilter />
                {isAnyFilterModified && (
                    <Button variant="outline" size="sm" onClick={onClearFilters}>
                        <XCircleIcon size={14} className='mr-2' />
                        Clear 
                    </Button>
                )}
            </div>
        </div>
        <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  )
}

export default AgentsListHeader