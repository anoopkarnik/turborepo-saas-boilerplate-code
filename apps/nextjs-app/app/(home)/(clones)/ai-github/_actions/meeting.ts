"use server"

import { auth } from "@repo/auth/better-auth/auth";
import { headers } from "next/headers";
import db from "@repo/prisma-db/client";
import { revalidatePath } from "next/cache";

export const uploadMeeting = async ({projectId,meetingUrl,name}:{
    projectId: string, meetingUrl: string, name: string}) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const meeting = await db.meeting.create({
        data: {
            projectId,
            meetingUrl,
            name,
            status: "PROCESSING"
        }
    })
    return meeting
}

export const getMeetings = async (projectId: string) => {
    const meetings = await db.meeting.findMany({
        where: {
            projectId,
        },
        include: {
            issues: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    revalidatePath('/ai-github/meetings');
    return meetings
}

export const deleteMeeting = async (meetingId: string) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const meeting = await db.meeting.delete({
        where: {
            id: meetingId,
        }
    })
    revalidatePath('/ai-github/meetings');
    return meeting
}

export const getMeetingById = async (meetingId: string) => {
    const meeting = await db.meeting.findUnique({
        where: {
            id: meetingId,
        },
        include: {
            issues: true,
        }
    })
    revalidatePath(`/ai-github/meetings/${meetingId}`);
    return meeting
}
