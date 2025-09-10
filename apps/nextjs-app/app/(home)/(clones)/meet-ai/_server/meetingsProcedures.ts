import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import db  from "@repo/prisma-db/client"
import {z } from 'zod'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "../_utils/constants";
import { TRPCError } from "@trpc/server";
import { meetingsInsertSchema, meetingsUpdateSchema } from "../_utils/zod";
import {AgentMeetingStatus} from '@prisma/client'
import { streamVideo } from "../_utils/stream-video";
import { generateAvatarUri } from "../_utils/avatar";
import JSONL from "jsonl-parse-stringify";
import { StreamTranscriptItem } from "../_utils/types";
import { streamChat } from "../_utils/stream-chat";

export const meetingsRouter = createTRPCRouter({
    generateChatToken: protectedProcedure
        .mutation(async ({ctx}) =>{
            const token = streamChat.createToken(ctx.auth.user.id);
            await streamChat.upsertUser({
                id: ctx.auth.user.id,
                role: "admin"
            });
            return token;
        }),
    getTranscript: protectedProcedure
        .input(z.object({id: z.string()}))
        .query(async ({input, ctx}) =>{
            const existingMeeting = await db.meetings.findFirst({
                where: {
                    id: input.id,
                    userId: ctx.auth.user.id
                }
            });
            if (!existingMeeting) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Meeting not found' });
            }
            if (!existingMeeting.transcriptUrl){
                return [];
            }
            const transcript = await fetch(existingMeeting.transcriptUrl)
                .then(res => res.text())
                .then((text) => JSONL.parse<StreamTranscriptItem>(text))
                .catch(() => {
                    return []
                });
        
            const speakersIds = [
                ...new Set(transcript.map(item => item.speaker_id))
            ]
            const userSpeakers = await db.user.findMany({
                where: { id: { in: speakersIds } },
            }).then((users) => users.map(user => ({ 
                ...user, image: user.image ?? generateAvatarUri({seed: user.name, variant: "initials" }) })));

            const agentSpeakers = await db.agents.findMany({
                where: { id: { in: speakersIds } },
            }).then((agents) => agents.map(agent => ({ 
                ...agent, image: generateAvatarUri({seed: agent.name, variant: "botttsNeutral" }) })));

            const speakers = [...userSpeakers, ...agentSpeakers];

            const transcriptWithSpeakers = transcript.map(item => {
                const speaker = speakers.find(s => s.id === item.speaker_id);
                if (!speaker) {
                    return {
                        ...item,
                        user: {
                            name: "Unknown",
                            image: generateAvatarUri({seed: "Unknown", variant: "initials" })
                        }
                    }
                }
                return {
                    ...item,
                    user: {
                        name: speaker.name,
                        image: speaker.image
                    }
                }
            })

            return transcriptWithSpeakers;
        }),
    generateToken: protectedProcedure
        .mutation(async ({ctx}) =>{
            await streamVideo.upsertUsers([
                {
                    id: ctx.auth.user.id,
                    name: ctx.auth.user.name || 'User',
                    role: "admin",
                    image: ctx.auth.user.image ?? generateAvatarUri({seed: ctx.auth.user.name, variant: "initials" })
                }
            ]);

            const expirationTime = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hour from now
            const issueAt = Math.floor(Date.now() / 1000) - 60;
            const token = streamVideo.generateUserToken({
                exp: expirationTime,
                validity_in_seconds: issueAt,
                user_id: ctx.auth.user.id
            })
            return token;
        }),
    remove: protectedProcedure
        .input(z.object({id:z.string()}))
        .mutation(async ({input, ctx}) =>{
            await db.meetings.delete({
                where: {
                    id: input.id,
                    userId: ctx.auth.user.id
                }
            });
            return { success: true };
        }),
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
        const call = streamVideo.video.call("default",createdMeeting.id);
        await call.create({
            data: {
                created_by_id: ctx.auth.user.id,
                custom: {
                    meetingId: createdMeeting.id,
                    meetingName: createdMeeting.name
                },
                settings_override: {
                    transcription: {
                        language: "en",
                        mode: "auto-on",
                        closed_caption_mode: "auto-on"
                    },
                    recording: {
                        mode: "auto-on",
                        quality: "1080p"
                    }
                }
            }
        })
        const existingAgent = await db.agents.findFirst({
            where: {
                id: input.agentId,
                userId: ctx.auth.user.id
            }
        });
        if (!existingAgent) {
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'Agent not found' });
        }
        await streamVideo.upsertUsers([
            {
                id: existingAgent.id,
                name: existingAgent.name,
                role: "user",
                image: generateAvatarUri({seed: existingAgent.name, variant: "botttsNeutral" })
            }
        ]);

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
        search: z.string().nullish(),
        agentId: z.string().nullish(),
        status: z.enum([AgentMeetingStatus.CANCELLED, AgentMeetingStatus.COMPLETED, AgentMeetingStatus.ONGOING,
             AgentMeetingStatus.PROCESSING,AgentMeetingStatus.UPCOMING]).nullish(),
    }))
    .query( async ({ ctx, input}) =>{
        const { search, page, pageSize, status, agentId } = input;
        const meetings = await db.meetings.findMany({
            where: {
                userId: ctx.auth.user.id,
                name: search ? { contains: search, mode: 'insensitive' } : undefined,
                agentId: agentId ? { equals: agentId } : undefined,
                status: status ? { equals: status } : undefined,
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
                agentId: agentId ? { equals: agentId } : undefined,
                status: status ? { equals: status } : undefined,
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