export const dynamic = 'force-dynamic';
export const revalidate = 60; // equivalent: export const fetchCache = 'force-no-store';

import { getQueryClient, trpc } from "@/trpc/server";
import MeetingsView from "../_components/Meetings/MeetingsView";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import LoadingState from "../_components/LoadingState";
import ErrorState from "../_components/ErrorState";
import MeetingsListHeader from "../_components/Meetings/MeetingsListHeader";

const MeetAIPage = async () => {

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}))

  return (
    <>
        <MeetingsListHeader />
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<LoadingState title='Retrieving Meetings' description='Please wait while we fetch the meetings.' />}>
            <ErrorBoundary fallback={<ErrorState title='Error Retrieving Meetings' description='There was an error while retrieving the meetings.' />}>
                <MeetingsView />
            </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    </>
  )
}

export default MeetAIPage