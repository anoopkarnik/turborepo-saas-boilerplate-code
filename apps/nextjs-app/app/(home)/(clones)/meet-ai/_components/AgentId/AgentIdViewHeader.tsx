interface Props {
    agentId: string;
    agentname: string;
    onEdit: () => void;
    onRemove: () => void;
}

import { Button } from '@repo/ui/atoms/shadcn/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@repo/ui/molecules/shadcn/dropdown';
import { MoreVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react';
import React from 'react'

const AgentIdViewHeader = ({  agentname, onEdit, onRemove }: Props) => {
  return (
    <div className='flex items-center justify-between'>
        <h2 className='font-medium text-xl text-foreground'>{agentname}</h2>
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <MoreVerticalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={onEdit}>
                    <PencilIcon className='size-4 mr-2'/>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onRemove}>
                    <TrashIcon className='size-4 mr-2'/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default AgentIdViewHeader