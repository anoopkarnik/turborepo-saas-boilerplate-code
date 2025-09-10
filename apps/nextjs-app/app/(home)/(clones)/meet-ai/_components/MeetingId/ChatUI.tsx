import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query';
import type { Channel as StreamChannel } from 'stream-chat';
import {useCreateChatClient, Chat, Channel, MessageList, MessageInput, Thread, Window} from 'stream-chat-react';
import { useTRPC } from '@/trpc/client';

import "stream-chat-react/dist/css/v2/index.css"
import LoadingState from '../LoadingState';

interface Props {
    meetingId: string;
    meetingName: string;
    userId: string;
    userName: string;
    userImage: string;
}

const ChatUI = ({ meetingId, meetingName, userId, userName, userImage }: Props) => {
    const trpc = useTRPC();
    const { mutateAsync: generateChatToken } = useMutation(trpc.meetings.generateChatToken.mutationOptions());
    const [channel, setChannel] = useState<StreamChannel>();

    const client = useCreateChatClient({
        apiKey: process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY!,
        tokenOrProvider: generateChatToken,
        userData: {
            id: userId,
            name: userName,
            image: userImage
        }
    })

    useEffect(() => {
        if (!client) return;

        const channel = client.channel('messaging', meetingId, {
            members: [userId]
        });
        setChannel(channel);
        
    }, [client, meetingId, meetingName, userId]);

    if (!client || !channel) {
        return <LoadingState title="Loading Chat..." description="Please wait while we load the chat..." />
    }
  return (
    <div className='rounded-lg border overflow-hidden'>
        <Chat client={client} theme="str-chat__theme-dark" >
            <Channel channel={channel} >
                <Window>
                    <div className='flex-1 overflow-y-auto max-h-[calc(100vh-23rem)] border-b'>
                        <MessageList />
                    </div>
                    <MessageInput focus />
                </Window>
                <Thread />
            </Channel>
        </Chat>
    </div>
  )
}

export default ChatUI