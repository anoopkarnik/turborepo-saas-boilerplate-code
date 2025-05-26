"use server"

import { auth } from "@repo/auth/better-auth/auth";
import db from "@repo/prisma-db/client"
import { AppNode, TaskType } from "@repo/ts-types/scrape-flow/node";
import { ExecutionPhaseStatus, WorkflowExecutionPlan, WorkflowExecutionStatus, WorkflowExecutionTrigger, WorkflowStatus } from "@repo/ts-types/scrape-flow/workflow";
import { createWorkflowSchema, createWorkflowSchemaType, duplicateWorkflowSchema, duplicateWorkflowSchemaType } from "@repo/zod/scrape-flow/workflow";
import { Edge } from "@xyflow/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FlowToExecutionPlan } from "../_lib/workflow/executionPlan";
import { TaskRegistry } from "../_lib/workflow/tasks/registry";
import { CalculateWorkflowCost } from "../_lib/workflow/helpers";
import parser  from "cron-parser";
import { CreateFlowNode } from "../_lib/workflow/tasks/CreateFlowNode";
import { getAppUrl } from "../../../../../lib/helper/appUrl";
import { headers } from "next/headers";

const initialFlow: { nodes: AppNode[]; edges: Edge[]} ={
    nodes: [],
    edges: []
}

initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER))

export async function GetWorflowsForUser(){
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    return db.workflow.findMany({
        where: {
            userId: session.user.id
        },
        orderBy: {
            createdAt: "asc"
        }
    });
}

export async function CreateWorkflow(form: createWorkflowSchemaType){
    const {success,data} = createWorkflowSchema.safeParse(form);
    if(!success){
        throw new Error("Invalid form data");
    }
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const result = await db.workflow.create({
        data:{
            userId: session.user.id,
            status: WorkflowStatus.DRAFT,
            definition: JSON.stringify(initialFlow),
            ...data
        }
    })
    if(!result){
        throw new Error("Failed to create workflow");
    }
    redirect(`/scrape-flow/workflow/editor/${result.id}`);
}

export async function DeleteWorkflow(id:string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    await db.workflow.delete({
        where: {
            id,
            userId: session.user.id
        }
    })
    revalidatePath("/scrape-flow/workflows");
}

export async function UpdateWorkflow({id,definition}:{id:string,definition:string}){
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const workflow = await db.workflow.findUnique({
        where: {
            id,
            userId: session.user.id
        }
    })
    if(!workflow){
        throw new Error("Workflow not found");
    }
    if (workflow.status !== WorkflowStatus.DRAFT) {
        throw new Error("Workflow is not in draft state");
    }
    await db.workflow.update({
        data: {
            definition
        },
        where: {
            id,
            userId: session.user.id
        }
    })
    revalidatePath("/scrape-flow/workflows")
}

export async function RunWorkflow(form: {workflowId:string, flowDefinition?:string}){
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const {workflowId,flowDefinition} = form;
    if (!workflowId){
        throw new Error("Invalid workflow id");
    }
    const workflow = await db.workflow.findUnique({
        where: {
            id: workflowId,
            userId: session.user.id
        }
    })

    if(!workflow){
        throw new Error("Workflow not found");
    }
    let executionPlan: WorkflowExecutionPlan;
    let workflowDefinition = flowDefinition
    if (workflow.status === WorkflowStatus.PUBLISHED){
        if(!workflow.executionPlan){
            throw new Error("Execution plan not found");
        }
        executionPlan = JSON.parse(workflow.executionPlan);
        workflowDefinition = workflow.definition;
    }else{
        if(!flowDefinition){
            throw new Error("Flow definition not provided");
        }
        const flow = JSON.parse(flowDefinition);
        const result = FlowToExecutionPlan(flow.nodes, flow.edges);
        if(result.error){
            throw new Error("Invalid flow definition");
        }
        if(!result.executionPlan){
            throw new Error("Failed to generate execution plan");
        }
        executionPlan = result.executionPlan;
    }
    console.log("Execution plan",executionPlan);
    
    const execution = await db.workflowExecution.create({
        data:{
            workflowId,
            userId: session.user.id,
            status: WorkflowExecutionStatus.PENDING,
            startedAt: new Date(),
            trigger: WorkflowExecutionTrigger.MANUAL,
            definition: workflowDefinition,
            phases: {
                create: executionPlan.flatMap(phase => {
                    return phase.nodes.flatMap(node=>{
                        return {
                            userId: session.user.id,
                            status: ExecutionPhaseStatus.CREATED,
                            number: phase.phase,
                            node: JSON.stringify(node),
                            name: TaskRegistry[node.data.type].label
                        }
                    })
                })
            }
        },
        select:{
            id:true,
            phases: true
        }
    });
    if (!execution){
        throw new Error("Failed to create execution");
    }
    // executeWorkflow(execution.id); //run this on background
    const triggerApiUrl = await getAppUrl(`api/workflows/execute?executionId=${execution.id}`);
    fetch(triggerApiUrl, {
        headers: {
            Authorization: `Bearer ${process.env.API_SECRET!  }`,
        },
        cache: "no-store"
    }).catch((err) => {
        console.log("Error triggering workflow", workflowId, err);
    });
    redirect(`/scrape-flow/workflow/runs/${workflowId}/${execution.id}`);
}

export async function GetWorkflowExecutionWithPhases(executionId: string){
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const execution = await db.workflowExecution.findUnique({
        where: {
            id: executionId,
            userId: session.user.id
        },
        include: {
            phases: {
                orderBy: {
                    number: 'asc',
                }
            }
        }
    })
    return execution;
}

export async function GetWorkflowPhaseDetails(phaseId: string){
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const phase = await db.executionPhase.findUnique({
        where: {
            id: phaseId,
            userId: session.user.id
        },
        include:{
            logs:{
                orderBy:{
                    timestamp: 'asc'
                }
            }
        }
    })
    return phase;
}

export async function GetWorkflowExecutions(workflowId: string){
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const executions = await db.workflowExecution.findMany({
        where: {
            workflowId,
            userId: session.user.id
        },
        orderBy:{
            createdAt: 'desc'
        }
    })
    return executions;
}

export async function PublishWorkflow({id,flowDefinition}:{id:string,flowDefinition:string}){
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const workflow = await db.workflow.findUnique({
        where: {
            id,
            userId: session.user.id
        }
    })
    if(!workflow){
        throw new Error("Workflow not found");
    }
    if (workflow.status !== WorkflowStatus.DRAFT) {
        throw new Error("Workflow is not in draft state");
    }

    const flow = JSON.parse(flowDefinition);

    const result = FlowToExecutionPlan(flow.nodes, flow.edges);

    if(result.error){
        throw new Error("Invalid flow definition");
    }

    if(!result.executionPlan){
        throw new Error("Failed to generate execution plan");
    }

    const creditsCost = CalculateWorkflowCost(flow.nodes);
    await db.workflow.update({
        where: {
            id,
            userId: session.user.id
        },
        data: {
            status: WorkflowStatus.PUBLISHED,
            definition: flowDefinition,
            executionPlan: JSON.stringify(result.executionPlan),
            creditsCost
        },
    })
    revalidatePath(`/scrape-flow/workflow/editor/${id}`);
}


export async function UnpublishWorkflow({id}:{id:string}){
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const workflow = await db.workflow.findUnique({
        where: {
            id,
            userId: session.user.id
        }
    })
    if(!workflow){
        throw new Error("Workflow not found");
    }
    if (workflow.status !== WorkflowStatus.PUBLISHED) {
        throw new Error("Workflow is not in published state");
    }

    await db.workflow.update({
        where: {
            id,
            userId: session.user.id
        },
        data: {
            status: WorkflowStatus.DRAFT,
            executionPlan: null,
            creditsCost: 0
        },
    })
    revalidatePath(`/scrape-flow/workflow/editor/${id}`);
}

export async function UpdateWorkflowCron({id,cron}:{id:string,cron:string}){
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }

    try{
        const interval = parser.parseExpression(cron,{utc:true});
        await db.workflow.update({
            where: {
                id,
                userId: session.user.id
            },
            data: {
                cron,
                nextRunAt: interval.next().toDate()
            },
        })
        
    }catch(error){
        console.log("Invalid cron expression",error);
        throw new Error("Invalid cron expression");
    }
    revalidatePath(`/scrape-flow/workflows`);
}

export async function RemoveWorkflowSchedule(id:string){
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    await db.workflow.update({
        where: {
            id,
            userId: session.user.id
        },
        data: {
            cron: null,
            nextRunAt: null
        },
    })
    revalidatePath(`/scrape-flow/workflows`);
}

export async function DuplicateWorkflow(form: duplicateWorkflowSchemaType){
    const {success, data} = duplicateWorkflowSchema.safeParse(form);
    if(!success){
        throw new Error("Invalid form data");
    }
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const sourceWorkflow = await db.workflow.findUnique({
        where: {
            id: data.workflowId,
            userId: session.user.id
        }
    })

    if(!sourceWorkflow){
        throw new Error("Workflow not found");
    }

    const result = await db.workflow.create({
        data:{
            userId: session.user.id,
            status: WorkflowStatus.DRAFT,
            definition: sourceWorkflow.definition,
            name: data.name,
            description: data.description
        }
    })

    if(!result){
        throw new Error("Failed to duplicate workflow");
    }

    revalidatePath(`/scrape-flow/workflows`);
}