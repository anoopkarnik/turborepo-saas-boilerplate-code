"use client"
import React from 'react'
import useCurrentUser from './_hooks/useCurrentUser';
import { Button } from '@repo/ui/atoms/shadcn/button';
import { CreateTwitterUser } from './_actions/user';
import Form from './_components/Form';
import PostFeed from './_components/posts/PostFeed';
import { ClipLoader } from 'react-spinners';


const TwitterClone = () => {
  const { data:currentUser,refetch,isLoading} = useCurrentUser();

  const handleCreateUser = async () => {
    await CreateTwitterUser(); // ✅ Call the server action
    refetch(); // ✅ Force refresh after user is created
  };
  if(isLoading){
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightgreen" size={80} />
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
    <div className='w-full h-full mt-2'>
       <Form placeholder="What's happening?"/>
       <PostFeed />
    </div>
  )
}

export default TwitterClone