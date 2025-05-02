import { TaskParamType, TaskType } from "@repo/ts-types/scrape-flow/node";
import { WorkflowTask } from "@repo/ts-types/scrape-flow/workflow";
import { LucideProps, DatabaseIcon } from "lucide-react";

export const AddPropertyToJsonTask = {
    type: TaskType.ADD_PROPERTY_TO_JSON,
    label: "Add Property From JSON",
    icon: (props: LucideProps) => (
        <DatabaseIcon className="stroke-orange-400" {...props} />
    ),
    isEntryPoint: false,
    inputs: [
        {
            name: "JSON",
            type: TaskParamType.STRING,
            required: true,
        },
        {
            name: "Property name",
            type: TaskParamType.STRING,
            required: true,
        },
        {
            name: "Property value",
            type: TaskParamType.STRING,
            required: true,
        }
    ] as const,
    outputs: [
        {
            name: "Updated JSON",
            type: TaskParamType.STRING,
        }
    ] as const,
    credits: 1
} satisfies WorkflowTask;
