import { AppNode, TaskType } from "@repo/ts-types/scrape-flow/node";

export function CreateFlowNode(nodeType: TaskType, position?: {x: number, y: number}):AppNode {
    return {
        id: crypto.randomUUID(),
        type: 'Node',
        dragHandle: ".drag-handle",
        data: {
            type: nodeType,
            inputs: {},
        },
        position: position ?? {x: 0, y: 0}
    }
}
