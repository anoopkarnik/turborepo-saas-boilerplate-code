import { TaskParamType, TaskType } from "@repo/ts-types/scrape-flow/node";
import { WorkflowTask } from "@repo/ts-types/scrape-flow/workflow";
import { LucideProps, SendIcon } from "lucide-react";

export const DeliverViaWebhookTask = {
    type: TaskType.DELIVER_VIA_WEBHOOK,
    label: "Deliver Via Webhook",
    icon: (props: LucideProps) => (
        <SendIcon className="stroke-blue-400" {...props} />
    ),
    isEntryPoint: false,
    inputs: [
        {
            name: "Target URL",
            type: TaskParamType.STRING,
            required: true,
        },
        {
            name: "Body",
            type: TaskParamType.STRING,
            required: true,
        }
    ] as const,
    outputs: [
    ] as const,
    credits: 1
} satisfies WorkflowTask;
