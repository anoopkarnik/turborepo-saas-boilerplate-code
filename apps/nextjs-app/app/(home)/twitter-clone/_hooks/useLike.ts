
import { useCallback, useMemo } from 'react';
import useCurrentUser from './useCurrentUser'
import useUser from './useUser';
import { useToast } from '@repo/ui/hooks/use-toast';
import axios from 'axios';
import usePost from './usePost';
import usePosts from './usePosts';

const useLike= ({postId, userId}:{postId:string, userId:string} ) => {
    const {data:currentUser, refetch:fetchCurrentUser} = useCurrentUser();
    const {data: fetchedPost, refetch: fetchPost} = usePost(postId);
    const {refetch: fetchPosts} = usePosts(userId);


    const hasLiked = useMemo(()=> {
        const list = fetchedPost?.likedIds || [];
        return list.includes(currentUser?.id);
    },[fetchedPost?.likedIds,currentUser?.id]);

    const {toast} = useToast();

    const toggleLiked = useCallback(async()=>{
        try{
            let request;
            if(hasLiked){
                request = () => axios.post(`/api/twitter/like`,{userId:currentUser.id ,postId,action:'unlike'});
            }else{
                request = () => axios.post(`/api/twitter/like`,{userId:currentUser.id,postId,action:'like'});
            }
            await request();
            fetchPost();
            fetchPosts();
            fetchCurrentUser();
        }catch(error){
            toast({
                title: 'Error',
                description: error as string,
                variant: 'destructive'
            })
        }
    },[currentUser,hasLiked, userId, fetchPost,fetchPosts, toast])

    return {
        hasLiked,
        toggleLiked
    }

}

export default useLike;