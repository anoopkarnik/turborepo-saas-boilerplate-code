export const dynamic = 'force-dynamic';
export const revalidate = 60; // equivalent: export const fetchCache = 'force-no-store';

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import LoadingState from "../../_components/LoadingState";
import ErrorState from "../../_components/ErrorState";
import MeetingIdView from "../../_components/MeetingId/MeetingIdView";

interface Props {
    params: Promise<{ meetingId: string }>
}



const MeetingIdPage = async ({params} : Props) => {
    const {meetingId} = await params;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.meetings.getOne.queryOptions({id: meetingId}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState title='Retrieving Meeting Details' description='Please wait while we fetch the meeting details.' />}>
          <ErrorBoundary fallback={<ErrorState title='Error Retrieving Meeting Details' description='There was an error while retrieving the meeting details.' />}>
                <MeetingIdView meetingId={meetingId} />
            </ErrorBoundary>
        </Suspense>
    </HydrationBoundary>
  )
}

export default MeetingIdPage;