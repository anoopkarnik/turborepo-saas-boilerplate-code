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
    FILL_INPUT = 'FILL_INPUT',
    CLICK_ELEMENT = 'CLICK_ELEMENT',
    WAIT_FOR_ELEMENT = 'WAIT_FOR_ELEMENT',
    DELIVER_VIA_WEBHOOK = 'DELIVER_VIA_WEBHOOK',
    EXTRACT_DATA_WITH_AI = 'EXTRACT_DATA_WITH_AI',
    READ_PROPERTY_FROM_JSON = 'READ_PROPERTY_FROM_JSON',
    ADD_PROPERTY_TO_JSON = 'ADD_PROPERTY_TO_JSON',
    NAVIGATE_URL = 'NAVIGATE_URL',
    SCROLL_TO_ELEMENT = 'SCROLL_TO_ELEMENT',
}

export enum TaskParamType {
    STRING = 'STRING',
    BROWSER_INSTANCE = 'BROWSER_INSTANCE',
    SELECT = 'SELECT',
    APIKEYS = 'APIKEYS',
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