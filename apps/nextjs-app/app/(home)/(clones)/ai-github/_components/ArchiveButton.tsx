"use client"

import React from 'react'
import useProject from '../_hooks/useProject'
import { Button } from '@repo/ui/atoms/shadcn/button'
import { archiveProject } from '../_actions/project'
import { useToast } from '@repo/ui/hooks/use-toast'

const ArchiveButton = () => {
    const {projectId,refreshProjects} = useProject()
    const {toast} = useToast()

  return (
    <Button size={'sm'} variant={'destructive'} onClick={async ()=>{
        const confirm = window.confirm("Are you sure you want to archive this project? This action cannot be undone.");
        if (confirm) {
            await archiveProject( projectId );
            toast({
                title: 'Project Archived',
                description: 'The project has been successfully archived.',
                variant: 'default'
            })
            await refreshProjects();
        }

    }}>
        Archive
    </Button>
  )
}

export default ArchiveButton