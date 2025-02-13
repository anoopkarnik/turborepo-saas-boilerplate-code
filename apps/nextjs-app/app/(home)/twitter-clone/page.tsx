"use client"
import React from 'react'
import useCurrentUser from './_hooks/useCurrentUser';
import { Button } from '@repo/ui/atoms/shadcn/button';
import { CreateTwitterUser } from './_actions/user';


const page = () => {
  const { data:currentUser} = useCurrentUser();
  return (
    <div className='flex w-full h-full mt-4'>
      {!currentUser && (
        <Button onClick={()=>CreateTwitterUser()}>
          Create Twitter Account 
        </Button>
      )}
    </div>
  )
}

export default page