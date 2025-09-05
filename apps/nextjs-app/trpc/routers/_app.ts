import { z } from 'zod';
import {  createTRPCRouter } from '../init';
import { agentsRouter } from '@/app/(home)/(clones)/meet-ai/_server/agentProcedures';
export const appRouter = createTRPCRouter({
  agents: agentsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;