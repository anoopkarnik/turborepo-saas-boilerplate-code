"use client"
import React from 'react'
import useCurrentUser from './_hooks/useCurrentUser';
import { Button } from '@repo/ui/atoms/shadcn/button';
import { CreateTwitterUser } from './_actions/user';


const TwitterClone = () => {
  const { data:currentUser,refetch,isLoading} = useCurrentUser();

  const handleCreateUser = async () => {
    await CreateTwitterUser(); // ✅ Call the server action
    refetch(); // ✅ Force refresh after user is created
  };
  if(isLoading){
    return (
      <div className='flex w-full h-full mt-4'>
        <div className='flex flex-col items-center justify-center w-full gap-4'>
          <p className='text-description text-2xl'>Loading...</p>
        </div>
      </div>
    )
  }

  if(!currentUser){
    return (
      <div className='flex w-full h-full mt-4'>
        <div className='flex flex-col items-center justify-center w-full gap-4'>
          <p className='text-description text-md'>You dont have a Twitter Clone Account here. Click on the below button to create a twitter clone account in this boilerplate</p>
          <Button onClick={handleCreateUser}>
            Create Account 
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex w-full h-full mt-4'>

    </div>
  )
}

export default TwitterClone