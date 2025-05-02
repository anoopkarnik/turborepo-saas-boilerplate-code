"use server"

import { auth } from "@repo/auth/better-auth/auth";
import { headers } from "next/headers";
import db from "@repo/prisma-db/client";
import { revalidatePath } from "next/cache";
import { pollCommits } from "../lib/github";
import { indexGithubRepo } from "../lib/github-loader";

export const getProjects = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const projects = await db.githubProject.findMany({
        where: {
            userToProjects: {
                some: {
                    userId: session.user.id,
                },
            },
            deletedAt: null,
        },
    });

    return projects;
}

export const createProject = async ({githubUrl, name, githubToken}:{githubUrl:string, name: string, githubToken?: string}) =>{
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const project = await db.githubProject.create({
        data: {
            githubUrl,
            name,
            userToProjects:{
                create:{
                    userId: session.user.id
                }
            }
        }
    });
    await indexGithubRepo(project.id, githubUrl, githubToken);
    await pollCommits(project.id)
    revalidatePath('/ai-github/projects');
    return project;
}

export const getCommits = async (projectId: string) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const githubCommits = await db.githubCommit.findMany({
        where: {
            projectId,
        },
       
    });
    if (!githubCommits) {
        throw new Error("Commits not found");
    }
    return githubCommits;
}

export const saveAnswer = async ({projectId, question, answer,fileReferences}:{
    projectId: string,
    question: string,
    answer: string,
    fileReferences: any
}) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    await db.question.create({
        data: {
            projectId,
            question,
            answer,
            userId: session.user.id,
            fileReferences
        }
    })
}

export const getQuestions = async(projectId: string) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const questions = await db.question.findMany({
        where: {
            projectId,
            userId: session.user.id
        },
        include: {
            user:true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return questions
}

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
        orderBy: {
            createdAt: "desc"
        }
    })
    return meetings
}
