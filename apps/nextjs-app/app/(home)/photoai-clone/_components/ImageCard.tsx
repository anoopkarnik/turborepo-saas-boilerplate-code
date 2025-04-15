import React from 'react'
import Image from 'next/image'
import { Skeleton } from '@repo/ui/molecules/shadcn/skeleton';

export interface TImage {
    id: string;
    status: string;
    imageUrl: string;
}

const ImageCard = (props: TImage) => {
  return (
     <div className='border hover:border-red-300 hover:border-1 mx-auto max-w-[300px] p-4 rounded-md'>
        {props.status === "Generated" ?
            <Image src={props.imageUrl} alt='pack image' width={200} height={300}/>:
            <ImageCardSkeleton />
        }
    </div>
  )
}

export function ImageCardSkeleton() {
    return (
        <div className='rounded-xl border-2 max-w-[300px] p-2 cursor-pointer w-full'>
            <div className='flex p-4 gap-4'>
                <Skeleton className='rounded h-40 w-[200px]' />
            </div>
        </div>
    )
}

export default ImageCard