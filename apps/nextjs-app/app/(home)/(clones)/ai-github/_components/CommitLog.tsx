"use client"

import React, {  useEffect, useState } from 'react'
import useProject from '../_hooks/useProject'
import { GithubCommit } from "@prisma/prisma/client"
import { getCommits } from '../_actions/project'
import { cn } from '@repo/ui/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const CommitLog = () => {
    const { projectId, project } = useProject()
    const [commits, setCommits] = useState<GithubCommit[]>([])

    useEffect(() => {
        const fetchCommits = async () => {
            const commits = await getCommits(projectId)
            setCommits(commits)
        }
        fetchCommits()
    }, [projectId])

  return (
    <>
        <ul className='space-y-6'>
            {commits?.map((commit,index) => (
                <li key={commit.id} className='relative flex gap-x-4'>
                    <div className={cn("absolute left-0, top-0 flex w-6 justify-center",
                        index === commits.length - 1 ? 'h-8' : '-bottom-8' 
                    )}>
                        <div className='w-px translate-x-1 bg-sidebar'>

                        </div>
                    </div>
                    <>
                       <Image src={commit.commitAuthorAvatar} alt="Avatar" width={40} height={40} 
                       className='relative mt-4 size-8 flex-none rounded-full ' />
                       <div className='flex-auto rounded-md bg-sidebar p-3 ring-1 ring-inset ring-ring/30'>
                            <div className='flex justify-between gap-x-4'>
                                <Link target='_blank' 
                                href={`${project?.githubUrl}/commit/${commit.commitHash}`} 
                                className='py-0.5 text-xs leading-5 '>
                                    <span className='font-medium '>
                                        {commit.commitAuthorName}
                                    </span> <span className='inline-flex items-center text-description'>
                                        commited
                                        <ExternalLink className='ml-1 size-4' />
                                    </span>
                                </Link>
                            </div>
                            <span className='font-semibold'>
                                {commit.commitMessage}
                            </span>
                            <pre className='mt-2 whitespace-pre-wrap text-sm text-gray-500'>
                                {commit.summary}
                            </pre>
                        </div>
                       
                    </>
                </li>
            ))}
        </ul>
    </>
  )
}

export default CommitLog