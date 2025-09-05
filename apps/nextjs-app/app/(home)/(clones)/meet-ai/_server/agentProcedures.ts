import { createTRPCRouter, baseProcedure } from "@/trpc/init";
import db  from "@repo/prisma-db/client"

export const agentsRouter = createTRPCRouter({
    getMany: baseProcedure.query( async () =>{
        const data = await db.agents.findMany();
        return data;
    })
})