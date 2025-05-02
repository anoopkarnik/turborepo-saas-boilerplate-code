"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/tabs'
import React from 'react'
import CreatePage from './CreatePage'
import useProject from '../_hooks/useProject'

const ProjectsTab = () => {
    const {projects,  projectId, setProjectId} = useProject()
  return (
    <Tabs defaultValue={projectId} onValueChange={setProjectId} className=''>
        <TabsList>
            {projects?.map((project) => (
                <TabsTrigger value={project.id} key={project.id} className='flex items-center gap-2'>
                    {project.name}
                </TabsTrigger>
            ))}
            <TabsTrigger value={"Add Project"}  className='flex items-center gap-2'>
                Add Project
            </TabsTrigger>
        </TabsList>
        <TabsContent value="Add Project">
            <CreatePage/>
        </TabsContent>
    </Tabs>
  )
}

export default ProjectsTab