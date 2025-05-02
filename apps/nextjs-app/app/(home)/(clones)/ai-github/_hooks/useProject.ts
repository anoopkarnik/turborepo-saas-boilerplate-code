"use client"
import { useCallback, useState } from 'react'
import { getProjects } from '../_actions/project'
import  {useLocalStorage} from "usehooks-ts"
import { GithubProject} from "@prisma/prisma/client"

const useProject = () => {
    const [projects, setProjects] = useState<GithubProject[]>([])
    const [projectId, setProjectId] = useLocalStorage("projectId", '')
    const [project, setProject] = useState<GithubProject>()

    const refreshProjects = useCallback(async () => {
      const projects = await getProjects()
      setProjects(projects)
      setProject(projects.find((project) => project.id === projectId))
    }, [projectId])

   return {projects,projectId, project,setProjectId,refreshProjects}
}

export default useProject