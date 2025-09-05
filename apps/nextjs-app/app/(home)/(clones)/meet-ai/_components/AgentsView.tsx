"use client"

import React from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'

const AgentsView = () => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions())

  return (
    <pre>
        {JSON.stringify(data, null, 2)}
    </pre>
  )
}


export default AgentsView