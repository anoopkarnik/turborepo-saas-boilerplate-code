import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

export type AgentsGetOne = inferRouterOutputs<AppRouter>['agents']['getOne'];
export type AgentsGetMany = inferRouterOutputs<AppRouter>['agents']['getMany'];

export type MeetingsGetOne = inferRouterOutputs<AppRouter>['meetings']['getOne'];
export type MeetingsGetMany = inferRouterOutputs<AppRouter>['meetings']['getMany'];

export type StreamTranscriptItem = {
    speaker_id: string;
    type: string;
    text: string;
    start_ts: number;
    end_ts: number;
}