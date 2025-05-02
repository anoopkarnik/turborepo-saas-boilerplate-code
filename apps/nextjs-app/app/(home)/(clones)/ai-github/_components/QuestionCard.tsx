"use client"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@repo/ui/molecules/shadcn/sheet'
import React  from 'react'
import Image from 'next/image'
import MDEditor from '@uiw/react-md-editor'
import CodeReferences from './CodeReferences'


const QuestionCard = ({question}: {question:any}) => {


  return (
    <>
      <Sheet>
          <SheetTrigger asChild>
             <div className='bg-sidebar flex items-centers gap-4 rounded-lg p-4 mx-8 
             hover:bg-sidebar/50 cursor-pointer'>
                 <Image src={question?.user?.image} alt="Avatar" width={40} height={40} 
                 className='object-cover rounded-full'/>
                <div className='text-left flex flex-col'>
                    <div className='flex items-center gap-2'>
                        <p className='line-clamp-1 text-lg font-medium'>
                            {question.question}
                        </p>
                        <span className='text-gray-400 text-xs whitespace-nowrap'>
                            {question.createdAt.toLocaleString()}
                        </span>
                    </div>
                    <p className='text-gray-500 text-sm line-clamp-1'>
                        {question.answer}
                    </p>
                </div>
             </div>
          </SheetTrigger>
            {question && (
                <SheetContent className='sm:max-w-[80vw]'>
                    <SheetHeader>
                        <SheetTitle>
                            {question.question}
                        </SheetTitle>
                        <MDEditor.Markdown source={question.answer} style={{backgroundColor: "transparent"}}/>
                        <CodeReferences fileReferences={question.fileReferences?? []} />
                    </SheetHeader>                    
                </SheetContent>
            )}
      </Sheet>
    </>
  )
}

export default QuestionCard