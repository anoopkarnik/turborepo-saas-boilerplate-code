import CallView from "@/app/(home)/(clones)/meet-ai/_components/Call/CallView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
    params: Promise<{ meetingId: string }>;
}

const Page = async ({ params }: Props) => {
    const { meetingId } = await params;
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }));

   return (
       <HydrationBoundary state={dehydrate(queryClient)}>
           <CallView meetingId={meetingId} />
       </HydrationBoundary>
   );
}
export default Page;