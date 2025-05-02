"use client"


import { useRouter } from 'next/navigation'
import React from 'react'
import { authClient } from '@repo/auth/better-auth/auth-client'
import { useToast } from '@repo/ui/hooks/use-toast'
import { Button } from '@repo/ui/atoms/shadcn/button'

const ImpersonateUser = ({userId}: {userId: string}) => {
    const router = useRouter()
    const {toast} = useToast()

    const handleImpersonate = async () => {
        const {error} = await authClient.admin.impersonateUser({
            userId: userId,
        })
        if (error) {
            toast({
                title: "Impersonation failed",
                description: error.message,
                variant: "destructive",
            })
        }     
        else {
            toast({
                title: "Impersonation successful",
                description: "You are now impersonating the user.",
                variant: "default",
            })
            router.push("/")
            router.refresh()
        }   
    }
  return (
    <Button onClick={handleImpersonate} variant="outline" className='w-full'>
        Impersonate
    </Button>
  )
}

export default ImpersonateUser