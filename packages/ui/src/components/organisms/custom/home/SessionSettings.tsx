"use client"
import React, { useEffect, useState } from 'react'
import { authClient, useSession } from '@repo/auth/better-auth/auth-client'
import SettingsHeading from '../../../molecules/custom/v1/SettingsHeading'
import dayjs from 'dayjs';
import { Button } from '../../../atoms/shadcn/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../molecules/shadcn/table';

const SessionSettings = () => {
    const [sessions, setSessions] = useState<any[]>([])
    const title = 'Sessions'
    const description = 'Manage your active sessions'
    useEffect(()=>{
        const getSessions = async () =>{
            const {error, data:sessions} = await authClient.listSessions()          
            const modifiedSessions = sessions?.map((session:any) => {  
                const formattedCreatedDate = dayjs(session.createdAt).format('DD MMM YYYY, hh:mm A');
                const formattedUpdatedDate = dayjs(session.updatedAt).format('DD MMM YYYY, hh:mm A'); 
                return {
                    ...session,
                    createdAt: formattedCreatedDate,
                    updatedAt: formattedUpdatedDate
                }
            })
            console.log(modifiedSessions)
            setSessions(modifiedSessions);
        }
        getSessions();
    },[])
  return (
    <SettingsHeading title={title} description={description}>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">Device</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {sessions.map((session) => (
                <TableRow key={session.id} className={session.isCurrent ? "bg-muted" : ""}>
                    <TableCell>
                    <div className="flex flex-col">
                    <span className="font-medium">{session.userAgent?.split(' ')[0] || ''}</span>
                        <span className="font-medium">{session.userAgent?.split(' ')[2] || 'Unknown'}</span>
                        <span className="text-xs text-muted-foreground">{session.ipAddress ?? 'IP unknown'}</span>
                    </div>
                    </TableCell>
                    <TableCell>{session.updatedAt}</TableCell>
                    <TableCell>{session.createdAt}</TableCell>
                    <TableCell>
                    {!session.isCurrent && (
                        <Button
                        variant="destructive"
                        size="sm"
                        onClick={async () => {
                            await authClient.revokeSession({ token: session.token });
                            setSessions((prev) => prev.filter((s) => s.id !== session.id));
                        }}
                        >
                        Revoke
                        </Button>
                    )}
                    </TableCell>
                </TableRow>
                ))}

            </TableBody>
        </Table>
    </SettingsHeading>
  )
}

export default SessionSettings