import React from 'react'
import { MeetingsGetOne } from '../../_utils/types'
import { ScrollArea, ScrollBar } from '@repo/ui/molecules/shadcn/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/tabs'
import { BookOpenTextIcon, Clock10Icon, FileTextIcon, FileVideoIcon, SparklesIcon } from 'lucide-react'
import Markdown from "react-markdown"
import Link from 'next/link'
import GeneratedAvatar from '../GeneratedAvatar'
import { format } from 'date-fns'
import { Badge } from '@repo/ui/atoms/shadcn/badge'
import { formatDuration } from '../../_utils/functions'
import Transcript from './Transcript'
import ChatProvider from './ChatProvider'

const CompletedState = ({ data }: {data: MeetingsGetOne}) => {
  return (
    <div className='flex flex-col gap-y-4'>
        <Tabs defaultValue="summary">
            <div className='px-3'>
                <ScrollArea>
                    <TabsList className='p-0 bg-background justify-start rounded-none h-13'>
                        <TabsTrigger value="summary" className='text-muted-foreground rounded-none bg-background 
                        data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary 
                        data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground'>
                            <BookOpenTextIcon  className='mr-2 size-4'/> Summary
                        </TabsTrigger>
                        <TabsTrigger value="transcript" className='text-muted-foreground rounded-none bg-background 
                        data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary 
                        data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground'>
                            <FileTextIcon  className='mr-2 size-4'/> Transcript
                        </TabsTrigger>
                        <TabsTrigger value="recording" className='text-muted-foreground rounded-none bg-background 
                        data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary 
                        data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground'>
                            <FileVideoIcon className='mr-2 size-4'/> Recording
                        </TabsTrigger>
                        <TabsTrigger value="chat" className='text-muted-foreground rounded-none bg-background 
                        data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary 
                        data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground'>
                            <SparklesIcon className='mr-2 size-4'/> Ask AI
                        </TabsTrigger>
                    </TabsList>
                    <ScrollBar orientation='horizontal' />
                </ScrollArea>
            </div>
            <TabsContent value="recording">
                <div className='rounded-lg border px-4 py-5'>
                    <video src={data.recordingUrl!} controls className='w-full rounded-lg'/>
                </div>
            </TabsContent>
            <TabsContent value="summary">
                <div className='rounded-lg border'>
                    <div className='px-4 py-5 gap-y-5 flex flex-col col-span-5'>
                        <h2 className='text-2xl font-medium capitalize'>{data.name}</h2>
                        <div className='flex gap-x-2 items-center'>
                            <Link href={`/meeting-ai/agents/${data.agent.id}`}
                             className='flex items-center gap-x-2 underline underline-offset-4 capitalize'>
                                <GeneratedAvatar seed={data.agent.name} variant='botttsNeutral' className='size-5' />
                                {data.agent.name}
                            </Link>{" "}
                            <p>{data.startedAt ? format(data.startedAt, "PPP"):""}</p>
                        </div>
                        <div className='flex gap-x-2 items-center'>
                            <SparklesIcon className='size-4'/>
                            <p>General Summary</p>
                        </div>
                        <div>
                            <Markdown 
                              components ={{
                                h1: (props) => <h1 className='text-2xl font-medium mb-6' {...props} />,
                                h2: (props) => <h2 className='text-xl font-medium mb-6' {...props} />,
                                h3: (props) => <h3 className='text-lg font-medium mb-6' {...props} />,
                                h4: (props) => <h4 className='text-md font-medium mb-6' {...props} />,
                                p: (props) => <p className='mb-6 leading-relaxed' {...props} />,
                                ul: (props) => <ul className='list-disc list-inside mb-6' {...props} />,
                                ol: (props) => <ol className='list-decimal list-inside mb-6' {...props} />,
                                li: (props) => <li className='mb-1' {...props} />,
                                strong: (props) => <strong className='font-semibold' {...props} />,
                                code: (props) => <code className='bg-muted px-1 py-0.5 rounded font-mono text-sm' {...props} />,
                                blockquote: (props) => <blockquote className='border-l-2 pl-4 italic my-6 text-muted' {...props} />,
                                a: (props) => <a className='underline underline-offset-4 text-primary' {...props} />,
                              }}>
                                {data.summary || "No summary available"}
                            </Markdown>
                        </div>
                    </div>

                </div>
            </TabsContent>
            <TabsContent value="transcript">
                <Transcript meetingId={data.id} />
            </TabsContent>
            <TabsContent value="chat">
                <ChatProvider meetingId={data.id} meetingName={data.name} />
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default CompletedState