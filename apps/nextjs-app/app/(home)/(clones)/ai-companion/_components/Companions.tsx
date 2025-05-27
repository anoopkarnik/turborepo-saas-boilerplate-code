import React from 'react'
import { Companion } from '@prisma/client'
import Image from 'next/image';
import { Card, CardFooter, CardHeader } from '@repo/ui/molecules/shadcn/card';
import { MessagesSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CompanionsProps {
    data: (Companion & {
        _count: {
            messages: number
        }
    })[];
}

const Companions = ({data}:CompanionsProps) => {

    const router = useRouter()

    if (data.length === 0) {
        return (
            <div className='pt-10 flex flex-col items-center justify-center space-y-3'>
                <div className='relative w-60 h-60'>
                    <h3 className='text-xl text-center text-primary'>No Companions found</h3>
                    <p className='text-description text-center'>
                        No companions found with these filters. Create a companion to get started</p>
                </div>
            </div>
        )
    }
  return (
    <div className='flex flex-wrap items-center justify-start gap-2 pb-10'>
        {data.map((companion) => (
            <Card key={companion.id} onClick={()=> router.push(`/ai-companion/chat/${companion.id}`)}
            className='bg-sidebar rounded-xl cursor-pointer
            hover:opacity-75 transition border-0 '>
                <CardHeader className='flex flex-col items-center'>
                    <div className='relative w-32 h-32'>
                        <Image 
                            src={companion.src}
                            alt={companion.name}
                            layout='fill'
                            className='rounded-xl object-cover'
                        />
                    </div>
                    <p className='font-bold'>
                        {companion.name}
                    </p>
                    <p className='text-description'>
                        {companion.description}
                    </p>
                </CardHeader>
                <CardFooter className='flex items-center justify-between text-description'>
                    <p className='lowercase'>
                        @{companion.userName}
                    </p>
                    <div className='flex items-center'>
                        <MessagesSquare className='w-3 h-3 mr-1'/>
                        {companion._count.messages}
                    </div>
                </CardFooter>
            </Card>
        ))}

    </div>
  )
}

export default Companions