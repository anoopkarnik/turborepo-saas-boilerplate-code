"use client"
import React, { useEffect, useState } from 'react'
import { getConversations } from './_actions/conversation';
import ConversationList from './_components/sidebar/ConversationList';
import EmptyState from './_components/common/EmptyState';
import { CreateMessengerUser, GetAllUsers } from './_actions/users';
import useCurrentUser from './_hooks/useCurrentUser';
import { ClipLoader } from 'react-spinners';
import { Button } from '@repo/ui/atoms/shadcn/button';

const MessengerClone = () => {
    const [conversations, setConversations] = React.useState<any[]>([]);
    const [users, setUsers ] = useState<any[]>([])
    const { data:currentUser,refetch,isLoading} = useCurrentUser();
    
    const handleCreateUser = async () => {
        await CreateMessengerUser()// ✅ Call the server action
        refetch(); // ✅ Force refresh after user is created
    };


    useEffect(() => {
        const fetchConversations = async () => {
            const conversations = await getConversations()
            setConversations(conversations)
        }
        const fetchUsers = async () => {
            const users = await GetAllUsers()
            setUsers(users)
        }
        fetchUsers()
        fetchConversations()
    }, [])

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
                <p className='text-description text-md'>You dont have a Messenger Clone Account here. Click on the below button to create a messenger clone account in this boilerplate</p>
                <Button onClick={handleCreateUser}>
                Create Account 
                </Button>
            </div>
            </div>
        )
    }

  return (
    <div className='h-full w-full flex'>
        <div className='h-full hidden lg:block w-[400px] overflow-y-auto'>
            <ConversationList conversations={conversations} users={users} />
        </div>
        <EmptyState />
    </div>
  )
}

export default MessengerClone