"use client"

import { TaskParam } from '@repo/ts-types/scrape-flow/node'
import { cn } from '@repo/ui/lib/utils'
import { Handle, Position } from '@xyflow/react'
import React from 'react'
import { ColorForHandle } from '../../../_lib/workflow/tasks/registry'

const NodeOutput = ({output}:{output: TaskParam}) => {
  return (
      <div className='flex justify-end relative p-3 bg-secondary'>
        <p className='text-xs text-muted-foreground'>{output.name}</p>
        <Handle id={output.name} type="source" position={Position.Right} 
            className={cn("!bg-muted-foreground !border-2 !border-background !-right-2 !w-4 !h-4",
                ColorForHandle[output.type]
            )}
        />
    </div>
  )
}

export default NodeOutput