"use client"

import { Card } from '@repo/ui/molecules/shadcn/card'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Presentation, Upload } from 'lucide-react'
import { Button } from '@repo/ui/atoms/shadcn/button'
import {uploadToCloudflare} from '@repo/storage/cloudflare'
import { uploadMeeting } from '../_actions/meeting'
import useProject from '../_hooks/useProject'
import { useToast } from '@repo/ui/hooks/use-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const MeetingCard = () => {
    const [isUploading, setIsUploading] = React.useState(false)
    const {projectId} = useProject()
    const router = useRouter()
    const {toast} = useToast()
    const {getRootProps,getInputProps} = useDropzone({
        accept:{
            'audio/*': ['.mp3', '.wav', '.m4a']
        },
        multiple: false,
        maxSize: 50_000_000,
        onDrop: async (acceptedFiles) => {
            setIsUploading(true)
            
            console.log(acceptedFiles)
            const file = acceptedFiles[0] as File
            
            const key = `uploaded/audio-${Date.now()}-${file?.name}`;
            const bucket = 'meeting'
            const result = await uploadToCloudflare({file,key,bucket})
            if (!result.success) {
                setIsUploading(false)
                toast({
                    title: 'Error',
                    description: 'Failed to upload file',
                    variant: 'destructive'
                })

            }
            const meeting = await uploadMeeting({projectId,meetingUrl: result.url as string, name: file.name})
            console.log(meeting)
            toast({
                title: 'Success',
                description: 'Meeting uploaded successfully',
                variant: 'default'
            }) 
            router.push('/ai-github/meetings')
            axios.post('/api/ai-github/process-meeting', {
                meetingUrl: result.url,
                projectId,
                meetingId: meeting.id,
            })
            setIsUploading(false)
        },
    })
  return (
    <Card className='col-span-2 flex flex-col items-center justify-center bg-sidebar p-4' {...getRootProps()}>
        {!isUploading && (
            <>
                <Presentation className='h-10 w-10 animate-bounce'/>
                <h3 className='mt-2 text-sm font-semibold'>
                    Create a new meeting
                </h3>
                <p className='mt-1 text-center text-sm text-gray-500'>
                    Analyse your meeting with Sam
                    <br/>
                    Powered by AI
                </p>
                <div className='mt-6'>
                    <Button disabled={isUploading} >
                        <Upload className='-ml-0.5 mr-1.5 h-5 w-5' aria-hidden="true" />
                        Upload Meeting
                        <input className='hidden' {...getInputProps()} />
                    </Button>
                </div>
            </>
        )}
        {isUploading && (
            <div className='flex flex-col items-center justify-center'>
                
                <p className='text-description text-center'>Uploading your meeting...</p>
            </div>
        )}
    </Card>
  )
}

export default MeetingCard