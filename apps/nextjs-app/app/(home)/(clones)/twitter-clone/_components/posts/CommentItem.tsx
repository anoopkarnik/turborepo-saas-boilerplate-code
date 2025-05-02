
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react'
import Avatar from '../Avatar';

interface CommentItemProps {
    data: Record<string,any>;
}


const CommentItem = ({data}:CommentItemProps) => {

    const router = useRouter();

    const goToUser = useCallback((event:any) =>{
        event?.stopPropagation();
        router.push(`/twitter-clone/users/${data?.user?.id}`);
    },[router, data?.user?.id]);

    const createdAt = useMemo(() =>{
        if(!data?.createdAt) return null;
        return formatDistanceToNow(new Date(data.createdAt), {addSuffix: true});
    },[data?.createdAt]);
    
  return (
   <div className='border-b-[1px] border-border p-5 cursor-pointer hover:bg-opacity-90 transition'>
        <div className='flex items-start gap-3'>
            <Avatar user={data?.user} />
            <div>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold cursor-pointer hover:underline'
                        onClick={goToUser}>
                        {data.user.name}
                    </p>
                    <span className='text-description cursor-pointer hover:underline' onClick={goToUser}>
                        {`@${data.user.username}`}
                    </span>
                    <span className='text-description'>
                        {createdAt}
                    </span>
                </div>
                <div className='mt-1'>
                    {data.body}
                </div>
            </div>
        </div>
   </div>
  )
}

export default CommentItem