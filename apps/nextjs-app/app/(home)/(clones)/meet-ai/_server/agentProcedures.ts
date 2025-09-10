import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import db  from "@repo/prisma-db/client"
import { agentsInsertSchema, agentsUpdateSchema } from "../_utils/zod";
import {z } from 'zod'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "../_utils/constants";
import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
    update: protectedProcedure
    .input(agentsUpdateSchema)
    .mutation(async ({input, ctx}) =>{
        const updatedAgent = await db.agents.update({
            where: {
                id: input.id,
                userId: ctx.auth.user.id
            },
            data: {
               ...input
            }
        });
        if (!updatedAgent) {
            throw new TRPCError({ code: 'NOT_FOUND', message: 'Agent not found' });
        }
        return updatedAgent;
    }),
    remove: protectedProcedure
    .input(z.object({id:z.string()}))
    .mutation(async ({input, ctx}) =>{
        await db.agents.delete({
            where: {
                id: input.id,
                userId: ctx.auth.user.id
            }
        });
        return { success: true };
    }),
    getOne: protectedProcedure
    .input(z.object({id:z.string()}))
    .query( async ({input, ctx}) =>{
        const agent = await db.agents.findFirst({
            where: {
                id: input.id,
                userId: ctx.auth.user.id
            },
            include:{
                _count: { select: { meetings: true } }
            }
        });
        if (!agent) {
            throw new TRPCError({ code: 'NOT_FOUND', message: 'Agent not found' });
        }
         return {
        ...agent,
        meetingCount: agent._count.meetings,
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
            include: {
                _count: { select: { meetings: true } }
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
                meetingCount: agent._count.meetings,
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