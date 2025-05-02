"use client"
import React from 'react'
import useProject from '../_hooks/useProject'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/card'
import { Textarea } from '@repo/ui/atoms/shadcn/textarea'
import { Button } from '@repo/ui/atoms/shadcn/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@repo/ui/molecules/shadcn/dialog'
import { askQuestion } from '../_actions/openai'
import { readStreamableValue } from 'ai/rsc'
import MDEditor from "@uiw/react-md-editor"
import CodeReferences from './CodeReferences'
import { saveAnswer } from '../_actions/project'
import { useToast } from '@repo/ui/hooks/use-toast'

interface FileReference {
    fileName: string;
    sourceCode: string;
    summary: string;
}

const AskQuestionCard = () => {
    const {project} = useProject()
    const [question, setQuestion] = React.useState<string>("")
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [fileReferences, setFileReferences] = React.useState<FileReference[]>([])
    const [answer, setAnswer] = React.useState<string>("")

    const {toast} = useToast()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setAnswer("")
        setFileReferences([])
        e.preventDefault();
        if(!project?.id) return;
        setLoading(true)

        const {output, fileReferences} = await askQuestion(question, project.id)
        setOpen(true)
        setFileReferences(fileReferences)
        for await (const delta of readStreamableValue(output)) {
            if (delta){
                setAnswer((prev) => prev + delta)
            }
        }
        setLoading(false)
    }

    const handleSaveAnswer = async () => {
        try{
            if(!project?.id) return;
            await saveAnswer({
                question,
                answer,
                projectId: project.id,
                fileReferences
            })
            toast({
                title: "Answer saved successfully",
                description: "Your answer has been saved successfully",
                variant: "default"
            })
        }catch (error) {
            console.log(error)
            toast({
                title: "Failed to save answer",
                description: "An error occured while saving your answer",
                variant: "destructive"
            })
        }

    }
        


  return (
    <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='sm:max-w-[80vw] mx-4'>
                <DialogHeader>
                    <div className='flex items-center gap-2'>
                        <DialogTitle>Ask a Question</DialogTitle>
                        <Button variant={'outline'} onClick={handleSaveAnswer}>
                            Save Answer
                        </Button>
                    </div>

                    <DialogDescription>
                        Sam has knowledge of the codebase
                    </DialogDescription>
                </DialogHeader>
                <MDEditor.Markdown source={answer}   style={{backgroundColor: "transparent"}}
                className='max-w-[75vw] !h-full max-h-[40vh] overflow-auto mb-6'/>
                <CodeReferences fileReferences={fileReferences} />
                <Button onClick={() =>setOpen(false)}>
                    Close
                </Button>
                
            </DialogContent>
        </Dialog>
        <Card className='bg-sidebar col-span-3 mx-8'>
            <CardHeader>
                <CardTitle>Ask a Question</CardTitle>
                <CardDescription>Sam has knowledge of the codebase</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} >
                    <Textarea placeholder="Which file should I edit to change the home page?"
                    value={question} onChange={e=>setQuestion(e.target.value)}/>
                    <div className='h-4'></div>
                    <Button type='submit' variant='default' className='' disabled={loading}>
                        Ask Sam
                    </Button>
                </form>
            </CardContent>
        </Card>
    </>
  )
}

export default AskQuestionCard