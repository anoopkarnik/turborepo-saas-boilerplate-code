"use client"
import { authClient } from '@repo/auth/better-auth/auth-client'
import { User } from '@prisma/prisma/client'
import React, { useEffect, useState } from 'react'
import ImpersonateUser from './ImpersonateUser'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui/molecules/shadcn/table'

const UsersTable = () => {

    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    
    useEffect(() => {
        const fetchUsers = async () => {
            try{
                setIsLoading(true)
                const response = await authClient.admin.listUsers({
                    query: { limit: 10}
                })
    
                if (response?.data){
                    setUsers(response.data.users as User[])
                }
    
            }catch(err){
                setError(err as Error)
            }finally{
                setIsLoading(false)
            }
        }
        fetchUsers()
    },[])

    if (isLoading){
        return (
            <div className='flex justify-center p-4'>
                <span> Loading users....</span>
            </div>
        )
    }

    if (error){
        return (
            <div className='flex justify-center p-4'>
                <span> Error fetching users: {error.message}</span>
            </div>
        )
    }
   
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {users.map((user) => (
                <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.emailVerified ? "Yes" : "No"}</TableCell>
                    <TableCell>
                        {user.banned? (
                            <span className='text-red-500'>Banned</span>
                        ):(
                            <span className='text-green-500'>Active</span>
                        )}
                    </TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                        <ImpersonateUser userId={user.id} />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}

export default UsersTable