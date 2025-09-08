"use client"

import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'
import { DataTable } from '../data-table';
import { columns } from './columns';
import EmptyState from '../EmptyState';
import { useRouter } from 'next/navigation';

const MeetingsView = () => {
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
    const router = useRouter();
  return (
<div className='flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4 '>
      <DataTable data={data.items} columns={columns} onRowClick={(row) => router.push(`/meet-ai/meetings/${row.id}`)} />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Create a meeting to join your discussions. Each meeting will follow your instructions and can interact with participants during the call."
        />
      )}
    </div>
  )
}

export default MeetingsView