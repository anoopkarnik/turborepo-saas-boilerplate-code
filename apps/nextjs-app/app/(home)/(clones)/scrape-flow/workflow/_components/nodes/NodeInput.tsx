import { TaskParam } from '@repo/ts-types/scrape-flow/node'
import { cn } from '@repo/ui/lib/utils'
import { Handle,Position, useEdges } from '@xyflow/react'
import React from 'react'
import NodeParamField from './NodeParamField'
import { ColorForHandle } from '../../../_lib/workflow/tasks/registry'
import useFlowValidation from '../../../_hooks/useFlowValidation'

const NodeInput = ({input,nodeId}:{input:TaskParam,nodeId:string}) => {
  const edges = useEdges();
  const {invalidInputs} = useFlowValidation();
  const isConnected = edges.some(edge => edge.target === nodeId && edge.targetHandle === input.name);

  const hasErrors = invalidInputs.find(node => node.nodeId === nodeId)
  ?.inputs.find((invalidInput) => invalidInput === input.name);
  return (
    <div className={cn('flex justify-start relative p-3 bg-secondary w-full',
      hasErrors && 'bg-destructive',)}>
        <NodeParamField param={input} nodeId={nodeId} disabled={isConnected}/>
        {!input.hideHandle && (
            <Handle id={input.name} type="target" isConnectable={!isConnected} position={Position.Left}
            className={cn("!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
                ColorForHandle[input.type]
            )}
            />
        )}
    </div>
  )
}

export default NodeInput