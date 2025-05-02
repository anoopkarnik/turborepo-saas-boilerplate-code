"use client"
import { AppNode, TaskParam, TaskParamType } from '@repo/ts-types/scrape-flow/node'
import React, { useCallback } from 'react'
import StringParam from './param/StringParam';
import { useReactFlow } from '@xyflow/react';
import BrowserInstanceParam from './param/BrowserInstanceParam';
import SelectParam from './param/SelectParam';
import APIKeysParam from './param/APIKeysParam';

const NodeParamField = ({param,nodeId,disabled}: {param: TaskParam,nodeId: string, disabled: boolean}) => {
    const {updateNodeData,getNode} = useReactFlow();
    const node = getNode(nodeId) as AppNode;
    const value = node?.data.inputs?.[param.name] as string;

    const updateNodeParamValue = useCallback((newValue:string) => {
        updateNodeData(nodeId,{
            inputs: {
                ...node?.data.inputs,
                [param.name]: newValue
            }
        })
    },[nodeId,updateNodeData, param.name,node?.data.inputs])

  switch (param.type) {
    case TaskParamType.STRING:
        return <StringParam param={param} value={value} updateNodeParamValue={updateNodeParamValue} disabled={disabled}/>;
    case TaskParamType.BROWSER_INSTANCE:
      return <BrowserInstanceParam param={param} value={""} updateNodeParamValue={updateNodeParamValue}/>;
    case TaskParamType.SELECT:
      return <SelectParam param={param} value={value} updateNodeParamValue={updateNodeParamValue} disabled={disabled}/>;
    case TaskParamType.APIKEYS:
      return <APIKeysParam param={param} value={value} updateNodeParamValue={updateNodeParamValue} disabled={disabled}/>;
    default:
        return (
          <div className='w-full'>
            <p className='text-xs text-muted-foreground'>Not Implemented</p>
          </div>
        );
  }
}

export default NodeParamField