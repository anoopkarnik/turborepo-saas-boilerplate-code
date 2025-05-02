import { AppNode, AppNodeMissingInputs } from "@repo/ts-types/scrape-flow/node";
import { WorkflowExecutionPlan, WorkflowExecutionPlanPhase } from "@repo/ts-types/scrape-flow/workflow";
import { Edge } from "@xyflow/react";
import { TaskRegistry } from "./tasks/registry";

export enum FlowToExecutionPlanValidationError {
    "NO_ENTRY_POINT",
    "INVALID_INPUTS"
}

type FlowToExecutionPlanType = {
    executionPlan?: WorkflowExecutionPlan;
    error?: {
        type: FlowToExecutionPlanValidationError;
        invalidElements?: AppNodeMissingInputs[];
    };
};

export function FlowToExecutionPlan(nodes: AppNode[], edges: Edge[]): FlowToExecutionPlanType {
    const entryPoint = findEntryPoint(nodes);
    if (!entryPoint) {
        return { error: { type: FlowToExecutionPlanValidationError.NO_ENTRY_POINT } };
    }

    const planned = new Set<string>();
    const inputsWithErrors: AppNodeMissingInputs[] = [];
    const executionPlan: WorkflowExecutionPlan = buildExecutionPlan(nodes, edges, entryPoint, planned, inputsWithErrors);
    
    return inputsWithErrors.length > 0
        ? { error: { type: FlowToExecutionPlanValidationError.INVALID_INPUTS, invalidElements: inputsWithErrors } }
        : { executionPlan };
}

function findEntryPoint(nodes: AppNode[]): AppNode | undefined {
    return nodes.find(node => TaskRegistry[node.data.type]?.isEntryPoint);
}

function buildExecutionPlan(
    nodes: AppNode[],
    edges: Edge[],
    entryPoint: AppNode,
    planned: Set<string>,
    inputsWithErrors: AppNodeMissingInputs[]
): WorkflowExecutionPlan {
    
    const executionPlan: WorkflowExecutionPlan = [{ phase: 1, nodes: [entryPoint] }];
    planned.add(entryPoint.id);

    for (let phase = 2; phase <= nodes.length && planned.size < nodes.length; phase++) {
        const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };
        
        for (const node of nodes) {
            if (planned.has(node.id)) continue;
            
            if (!canExecuteNode(node, edges, planned, inputsWithErrors)) continue;
            
            nextPhase.nodes.push(node);
        }
        
        nextPhase.nodes.forEach(node => planned.add(node.id));
        if (nextPhase.nodes.length > 0) executionPlan.push(nextPhase);
    }

    return executionPlan;
}

function canExecuteNode(
    node: AppNode,
    edges: Edge[],
    planned: Set<string>,
    inputsWithErrors: AppNodeMissingInputs[]
): boolean {
    const invalidInputs = getInvalidInputs(node, edges, planned);
    if (invalidInputs.length === 0) return true;
    
    const incomers = getIncomers(node, edges);
    if (incomers.every(incomer => planned.has(incomer.id))) {
        inputsWithErrors.push({ nodeId: node.id, inputs: invalidInputs });
    }
    
    return false;
}

function getInvalidInputs(node: AppNode, edges: Edge[], planned: Set<string>): string[] {
    const invalidInputs: string[] = [];
    const inputs = TaskRegistry[node.data.type]?.inputs || [];
    
    for (const input of inputs) {
        if (isInputValid(node, input.name, edges, planned)) continue;
        invalidInputs.push(input.name);
    }
    return invalidInputs;
}

function isInputValid(node: AppNode, inputName: string, edges: Edge[], planned: Set<string>): boolean {
    const inputValue = node.data.inputs[inputName] as string;
    if (inputValue?.length > 0) return true;
    
    const incomingEdges = edges.filter(edge => edge.target === node.id);
    const inputLinkedToOutput = incomingEdges.find(edge => edge.targetHandle === inputName);
    
    return inputLinkedToOutput ? planned.has(inputLinkedToOutput.source) : false;
}

function getIncomers(node: AppNode, edges: Edge[]): AppNode[] {
    const incomerIds = new Set(edges.filter(edge => edge.target === node.id).map(edge => edge.source));
    return Array.from(incomerIds).map(id => ({ id } as AppNode));
}
