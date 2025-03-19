interface AvatarProps {
    userId: string;
    isLarge?: boolean;
    hasBorder?: boolean;
}

import React, { useCallback } from 'react'
import useUser from '../_hooks/useUser';
import { useRouter } from 'next/navigation';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';

const Avatar = ({userId,isLarge,hasBorder}:AvatarProps) => {
    const router = useRouter();
    const {data: fetchedUser} = useUser(userId);
    const onClick = useCallback((e:any) => {
        e.stopPropagation();
        const url = `/twitter-clone/users/${userId}`;
        router.push(url);
    },[router,userId]);
  return (
    <div className={cn('rounded-full hover:opacity-90 transition cursor-pointer relative',
        hasBorder ? 'border-4 border-border' : '',
        isLarge ? 'w-32 h-32' : 'w-10 h-10',
    )}>
        <Image fill alt="Avatar" className='rounded-full' src={fetchedUser?.profileImage} onClick={onClick}  />
    </div>
  )
}

export default Avatar