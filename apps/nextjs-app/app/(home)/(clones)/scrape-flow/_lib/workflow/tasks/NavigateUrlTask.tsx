import { TaskParamType, TaskType } from "@repo/ts-types/scrape-flow/node";
import { WorkflowTask } from "@repo/ts-types/scrape-flow/workflow";
import { LucideProps, Link2Icon} from "lucide-react";

export const NavigateUrlTask = {
    type: TaskType.NAVIGATE_URL,
    label: "Navigate URL",
    icon: (props: LucideProps) => (
        <Link2Icon className="stroke-orange-400" {...props} />
    ),
    isEntryPoint: false,
    inputs: [
        {
            name: "Web page",
            type: TaskParamType.BROWSER_INSTANCE,
            required: true,
        },
        {
            name: "URL",
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
    credits: 2
} satisfies WorkflowTask;
