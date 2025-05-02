import { AppNode } from "@repo/ts-types/scrape-flow/node";
import { TaskRegistry } from "./tasks/registry";

export function CalculateWorkflowCost(nodes: AppNode[]){
    return nodes.reduce((acc, node) => {
        return acc + TaskRegistry[node.data.type].credits;
    }, 0);
}