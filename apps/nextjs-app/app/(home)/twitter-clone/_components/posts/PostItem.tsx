import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react'
import useCurrentUser from '../../_hooks/useCurrentUser';
import { formatDistanceToNow } from 'date-fns';
import Avatar from '../Avatar';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import useLike from '../../_hooks/useLike';
import usePost from '../../_hooks/usePost';
import { ClipLoader } from 'react-spinners';

interface PostItemProps {
    userId?: string;
    postId: string
}

const PostItem = ({userId,postId}:PostItemProps) => {
    const router = useRouter();

    const {data: currentUser,refetch} = useCurrentUser();

    const {data, refetch: refetchPost, isLoading} = usePost(postId)

    const {hasLiked, toggleLiked} = useLike({postId,userId:currentUser?.id});

    const goToUser = useCallback((event:any) =>{
        event?.stopPropagation();
        router.push(`/twitter-clone/users/${data?.user?.id}`);
    },[router, data?.user?.id]);

    const goToPost = useCallback(() =>{
        router.push(`/twitter-clone/posts/${postId}`);
    },[router, postId])

    const onLike = useCallback((event: any) =>{
        event?.stopPropagation();
        toggleLiked();
        refetchPost()

    },[toggleLiked,refetch]);

    const createdAt = useMemo(() =>{
        if(!data?.createdAt) return null;
        return formatDistanceToNow(new Date(data.createdAt), {addSuffix: true});
    },[data?.createdAt]);


    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

    if(isLoading){
        return (
          <div className="flex justify-center items-center h-full">
            <ClipLoader color="lightgreen" size={80} />
          </div>
        )
      }
  return (
    <div onClick={goToPost} className='border-b-[1px] border-border p-5 cursor-pointer hover:bg-opacity-90 transition'>
        <div className=' flex items-start gap-4'>
            <Avatar user={data?.user} />
            <div>
                <div className='flex items-center gap-2'>
                    <p onClick={goToUser} className='text-foreground font-semibold cursor-pointer hover:underline'>
                        {data?.user.name}
                    </p>
                    <span onClick={goToUser} className='text-description cursor-pointer hover:underline hidden md:block'>
                        @{data?.user.username}
                    </span>
                    <span className='text-description'>
                        {createdAt}
                    </span>
                </div>
                <div className='text-foreground mt-1'>
                    {data?.body}
                </div>
                <div className='flex items-center mt-3 gap-10'>
                    <div className='flex items-center text-description gap-2 cursor-pointer transition hover:text-primary/50'>
                        <AiOutlineMessage size={20} />
                        <p>
                            {data?.comments?.length || 0}
                        </p>
                    </div>
                    <div onClick={onLike}
                    className='flex items-center text-description gap-2 cursor-pointer transition hover:text-destructive/50'>
                        <LikeIcon size={20} color={hasLiked ? 'red': ''}/>
                        <p>
                            {data?.likedIds?.length || 0}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostItem