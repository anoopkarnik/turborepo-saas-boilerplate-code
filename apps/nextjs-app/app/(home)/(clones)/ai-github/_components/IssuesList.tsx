"use client"

import React, { useEffect } from 'react'
import { getMeetingById } from '../_actions/meeting'
import LoadingCard from '@repo/ui/organisms/misc/LoadingCard/v1'
import { VideoIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/card'
import { Button } from '@repo/ui/atoms/shadcn/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@repo/ui/molecules/shadcn/dialog'

type Props = {
    meetingId: string
}

const IssuesList = ({meetingId}:Props) => {
    const [meeting, setMeeting] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchIssues = async () => {
            setLoading(true);
            try {
                const data = await getMeetingById(meetingId);
                setMeeting(data);
            } catch (error) {
                console.error("Failed to fetch issues:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }
    , [meetingId]);

    if (loading || !meeting){
        return <LoadingCard title="Loading Issues..." />
    }

  return (
    <>
    <div className='p-8'>
        <div className='mx-auto flex max-w-2xl items-center justify-between gap-x-8 border-b pb-6 lg:mx-0 lg:max-w-none'>
            <div className='flex items-center gap-x-6'>
                <div className='rounded-full border  p-3'>
                    <VideoIcon className='h-6 w-6'/>
                </div>
                <h1>
                    <div className='text-description leading-6'>
                        Meeting on {meeting.createdAt.toLocaleDateString()}
                    </div>
                    <div className='mt-1 text-emphasized'>
                        {meeting.name}
                    </div>
                </h1>
            </div>
        </div>
        <div className='h-4'></div>
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
            {meeting.issues.map((issue:any) =>(
                <IssueCard key={issue.id} issue={issue} />
            ))}
        </div>
    </div>
    </>
  )
}

function IssueCard({issue}: {issue: any}) {
    const [open, setOpen] = React.useState(false);
    return (
        <>
        <Dialog  open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{issue.gist}</DialogTitle>
                    <DialogDescription>
                        {issue.createdAt.toLocaleDateString()} 
                    </DialogDescription>
                    <p className='text-muted-foreground'>
                        {issue.headline}
                    </p>
                    <blockquote className='mt-2 border-l-4 border-border bg-sidebar p-4'>
                        <span className='text-description'>
                            {issue.start} - {issue.end}
                        </span>
                        <p className='font-medium italic leading-relaxed opacity-90 '>
                            {issue.summary}
                        </p>
                    </blockquote>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        <Card className='relative'>
            <CardHeader>
                <CardTitle className='text-xl'>
                    {issue.gist}
                </CardTitle>
                <div className='border-b'></div>
                <CardDescription>
                    {issue.headline}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => setOpen(true)}>
                    View Issue
                </Button>
            </CardContent>
        </Card>
        </>
    )
}

export default IssuesList