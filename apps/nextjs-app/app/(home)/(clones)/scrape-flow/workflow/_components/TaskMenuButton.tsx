import { TaskType } from '@repo/ts-types/scrape-flow/node'
import { Button } from '@repo/ui/atoms/shadcn/button'
import React from 'react'
import { TaskRegistry } from '../../_lib/workflow/tasks/registry';
import { Badge } from '@repo/ui/atoms/shadcn/badge';
import { CoinsIcon } from 'lucide-react';

const TaskMenuButton = ({taskType}: {taskType: TaskType}) => {
    const task = TaskRegistry[taskType];

    const onDragStart = ( event: React.DragEvent, type: TaskType) => {
        event.dataTransfer.setData('application/reactflow', type);
        event.dataTransfer.effectAllowed = "move";
    }

  return (
    <Button variant='secondary' size={'xs'} className='flex justify-between items-center gap-1 border w-full text-xs ' draggable 
    onDragStart={event => onDragStart(event,taskType)}>
        <div className='flex gap-2'>
            <task.icon size={14}/>
            {task.label}
        </div>
        <Badge className='gap-2 flex items-center' variant={'outline'}>
          <CoinsIcon size={14} />
          {task.credits}
        </Badge>
    </Button>
  )
}

export default TaskMenuButton