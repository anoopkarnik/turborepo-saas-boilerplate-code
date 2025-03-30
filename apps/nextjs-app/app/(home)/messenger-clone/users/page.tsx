"use client"
import React, { useEffect, useState } from 'react'
import EmptyState from '../_components/common/EmptyState'
import { GetAllUsers } from '../_actions/users';
import UserList from '../_components/sidebar/UserList';

const Users  = () => {

    const [users, setUsers ] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await GetAllUsers()
            setUsers(users)
        }
        fetchUsers()
    }, [])
    

  return (
    <div className='h-full w-full flex '>
        <div className='h-full hidden lg:block w-[350px] overflow-y-auto border-r border-border'>
          <UserList users={users} />
        </div>
        <EmptyState />
    </div>
  )
}

export default Users