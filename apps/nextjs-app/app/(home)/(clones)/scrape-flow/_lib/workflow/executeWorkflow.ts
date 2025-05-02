import "server-only";

import db from "@repo/prisma-db/client";
import { revalidatePath } from "next/cache";
import { ExecutionEnvironment, WorkflowExecutionStatus } from "@repo/ts-types/scrape-flow/workflow";
import {ExecutionPhase} from '@prisma/prisma/client'
import { AppNode, TaskParamType} from "@repo/ts-types/scrape-flow/node";
import { TaskRegistry } from "./tasks/registry";
import { ExecutorRegistry } from "./executor/registry";
import { Environment } from "@repo/ts-types/scrape-flow/workflow";
import { Browser, Page } from "puppeteer";
import { Edge } from "@xyflow/react";
import { LogCollector } from "@repo/ts-types/scrape-flow/log";
import { createLogCollector } from "../../../../../../lib/helper/log";
import { decrementCredits } from "../../../../../../../../packages/payments/src/billing";



export async function executeWorkflow(executionId: string, nextRunAt?: Date) {
    const execution = await db.workflowExecution.findUnique({
        where: {
            id: executionId
        },
        select: {
            id: true,
            workflowId: true,
            definition: true,

            phases: true
        }
    })
    if (!execution) {
        throw new Error("Execution not found");
    }

    const edges = JSON.parse(execution.definition).edges as Edge[]

    // Setup execution environment
    const environment = {phases:{}}

    // Initialize workflow Execution
    await initializeWorkflowExecution(executionId, execution.workflowId, nextRunAt)

    //initialize phase status
    await initializePhaseStatuses(execution)
    

    let creditsConsumed = 0;
    let executionFailed = false;
    for (const phase of execution.phases) {
        
       const phaseExecution = await executeWorkflowPhase(phase, environment,edges)
       if(!phaseExecution.success){
            executionFailed = true;
            break;
       }
       creditsConsumed += phaseExecution.creditsConsumed;
    }

    // Finalize Execution
    await finalizeWorkflowExecution(executionId, execution.workflowId, executionFailed, creditsConsumed)

    // Cleanup Environment
    await cleanupEnvironment(environment)

    revalidatePath("/workflow/runs")
}

async function initializeWorkflowExecution(executionId: string, workflowId: string, nextRunAt?: Date) {
    await db.workflowExecution.update({
        where: {
            id: executionId
        },
        data: {
            startedAt: new Date(),
            status: WorkflowExecutionStatus.RUNNING
        }
    })
    await db.workflow.update({
        where: {
            id: workflowId
        },
        data: {
            lastRunAt: new Date(),
            lastRunStatus: WorkflowExecutionStatus.RUNNING,
            lastRunId: executionId,
            ...(nextRunAt && { nextRunAt })
        }
    })
}

async function initializePhaseStatuses(execution: any) {
    await db.executionPhase.updateMany({
        where: {
            id: {
                in: execution.phases.map((phase: any) => phase.id)
            }
        },
        data: {
            status: WorkflowExecutionStatus.PENDING
        }
    })
}

async function finalizeWorkflowExecution(executionId: string, workflowId: string, executionFailed: boolean,
     creditsConsumed: number) {
    const finalStatus = executionFailed ? WorkflowExecutionStatus.FAILED : WorkflowExecutionStatus.COMPLETED;
    await db.workflowExecution.update({
        where: {
            id: executionId
        },
        data: {
            status: finalStatus,
            completedAt: new Date(),
            creditsConsumed
        }
    })

    await db.workflow
    .update({
        where: {
            id: workflowId,
            lastRunId: executionId
        },
        data: {
            lastRunStatus: finalStatus
        }
    })
    .catch((e) => {
        console.log("Failed to update workflow status", e)
    })
}

async function executeWorkflowPhase(phase: ExecutionPhase, environment: Environment,edges: Edge[]) {
    const logCollector = createLogCollector();
    const startedAt = new Date();
    const node = JSON.parse(phase.node) as AppNode;

    setupEnvironmentForPhase(node, environment,edges)

    // Update phase status
    await db.executionPhase.update({
        where: {
            id: phase.id
        },
        data: {
            status: WorkflowExecutionStatus.RUNNING,
            startedAt,
            // @ts-expect-error Object possibly undefined error
            inputs: JSON.stringify(environment.phases[node.id].inputs)
        }
    })

    const creditsRequired = TaskRegistry[node.data.type].credits;
    console.log(`Executing phase ${phase.name} with ${creditsRequired} credits`)

    // removing user balance
    let success = await decrementCredits(phase.userId,creditsRequired, logCollector);
    const creditsConsumed = success ? creditsRequired : 0;
    if(success){
        success = await executePhase(phase,node,environment,logCollector)
    }
    // Execute phase simulation
    
    
    // @ts-expect-error Object possibly undefined error
    const outputs = environment.phases[node.id].outputs;
    await finalizePhase(phase.id, success,outputs,logCollector,creditsConsumed)
    return {success,creditsConsumed}
}

async function finalizePhase(phaseId: string, success: boolean, outputs:any, logCollector:LogCollector,
    creditsConsumed: number
) {
    const status = success ? WorkflowExecutionStatus.COMPLETED : WorkflowExecutionStatus.FAILED;
    await db.executionPhase.update({
        where: {
            id: phaseId
        },
        data: {
            status,
            completedAt: new Date(),
            outputs: JSON.stringify(outputs),
            creditsConsumed,
            logs:{
                createMany:{
                    data:logCollector.getAll().map(log=>({
                        message: log.message,
                        logLevel: log.level,
                        timestamp: log.timestamp
                    }))
                }
            }
        }
    })
}

async function executePhase(phase:ExecutionPhase, node:AppNode, environment:Environment,logCollector:LogCollector):Promise<boolean>{
    const runFn = ExecutorRegistry[node.data.type];
    if(!runFn){
        logCollector.error(`Executor not found for task type`)
        return false
    }
    const executionEnvironment:ExecutionEnvironment<any> = createExecutionEnvironment(node, environment,logCollector)
    return await runFn(executionEnvironment);
}

function setupEnvironmentForPhase(node: AppNode, environment: Environment, edges: Edge[]) {
    environment.phases[node.id] = { inputs: {}, outputs: {} };

    const inputs = TaskRegistry[node.data.type].inputs;
    for (const input of inputs) {
        if(input.type === TaskParamType.BROWSER_INSTANCE)continue;
        const inputValue = node.data.inputs[input.name];
        if (inputValue) {
            // @ts-expect-error Object possibly undefined error
            environment.phases[node.id].inputs[input.name] = inputValue;
            continue;
        }

        const connectedEdge = edges.find(edge => edge.target === node.id && edge.targetHandle === input.name);
        if(!connectedEdge){
            console.log("No connected edge found for input", input.name,"node id", node.id)
            continue;
        }
        console.log("Connected edge found for input", connectedEdge)
        const outputValue = environment.phases[connectedEdge.source]?.outputs[connectedEdge.sourceHandle!];
        // @ts-expect-error Object possibly undefined error
        environment.phases[node.id].inputs[input.name] = outputValue;
        console.log("Connected edge found for input", input.name, "node id", node.id)
        console.log("Output value", outputValue)

    }
}

function createExecutionEnvironment(node: AppNode, environment: Environment, logCollector:LogCollector):ExecutionEnvironment<any> {
    return {
        getInput: (name: string) => environment.phases[node.id]?.inputs[name],
        // @ts-expect-error Object possibly undefined error
        setOutput: (name: string, value: string) => (environment.phases[node.id].outputs[name] = value),

        getBrowser: () => environment.browser,
        setBrowser: (browser:Browser) => (environment.browser = browser),

        getPage: () => environment.page,
        setPage: (page:Page) => (environment.page = page),

        log: logCollector
    }
}

async function cleanupEnvironment(environment: Environment) {
    if (environment.browser) {
        await environment.browser.close().catch((e) => {console.log("Failed to close browser", e)});
    }
}

