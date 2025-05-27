"use client"

import React from 'react'
import useProject from '../_hooks/useProject'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@repo/ui/molecules/shadcn/dialog'
import { Input } from '@repo/ui/atoms/shadcn/input'
import { useToast } from '@repo/ui/hooks/use-toast'
import { Button } from '@repo/ui/atoms/shadcn/button'

const InviteButton = () => {
    const {projectId} = useProject()
    const [open, setOpen] = React.useState(false)
    const {toast} = useToast()
  return (
    <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite Team Members</DialogTitle>
                </DialogHeader>
                <p className='text-description'>
                    Ask them to copy and paste this link
                </p>
                <Input className='mt-4' readOnly value={`${window.location.origin}/public/project/${projectId}`}                 
                onClick={()=>{
                    navigator.clipboard.writeText(`${window.location.origin}/public/project/${projectId}`)
                    toast({
                        title: 'Link Copied',
                        description: 'The invite link has been copied to your clipboard.',
                        variant: 'default'
                    })
                }}/>
            </DialogContent>
        </Dialog>
        <Button size={'sm'} onClick={()=>setOpen(true)}>
            Invite Team Members
        </Button>
    </>
  )
}

export default InviteButton