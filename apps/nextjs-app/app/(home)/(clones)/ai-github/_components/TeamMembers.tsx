"use client"

import React, { useEffect } from 'react'
import useProject from '../_hooks/useProject'
import { getTeamMembers } from '../_actions/project'

const TeamMembers = () => {
    const {projectId } = useProject()
    const [teamMembers, setTeamMembers] = React.useState<any[]>([])

    useEffect(() => {
        const fetchTeamMembers = async () => {
            if (!projectId) return;
            const teamMembers = await getTeamMembers(projectId);
            setTeamMembers(teamMembers);

        }
        fetchTeamMembers();
    }
    , [projectId]);
  return (
    <div className='flex items-center gap-2'>
        {teamMembers.map((member)=>(
           <img key={member.id} 
                src={member.user.image || '/buddha.jpeg'} 
                alt={member.user.name} 
                width={32} 
                height={32} 
                className='rounded-full'
            />

        ))}
    </div>
  )
}

export default TeamMembers