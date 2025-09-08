import {  createTRPCRouter } from '../init';
import { agentsRouter } from '@/app/(home)/(clones)/meet-ai/_server/agentProcedures';
import { meetingsRouter } from '@/app/(home)/(clones)/meet-ai/_server/meetingsProcedures';
export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;