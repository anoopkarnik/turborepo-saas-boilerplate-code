"use client"
import React, { useEffect, useState } from 'react'
import useProject from '../_hooks/useProject'
import { deleteMeeting, getMeetings } from '../_actions/meeting'
import MeetingCard from '../_components/MeetingCard'
import Link from 'next/link'
import {Badge} from '@repo/ui/atoms/shadcn/badge'
import ProjectsTab from '../_components/ProjectsTab'
import { Button } from '@repo/ui/atoms/shadcn/button'

const MeetingIdPage = () => {
  const {projectId} = useProject()
  const [meetings, setMeetings] = useState<any[]>([])

  useEffect(()=>{
    const fetchMeetings = async () => {
      if (!projectId) return
      const data= await getMeetings(projectId)
      setMeetings(data)
    }
    fetchMeetings()
  }, [projectId])
  
  return (
    <div className="m-6">
        <ProjectsTab />
      <MeetingCard />
      <div className="h-6"></div>
      <h1 className="text-2xl font-semibold">Meetings</h1>
      {meetings && meetings.length === 0 && <div> No meetings found</div>}
      <ul className="divide-y divide-gray-200">
        {meetings?.map((meeting)=> {
          return (
            <li key={meeting.id} className="flex items-center justify-between py-5 gap-x-6">

                <div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                       <Link href={`/ai-github/meetings/${meeting.id}`} className="text-sm font-semibold">
                        {meeting.name}
                       </Link>
                      {meeting.status === "PROCESSING" && (
                        <Badge className="bg-yellow-500 text-white ">
                          Processing...
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 gap-x-2">
                    <p className="whitespace-nowrap">
                      {meeting.createdAt.toLocaleDateString()}
                    </p>
                    <p className="truncate">
                      {meeting.issues.length} issues
                    </p>
                  </div>
                </div>
                <div className="flex items-center flex-none gap-x-4">
                  <Link href={`/ai-github/meetings/${meeting.id}`} >
                      <Button variant="outline" size="sm">
                        View Meeting
                      </Button>
                  </Link>
                  <Button variant={'destructive'} 
                     onClick={async() => {await deleteMeeting(meeting.id);}}
                    size={'sm'}>
                      Delete Meeting
                  </Button>
                </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default MeetingIdPage