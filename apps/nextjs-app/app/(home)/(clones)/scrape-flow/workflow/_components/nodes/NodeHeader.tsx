"use client"
import { AppNode, TaskType } from '@repo/ts-types/scrape-flow/node'
import React from 'react'
import { Badge } from '@repo/ui/atoms/shadcn/badge'
import { CoinsIcon,GripVerticalIcon, TrashIcon, CopyIcon} from 'lucide-react'
import { Button } from '@repo/ui/atoms/shadcn/button'
import { useReactFlow } from '@xyflow/react'
import { TaskRegistry } from '../../../_lib/workflow/tasks/registry'
import { CreateFlowNode } from '../../../_lib/workflow/tasks/CreateFlowNode'

const NodeHeader = ({taskType,nodeId}:{taskType: TaskType, nodeId: string}) => {
    const task = TaskRegistry[taskType];
    const {deleteElements,getNode,addNodes} = useReactFlow();
  return (
    <div className='flex items-center gap-2 p-2'>
        <task.icon size={16}/>
        <div className='flex justify-between items-center w-full'>
            <p className='text-xs font-bold uppercase text-muted-foreground'>
                {task.label}
            </p>
            <div className='flex gap-1 items-center'>
                {task.isEntryPoint && <Badge>Entry point</Badge>}
                {!task.isEntryPoint && (
                    <Button variant={'ghost'} size="icon" onClick={()=>deleteElements({nodes:[{id: nodeId}]})}>
                        <TrashIcon/>
                    </Button>
                )}
                {!task.isEntryPoint && (
                    <Button variant={'ghost'} size="icon" onClick={() => {
                        const node = getNode(nodeId) as AppNode;
                        const newX = node.position.x;
                        const newY = node.position.y + (node.measured?.height ? node.measured.height : 0) + 20;
                        const newNode = CreateFlowNode(node.data.type,{x: newX , y: newY });
                        addNodes([newNode])

                    }}>
                        <CopyIcon/>
                    </Button>
                )}
                <Badge className='gap-2 flex items-center text-xs'>
                    <CoinsIcon size={16}/>
                    {task.credits}
                </Badge>
                <div className='drag-handle cursor-grab '>
                    <GripVerticalIcon size={20}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NodeHeader