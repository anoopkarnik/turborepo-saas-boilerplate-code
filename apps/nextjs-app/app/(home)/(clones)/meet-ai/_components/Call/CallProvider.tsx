"use client"

interface Props {
    meetingId: string;
    meetingName: string;
}

import { authClient } from '@repo/auth/better-auth/auth-client';
import { LoaderIcon } from 'lucide-react';
import React from 'react'
import CallConnect from './CallConnect';
import { generateAvatarUri } from '../../_utils/avatar';

const CallProvider = ({ meetingId, meetingName }: Props) => {

    const { data, isPending } = authClient.useSession();

    if (!data || isPending){
        return (
            <div className='flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar'>
                <LoaderIcon className='size-6 animate-spin text-white'/>

            </div>
        )
    }
  return (
    <CallConnect meetingId={meetingId} meetingName={meetingName} 
    userId={data.user.id} userName={data.user.name || 'No Name'} 
    userImage={data.user.image ?? generateAvatarUri({seed: data.user.name, variant: "initials"})} />
  )
}

export default CallProvider