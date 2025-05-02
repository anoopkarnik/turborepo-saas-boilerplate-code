"use client"

import React from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/molecules/shadcn/accordion'
import { TaskType } from '@repo/ts-types/scrape-flow/node'
import TaskMenuButton from './TaskMenuButton'

const TaskMenu = () => {
  return (
    <aside className='w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate h-full px-4 overflow-auto'>
        <Accordion type="multiple" className='w-full' defaultValue={['extraction','interactions','timing',
        'results','storage'
        ]}>
            <AccordionItem value="extraction">
                <AccordionTrigger className='text-sm '>
                    Data Extraction
                </AccordionTrigger>
                <AccordionContent className='flex flex-col gap-1'>
                    <TaskMenuButton taskType={TaskType.PAGE_TO_HTML}/>
                    <TaskMenuButton taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT}/>
                    <TaskMenuButton taskType={TaskType.EXTRACT_DATA_WITH_AI}/>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="interactions">
                <AccordionTrigger className='text-sm'>
                    User Interactions
                </AccordionTrigger>
                <AccordionContent className='flex flex-col gap-1'>
                    <TaskMenuButton taskType={TaskType.NAVIGATE_URL}/>
                    <TaskMenuButton taskType={TaskType.FILL_INPUT}/>
                    <TaskMenuButton taskType={TaskType.CLICK_ELEMENT}/>
                    <TaskMenuButton taskType={TaskType.SCROLL_TO_ELEMENT}/>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="storage">
                <AccordionTrigger className='text-sm'>
                    Data Storage
                </AccordionTrigger>
                <AccordionContent className='flex flex-col gap-1'>
                    <TaskMenuButton taskType={TaskType.READ_PROPERTY_FROM_JSON}/>
                    <TaskMenuButton taskType={TaskType.ADD_PROPERTY_TO_JSON}/>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="timing">
                <AccordionTrigger className='text-sm'>
                    Timing Controls
                </AccordionTrigger>
                <AccordionContent className='flex flex-col gap-1'>
                    <TaskMenuButton taskType={TaskType.WAIT_FOR_ELEMENT}/>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="results">
                <AccordionTrigger className='text-sm'>
                    Result Delivery
                </AccordionTrigger>
                <AccordionContent className='flex flex-col gap-1'>
                    <TaskMenuButton taskType={TaskType.DELIVER_VIA_WEBHOOK}/>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </aside>
  )
}

export default TaskMenu