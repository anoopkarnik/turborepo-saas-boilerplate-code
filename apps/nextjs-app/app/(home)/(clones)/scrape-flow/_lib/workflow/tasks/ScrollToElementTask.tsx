import { TaskParamType, TaskType } from "@repo/ts-types/scrape-flow/node";
import { WorkflowTask } from "@repo/ts-types/scrape-flow/workflow";
import { LucideProps, ArrowUpIcon } from "lucide-react";

export const ScrollToElementTask = {
    type: TaskType.SCROLL_TO_ELEMENT,
    label: "Scroll To Element",
    icon: (props: LucideProps) => (
        <ArrowUpIcon className="stroke-orange-400" {...props} />
    ),
    isEntryPoint: false,
    inputs: [
        {
            name: "Web page",
            type: TaskParamType.BROWSER_INSTANCE,
            required: true,
        },
        {
            name: "Selector",
            type: TaskParamType.STRING,
            required: true,
        }
    ] as const,
    outputs: [
        {
            name: "Web page",
            type: TaskParamType.BROWSER_INSTANCE,
        }
    ] as const,
    credits: 1
} satisfies WorkflowTask;
