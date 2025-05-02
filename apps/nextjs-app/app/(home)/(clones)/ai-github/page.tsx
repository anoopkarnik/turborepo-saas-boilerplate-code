"use client"
import React from 'react'
import ProjectsTab from './_components/ProjectsTab'
import { ExternalLink, GithubIcon } from 'lucide-react'
import useProject from './_hooks/useProject'
import Link from 'next/link'
import CommitLog from './_components/CommitLog'
import AskQuestionCard from './_components/AskQuestionCard'
import MeetingCard from './_components/MeetingCard'

const Dashboard = () => {
    const {project} = useProject()
  return (
    <div className='mx-4'>        
        <ProjectsTab/>
        {project && 
            <>
                <div className='flex items-center justify-between flex-wrap gap-y-4 m-4 '>
                    {/* Github Link */}
                    <div className='w-fit rounded-md bg-primary/20 px-4 py-3 flex items-center gap-2'>
                        <GithubIcon className='h-4 w-4 text-white' />
                        <div className='ml-2'>
                            This project is linked to  <Link href={project?.githubUrl as string} 
                            target='_blank' className='inline-flex items-center text-white/80 hover:underline'>
                                {project?.githubUrl as string}
                                <ExternalLink className='h-4 w-4 ml-1' />
                            </Link>
                        </div>
                    </div>
                    <div className='h-4'></div>
                    <div className='flex items-center gap-4'>
                        Team Members
                    </div>                
                </div>
                <div className='grid grid-cols-5 w-full mx-2 my-10 gap-2s'>
                    <AskQuestionCard/>
                    <MeetingCard/>
                </div>
                <div>
                    <CommitLog/>
                </div>
            </>
        }

        
    </div>
  )
}

export default Dashboard