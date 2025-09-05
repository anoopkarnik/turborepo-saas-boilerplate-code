import { getQueryClient, trpc } from "@/trpc/server"
import AgentsView from "../_components/AgentsView"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import LoadingState from "../_components/LoadingState";
import { ErrorBoundary } from "react-error-boundary";
import ErrorState from "../_components/ErrorState";

const AgentPage = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingState title='Retrieving Agents' description='Please wait while we fetch the agents.' />}>
        <ErrorBoundary fallback={<ErrorState title='Error Retrieving Agents' description='There was an error while retrieving the agents.' />}>
          <AgentsView  />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default AgentPage