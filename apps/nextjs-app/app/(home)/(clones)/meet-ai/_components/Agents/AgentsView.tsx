"use client"

import React from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'
import { DataTable } from '../data-table'
import { columns } from './columns'
import EmptyState from '../EmptyState'
import { useAgentsFilters } from '../../_hooks/useAgentsFilters'
import DataPagination from '../DataPagination'
import { useRouter } from 'next/navigation'



const AgentsView = () => {
  const [filters, setFilters] = useAgentsFilters()
  const trpc = useTRPC()
  const router = useRouter()
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
    ...filters
  }))

  return (
    <div className='flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4 '>
      <DataTable data={data.items} columns={columns} onRowClick={(row) => router.push(`/meet-ai/agents/${row.id}`)} />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({page})}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
        />
      )}
    </div>
  )
}


export default AgentsView