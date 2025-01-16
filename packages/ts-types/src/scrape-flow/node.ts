import {Node} from "@xyflow/react"

export interface AppNodeData {
    type: TaskType;
    inputs: Record<string,string>;
    [key: string]: any;
}

export interface AppNode extends Node {
    data: AppNodeData;
}

export enum TaskType {
    LAUNCH_BROWSER = 'LAUNCH_BROWSER',
    PAGE_TO_HTML = 'PAGE_TO_HTML',
    EXTRACT_TEXT_FROM_ELEMENT = 'EXTRACT_TEXT_FROM_ELEMENT',
}

export enum TaskParamType {
    STRING = 'STRING',
    BROWSER_INSTANCE = 'BROWSER_INSTANCE',
}

export interface TaskParam {
    name: string;
    type: TaskParamType;
    helperText?: string;
    required?: boolean;
    hideHandle?: boolean;
    [key:string] : any;
}

export type AppNodeMissingInputs = {
    nodeId: string;
    inputs: string[];
}