"use client"
import { Button } from '@repo/ui/atoms/shadcn/button'
import { SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DashboardCommand from './_components/DashboardCommand'


const page = () => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const down = (e: KeyboardEvent) =>{
            if(e.key === 'k' && (e.metaKey || e.ctrlKey)){
                e.preventDefault()
                setOpen(!open)
            }
        }
        document.addEventListener('keydown', down)
        return () => {
            document.removeEventListener('keydown', down)
        }
    }, [open])
  return (
    <>
        <DashboardCommand open={open} setOpen={setOpen}/>
        <div className='h-full p-4 space-y-2 flex '>
            <Button className='h-9 w-[240px] justify-start font-normal bg-inherit hover:bg-inherit cursor-text
             text-description hover:text-description'
            variant='outline' size='sm' onClick={() => setOpen(!open)} >
                <SearchIcon className='h-4 w-4 mr-2'/>
                Search
                <kbd className='ml-auto pointer-events-none inline-flex h-5 select-non items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
                    <span className='text-xs'>&#8984;</span>K
                </kbd>
            </Button>
        </div>
    </>
  )
}

export default page