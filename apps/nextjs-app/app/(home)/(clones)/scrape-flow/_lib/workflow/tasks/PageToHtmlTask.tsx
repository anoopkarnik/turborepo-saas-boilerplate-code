import { TaskParamType, TaskType } from "@repo/ts-types/scrape-flow/node";
import { WorkflowTask } from "@repo/ts-types/scrape-flow/workflow";
import { CodeIcon, LucideProps } from "lucide-react";

export const PageToHtmlTask = {
    type: TaskType.PAGE_TO_HTML,
    label: "Get Html from Page",
    icon: (props: LucideProps) => (
        <CodeIcon className="stroke-rose-400" {...props} />
    ),
    isEntryPoint: false,
    inputs: [
        {
            name: "Web page",
            type: TaskParamType.BROWSER_INSTANCE,
            required: true,
            hideHandle: false
        }
    ] as const,
    outputs: [
        {
            name: "Html",
            type: TaskParamType.STRING,
        },
        {
            name: "Web Page",
            type: TaskParamType.BROWSER_INSTANCE,
        }
    ] as const,
    credits: 2
} satisfies WorkflowTask;

