"use server"

import { auth } from "@repo/auth/better-auth/auth";
import db from "@repo/prisma-db/client"
import { Period } from "@repo/ts-types/scrape-flow/analytics"
import { PeriodToDateRange } from "../../../lib/helper/dates";
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from "@repo/ts-types/scrape-flow/workflow";
import { eachDayOfInterval, format } from "date-fns";
import { headers } from "next/headers";

const { COMPLETED, FAILED } = WorkflowExecutionStatus
type Stats = Record<string, {success:number, failed:number}>

export async function GetPeriods() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }

    const years = await db.workflowExecution.aggregate({
        where: {
            userId: session.user.id
        },
        _min: {startedAt: true},
    })

    const currentYear = new Date().getFullYear()
    const minYear = years._min.startedAt ? years._min.startedAt.getFullYear() : currentYear

    const periods:Period[] = []

    for (let year = minYear; year <= currentYear; year++) {
        for (let month =0; month < 12; month++) {
            periods.push({year,month})
        }
    }

    return periods
}

export async function GetStatsCardsValues(period:Period) {
    
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const dateRange = PeriodToDateRange(period)

    const execution = await db.workflowExecution.findMany({
        where: {
            userId: session.user.id,
            startedAt: {
                gte: dateRange.startDate,
                lte: dateRange.endDate
            },
            status:{
                in: [COMPLETED, FAILED]
            }
        },
        select: {
            creditsConsumed: true,
            phases:{
                where :{
                    creditsConsumed: {
                        not: null
                    }
                },
                select: {
                    creditsConsumed: true
                }
            }
        }
    })

    const stats = {
        WorkflowExecution: execution.length,
        CreditsConsumed: 0,
        PhasesExecutions:0
    }

    stats.CreditsConsumed = execution.reduce((acc, e) => acc + e.creditsConsumed, 0)

    stats.PhasesExecutions = execution.reduce((acc, e) => acc + e.phases.length, 0)

    return stats
}

export async function GetWorkflowExecutionStats(period:Period) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const dateRange = PeriodToDateRange(period)

    const executions = await db.workflowExecution.findMany({
        where: {
            userId: session.user.id,
            startedAt: {
                gte: dateRange.startDate,
                lte: dateRange.endDate
            }
        },
    })

    const dateFormat = "yyyy-MM-dd"



    const stats: Stats = eachDayOfInterval({start:dateRange.startDate, end:dateRange.endDate})
    .map(date => format(date, dateFormat))
    .reduce((acc, date) => {
        acc[date] = {success:0, failed:0};
        return acc
    }, {} as any);

    executions.forEach(e =>{
        const date = format(e.startedAt!,dateFormat)
        if(e.status === COMPLETED){
            // @ts-expect-error Object possibly undefined error
            stats[date].success+=1
        } else if(e.status === FAILED){
            // @ts-expect-error Object possibly undefined error
            stats[date].failed+=1
        }
    })

    const result = Object.entries(stats).map(([date, infos]) => ({date, ...infos}))

    return result
}

export async function GetCreditsUsageInPeriod(period:Period) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const dateRange = PeriodToDateRange(period)

    const executionPhases = await db.executionPhase.findMany({
        where: {
            userId: session.user.id,
            startedAt: {
                gte: dateRange.startDate,
                lte: dateRange.endDate
            },
            status:{
                in: [ExecutionPhaseStatus.COMPLETED, ExecutionPhaseStatus.FAILED]
            }
        },
    })

    const dateFormat = "yyyy-MM-dd"



    const stats: Stats = eachDayOfInterval({start:dateRange.startDate, end:dateRange.endDate})
    .map(date => format(date, dateFormat))
    .reduce((acc, date) => {
        acc[date] = {success:0, failed:0};
        return acc
    }, {} as any);

    executionPhases.forEach(e =>{
        const date = format(e.startedAt!,dateFormat)
        if(e.status === ExecutionPhaseStatus.COMPLETED){
            // @ts-expect-error Object possibly undefined error
            stats[date].success+=e.creditsConsumed || 0
        } else if(e.status === ExecutionPhaseStatus.FAILED){
            // @ts-expect-error Object possibly undefined error
            stats[date].failed+=e.creditsConsumed || 0
        }
    })

    const result = Object.entries(stats).map(([date, infos]) => ({date, ...infos}))

    return result
}