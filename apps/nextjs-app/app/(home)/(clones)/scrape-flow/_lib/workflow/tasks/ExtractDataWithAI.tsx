import { TaskParamType, TaskType } from "@repo/ts-types/scrape-flow/node";
import { WorkflowTask } from "@repo/ts-types/scrape-flow/workflow";
import { LucideProps, BrainIcon } from "lucide-react";

export const ExtractDataWithAITask = {
    type: TaskType.EXTRACT_DATA_WITH_AI,
    label: "Extract Data With AI",
    icon: (props: LucideProps) => (
        <BrainIcon className="stroke-rose-400" {...props} />
    ),
    isEntryPoint: false,
    inputs: [
        {
            name: "Content",
            type: TaskParamType.STRING,
            required: true,
        },
        {
            name: "API Keys",
            type: TaskParamType.APIKEYS,
            required: true,
        },
        {
            name: "Prompt",
            type: TaskParamType.STRING,
            required: true,
            variant: "textarea",
        },
    ] as const,
    outputs: [
        {
            name: "Extracted data",
            type: TaskParamType.STRING,
        }
    ] as const,
    credits: 4
} satisfies WorkflowTask;
