"use client"
import React from 'react'
import useUsers from '../_hooks/useUsers'
import Avatar from './Avatar'

const RightSidebar = () => {
    const {data: users =[]} = useUsers()

    if (users.length === 0) {
        return null
    }

  return (
    <div className='px-6 py-4 hidden lg:block w-full'>
        <div className='bg-sidebar rounded-xl p-4 w-full '>
            <h2 className='text-emphasized w-full '>Who to follow</h2>
            <div className='flex flex-col gap-6 mt-4'>
                {users.map((user: Record<string,any>) => (
                    <div key={user.id} className='flex gap-4 items-center'>
                        <Avatar user={user}/>
                        <div className='flex flex-col'>
                            <p className='text-semibold text-sm'>{user.name}</p>
                            <p className='text-description'>@{user.username}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}


export default RightSidebar