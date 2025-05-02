"use client"

import { Button } from '@repo/ui/atoms/shadcn/button';
import { cn } from '@repo/ui/lib/utils';
import { Tabs, TabsContent } from '@repo/ui/molecules/shadcn/tabs';
import React, { useState } from 'react'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {lucario} from "react-syntax-highlighter/dist/esm/styles/prism"

type Props = {
    fileReferences: {
        fileName: string;
        sourceCode: string;
        summary: string;
    }[]
}

const CodeReferences = ({fileReferences}: Props) => {
    const [tab, setTab] = useState(fileReferences[0]?.fileName)
    if (fileReferences.length === 0) return null
  return (
    <div className='max-w-[75vw]'>
        <Tabs value={tab} onValueChange={setTab}>
            <div className='overflow-auto flex gap-2 bg-sidebar p-1 rounded-md'>
                {fileReferences?.map((file) => (
                    <Button variant={'blank'} key={file.fileName} onClick={()=>setTab(file.fileName)} className={cn(
                        'px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap text-muted-foreground',
                        tab ===file.fileName && 'bg-primary/50 '
                    )}>
                        {file.fileName}
                    </Button>
                ))}
            </div>
            {fileReferences.map(file=> (
                <TabsContent key={file.fileName} value={file.fileName} 
                className='max-h-[30vh] overflow-auto max-w-[75vw] rounded-md'>
                    <SyntaxHighlighter language='typescript' style={lucario}>
                        {file.sourceCode}
                    </SyntaxHighlighter>
                </TabsContent>
                  
            ))}
        </Tabs>
    </div>
  )
}

export default CodeReferences