export const dynamic = 'force-dynamic';
export const revalidate = 60; // equivalent: export const fetchCache = 'force-no-store';

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AgentIdView from "../../_components/AgentId/AgentIdView";
import LoadingState from "../../_components/LoadingState";
import ErrorState from "../../_components/ErrorState";

interface Props {
    params: Promise<{ agentId: string }>
}



const AgendIdPage = async ({params} : Props) => {
    const {agentId} = await params;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getOne.queryOptions({id: agentId}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState title='Retrieving Agent Details' description='Please wait while we fetch the agent details.' />}>
          <ErrorBoundary fallback={<ErrorState title='Error Retrieving Agent Details' description='There was an error while retrieving the agent details.' />}>
                <AgentIdView agentId={agentId} />
            </ErrorBoundary>
        </Suspense>
    </HydrationBoundary>
  )
}

export default AgendIdPage;