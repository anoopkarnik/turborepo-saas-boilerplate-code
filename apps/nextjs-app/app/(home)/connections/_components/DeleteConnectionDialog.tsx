"use client"

import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,

} from '@repo/ui/molecules/shadcn/alert-dialog'
import { Input } from '@repo/ui/atoms/shadcn/input'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@repo/ui/hooks/use-toast'
import { Button } from '@repo/ui/atoms/shadcn/button'
import { XIcon } from 'lucide-react'
import { DeleteConnection } from '../../../../actions/connections'

interface Props {
    name: string
}

const DeleteConnectionDialog = ({name}:Props) => {
    const {toast} = useToast()
    const [open, setOpen] = useState(false)
    const [confirmText, setConfirmText] = useState('')
    const deleteMutation = useMutation({
        mutationFn: DeleteConnection,
        onSuccess: ()=>{
            toast({title: "Success", description: "Connection deleted successfully", variant: 'success'})
            setConfirmText('')
        },
        onError: ()=>{
            toast({title: "Error", description: "Failed to delete connection", variant: 'destructive'})

        }
    })
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
            <Button variant={'destructive'} size={'icon'}>
                <XIcon size={18}/>
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure</AlertDialogTitle>
                <AlertDialogDescription>
                    If you delete this connection, you will not be able to recover it.
                    <div className='flex flex-col py-4 gap-2'>
                        <p>If you are sure, enter <b>{name} </b> to delete</p>
                        <Input value={confirmText} onChange={(e)=> setConfirmText(e.target.value)}/>
                    </div>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setConfirmText('')}>Cancel</AlertDialogCancel>
                <AlertDialogAction disabled={confirmText !== name || deleteMutation.isPending} 
                className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                onClick={()=>{
                    toast({title: "Deleting workflow....", description: "Please wait", variant: 'default'})
                    deleteMutation.mutate(name)
                }}>
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteConnectionDialog