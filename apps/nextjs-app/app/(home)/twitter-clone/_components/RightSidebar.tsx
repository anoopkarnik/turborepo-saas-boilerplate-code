import React from 'react'
import { GetAllUsers } from '../_actions/user'

const RightSidebar = () => {
  return (
    <div className='px-6 py-4 hidden lg:block w-full'>
        <div className='bg-sidebar rounded-xl p-4 w-full '>
            <h2 className='text-emphasized w-full '>Who to follow</h2>
            <div className='flex flex-col gap-6 mt-4'>
                <Users />
            </div>
        </div>
    </div>
  )
}

export async function Users(){
    const users = await GetAllUsers()
    if(!users || users.length === 0){
        return (
            <div className='text-destructive text-sm'>
                <p>No users to show</p>
            </div>
        )
    }
    else{
        return users.map((user:any) => (
            <div key={user.id} className='flex items-center gap-4'>
                <div className='flex flex-col'>
                    <p className='text-emphasized'>{user.username}</p>
                    <p className='text-secondary text-sm'>{user.username}</p>
                </div>
            </div>
        ))
    }
}

export default RightSidebar