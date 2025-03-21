"use client"
import React, { useEffect } from 'react'
import useCurrentUser from '../_hooks/useCurrentUser';
import { CreateTwitterUser } from '../_actions/user';
import { Button } from '@repo/ui/atoms/shadcn/button';
import { ClipLoader } from 'react-spinners';
import useNotification from '../_hooks/useNotification';
import { BsTwitter } from 'react-icons/bs';

const Notifications = () => {
  const { data:currentUser,refetch, isLoading} = useCurrentUser();
  const {data: fetchedNotifications=[]} = useNotification(currentUser?.id);

  const handleCreateUser = async () => {
    await CreateTwitterUser(); // ✅ Call the server action
    refetch(); // ✅ Force refresh after user is created
  };

  useEffect(() => {
    refetch();
  }
  ,[refetch])

  
  if(isLoading ){
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

  if (fetchedNotifications.length === 0){
    return (
      <div className='flex w-full h-full mt-4'>
        <div className='flex flex-col items-center w-full gap-4'>
          <p className='text-description text-md'>No Notifications</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col'>
      {fetchedNotifications.map((notification: Record<string,any>) => (
        <div key={notification.id} className='flex items-center p-6 gap-4 border-b-[1px] border-border'>
          <BsTwitter color='white' size={32}/>
          <p>{notification.body}</p>
        </div>
      ))}
    </div>
  )
}

export default Notifications