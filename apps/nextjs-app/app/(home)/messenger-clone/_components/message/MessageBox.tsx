"use client"
import React, { useEffect } from 'react'
import { FullMessageType } from '../../types'
import { useSession } from '@repo/auth/better-auth/auth-client'
import { cn } from '@repo/ui/lib/utils'
import Avatar from '../common/Avatar'
import { format } from 'date-fns'
import Image from 'next/image'

interface MessageBoxProps {
    data: FullMessageType,
    isLast?: boolean,
}

const MessageBox = ({data,isLast}:MessageBoxProps) => {
    const session = useSession()

    const isOwn = session?.data?.user?.id === data.sender.userId
    const [seenList, setSeenList] = React.useState<string[]>([])

    useEffect(() => {
        console.log('seenList1', data.seen)
        const seenList = (data.seen || [])
        .filter((user) => user.userId !== data.sender.userId)
        .map((user) => user.name)
        console.log('seenList2', seenList)
        setSeenList(seenList)
    }, [data.seen, data.sender.userId])


    const container = cn('flex gap-3 p-4', isOwn ? 'justify-end' : 'justify-start')
    const avatar = cn( isOwn && 'order-2' )
    const body = cn('flex flex-col gap-2', isOwn ? 'items-end' : 'items-start')
    const message = cn('text-sm w-fit overflow-hidden', 
        isOwn ? 'bg-primary/50' : 'bg-sidebar', 
        data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3',
   )


return (
    <div className={container}>
        <div className={avatar}>
            <Avatar user={data.sender} />
        </div>
        <div className={body}>
            <div className='flex items-center gap-1'>
                <div className='text-description'>
                    {data.sender.name}
                </div>
                <div className='text-xs text-description'>
                    {format(new Date(data.createdAt), 'p')}
                </div>
            </div>
            <div className={message}>
                {data.image ? (
                    <Image alt="image" height="288" width="388"
                    src={data.image} className='object-cver cursor-pointer hover:scale-110
                    transition translate'/>
                ) : (
                    <div>
                        {data.body}
                    </div>
                )}
                
            </div>
            {isLast && isOwn && seenList.length > 0 &&  (
                <div className='text-[10px] text-description'>
                    {`Seen by ${seenList.join(', ')}`}
                </div>
            )}
        </div>
    </div>
  )
}

export default MessageBox