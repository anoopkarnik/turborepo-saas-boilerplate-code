interface AvatarProps {
    user: any;
    isLarge?: boolean;
    hasBorder?: boolean;
}

import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';

const Avatar = ({user,isLarge,hasBorder}:AvatarProps) => {
    const router = useRouter();
    const onClick = useCallback((e:any) => {
        e.stopPropagation();
        const url = `/twitter-clone/users/${user.id}`;
        router.push(url);
    },[router,user]);
  return (
    <div className={cn('rounded-full hover:opacity-90 transition cursor-pointer relative',
        hasBorder ? 'border-4 border-border' : '',
        isLarge ? 'w-32 h-32' : 'w-10 h-10',
    )}>
        
        <Image fill alt="Avatar" className='rounded-full object-cover' src={user?.profileImage || '/buddha.jpeg'} onClick={onClick}  />
    
    </div>
  )
}

export default Avatar