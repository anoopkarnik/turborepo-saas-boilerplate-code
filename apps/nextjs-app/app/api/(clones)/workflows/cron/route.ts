import db from "@repo/prisma-db/client";
import { WorkflowStatus } from "@repo/ts-types/scrape-flow/workflow";
import { getAppUrl } from "../../../../../lib/helper/appUrl";

export async function GET(){
    const now = new Date();
    const workflows = await db.workflow.findMany({
        select: {id: true},
        where:{
           status: WorkflowStatus.PUBLISHED,
           cron:{not : null},
           nextRunAt: {lte: now}
        }
    });

    for (const workflow of workflows) {
        triggerWorkflow(workflow.id);
    }
    return Response.json({workflowsToRun:workflows.length}, {status: 200});
}

async function triggerWorkflow(workflowId: string){
    const triggerApiUrl = await getAppUrl(`api/workflows/execute?workflowId=${workflowId}`);
    console.log("Triggering workflow", workflowId, "at", triggerApiUrl);

    fetch(triggerApiUrl, {
        headers: {
            Authorization: `Bearer ${process.env.API_SECRET!  }`,
        },
        cache: "no-store"
     }).catch((err) => {
        console.log("Error triggering workflow", workflowId, err);
     });
}
