import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import db  from "@repo/prisma-db/client"
import { agentsInsertSchema } from "../_utils/zod";
import {z } from 'zod'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "../_utils/constants";

export const agentsRouter = createTRPCRouter({
    getOne: protectedProcedure
    .input(z.object({id:z.string()}))
    .query( async ({input}) =>{
        const agent = await db.agents.findFirst({
            where: {
                id: input.id
            }
        });
         return {
        ...agent,
        meetingCount: 5, // static for now, replace with dynamic logic later
        };
    }),
    getMany: protectedProcedure
    .input(z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish()
    }))
    .query( async ({ ctx, input}) =>{
        const { search, page, pageSize } = input;
        const agents = await db.agents.findMany({
            where: {
                userId: ctx.auth.user.id,
                name: search ? { contains: search, mode: 'insensitive' } : undefined,
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: pageSize,
            skip: (page - 1) * pageSize
        });
        const total = await db.agents.count({
            where: {
                userId: ctx.auth.user.id,
                name: search ? { contains: search, mode: 'insensitive' } : undefined,
            }
        });
        const totalPages = Math.ceil(total / pageSize);
        return {
            items: agents.map(agent => ({
                ...agent,
                meetingCount: 5, // or some dynamic count logic
            })),
            total: total,
            totalPages
        };
    }),
    create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({input,ctx}) =>{
        const createdAgent = await db.agents.create({
            data: {
                ...input,
                userId: ctx.auth.user.id
            }
        });

        return createdAgent;
    })
})