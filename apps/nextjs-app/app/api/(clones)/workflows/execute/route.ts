import { timingSafeEqual } from "crypto";
import db from "@repo/prisma-db/client";
import { ExecutionPhaseStatus, WorkflowExecutionPlan, WorkflowExecutionStatus, WorkflowExecutionTrigger } from "@repo/ts-types/scrape-flow/workflow";
import { TaskRegistry } from "../../../../(home)/(clones)/scrape-flow/_lib/workflow/tasks/registry";
import { executeWorkflow } from "../../../../(home)/(clones)/scrape-flow/_lib/workflow/executeWorkflow";
import parser  from "cron-parser";

function isValidSecret(secret: string){
    const API_SECRET = process.env.API_SECRET;
    if (!API_SECRET){
        return false;
    }
    try{
        return timingSafeEqual(Buffer.from(secret), Buffer.from(API_SECRET));
    }catch{
        return false;
    }
}

export async function GET(request: Request){
    console.log("Executing workflow");
    const authHeader = request.headers.get("Authorization");

    if ( !authHeader || !authHeader.startsWith("Bearer ")){
        return Response.json({error: "Unauthorized"}, {status: 401});
    }

    const secret = authHeader.split(" ")[1];
    if (!isValidSecret(secret as string)){
        return Response.json({error: "Unauthorized"}, {status: 401});
    }

    const { searchParams} = new URL(request.url);
    const executionId = searchParams.get("executionId");
    const workflowId = searchParams.get("workflowId");

    if(executionId && executionId?.length > 0){
        await executeWorkflow(executionId);
        return Response.json({success:true});
    }

    if (!workflowId){
        return Response.json({error: "Missing workflowId"}, {status: 400});
    }

    const workflow = await db.workflow.findUnique({
        where: { id: workflowId }
    });

    if (!workflow){
        return Response.json({error: "Workflow not found"}, {status: 400});
    }

    const executionPlan = JSON.parse(workflow.executionPlan!) as WorkflowExecutionPlan;

    if (!executionPlan){
        return Response.json({error: "Workflow execution plan not found"}, {status: 400});
    }

    let nextRunAt: Date;
    try{
        const cron = parser.parseExpression(workflow.cron!, {utc: true});
        nextRunAt = cron.next().toDate();
    }catch{
        return Response.json({error: "Invalid cron expression"}, {status: 400});
    }

    const execution = await db.workflowExecution.create({
        data:{
            workflowId: workflowId,
            userId: workflow.userId,
            definition: workflow.definition,
            status: WorkflowExecutionStatus.PENDING,
            startedAt: new Date(),
            trigger: WorkflowExecutionTrigger.CRON,
            phases: {
                        create: executionPlan.flatMap(phase => {
                            return phase.nodes.flatMap(node=>{
                                return {
                                    userId: workflow.userId,
                                    status: ExecutionPhaseStatus.CREATED,
                                    number: phase.phase,
                                    node: JSON.stringify(node),
                                    name: TaskRegistry[node.data.type].label
                                }
                            })
                        })
                    }
        }
    });

    await executeWorkflow(execution.id,nextRunAt);
    return Response.json({status: "OK"}, {status: 200});
}