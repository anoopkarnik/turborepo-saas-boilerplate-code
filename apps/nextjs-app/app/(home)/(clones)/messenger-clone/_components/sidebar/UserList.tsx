"use client"

import React from 'react'
import { MessengerUser } from "@prisma/client"
import UserBox from './UserBox'

interface UserListProps {
  users: MessengerUser[] 
}

const UserList = ({users}:UserListProps) => {
  return (
    <aside className=' inset-y-0 pb-20 lg:pb-0 lg:left-20  lg:block overflow-y-auto
    bg-background block w-full left-0 '>
        <div className='px-5'>
            <div className='flex-col mb-2'>
                <div className='text-lg font-bold py-2'>People</div>
            </div>
            {users.map((user)=>(
                <UserBox key={user.id} user={user} />    
            ))}
        </div>
    </aside>
  )
}

export default UserList