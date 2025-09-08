import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import db  from "@repo/prisma-db/client"
import {z } from 'zod'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "../_utils/constants";
import { TRPCError } from "@trpc/server";
import { meetingsInsertSchema, meetingsUpdateSchema } from "../_utils/zod";

export const meetingsRouter = createTRPCRouter({
    update: protectedProcedure
        .input(meetingsUpdateSchema)
        .mutation(async ({input, ctx}) =>{
            const updatedMeeting = await db.meetings.update({
                where: {
                    id: input.id,
                    userId: ctx.auth.user.id
                },
                data: {
                   ...input
                }
            });
            if (!updatedMeeting) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Meeting not found' });
            }
            return updatedMeeting;
        }),
    create: protectedProcedure
    .input(meetingsInsertSchema)
    .mutation(async ({input,ctx}) =>{
        const createdMeeting = await db.meetings.create({
            data: {
                ...input,
                userId: ctx.auth.user.id
            }
        });

        return createdMeeting;
    }),
    getOne: protectedProcedure
    .input(z.object({id:z.string()}))
    .query( async ({input, ctx}) =>{
        const meeting = await db.meetings.findFirst({
            where: {
                id: input.id,
                userId: ctx.auth.user.id
            },
            include:{
                agent: true
            }
        });
        if (!meeting) {
            throw new TRPCError({ code: 'NOT_FOUND', message: 'Meeting not found' });
        }
        return meeting;
    }),
    getMany: protectedProcedure
    .input(z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish()
    }))
    .query( async ({ ctx, input}) =>{
        const { search, page, pageSize } = input;
        const meetings = await db.meetings.findMany({
            where: {
                userId: ctx.auth.user.id,
                name: search ? { contains: search, mode: 'insensitive' } : undefined,
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: pageSize,
            skip: (page - 1) * pageSize,
            include:{
                agent: true,
            }
        });
        const meetingsWithDuration = meetings.map(meeting => ({
            ...meeting,
            duration: meeting.endedAt && meeting.startedAt ? Math.floor((meeting.endedAt.getTime() - meeting.startedAt.getTime()) / 1000) : 0,
        }));
        const total = await db.meetings.count({
            where: {
                userId: ctx.auth.user.id,
                name: search ? { contains: search, mode: 'insensitive' } : undefined,
            }
        });
        const totalPages = Math.ceil(total / pageSize);
        return {
            items: meetingsWithDuration ,
            total: total,
            totalPages
        };
    }),
})