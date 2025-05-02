
import { useCallback, useMemo } from 'react';
import useCurrentUser from './useCurrentUser'
import useUser from './useUser';
import { useToast } from '@repo/ui/hooks/use-toast';
import axios from 'axios';

const useFollow = (userId:string ) => {
    const {data:currentUser, refetch:fetchCurrentUser} = useCurrentUser();
    const {refetch: fetchOtherUser} = useUser(userId);
    const isFollowing = useMemo(()=> {
        const list = currentUser?.followingIds || [];
        return list.includes(userId);
    },[userId,currentUser?.followingIds]);

    const {toast} = useToast();

    const toggleFollow = useCallback(async()=>{
        try{
            let request;
            if(isFollowing){
                request = () => axios.post(`/api/twitter/follow`,{userId:currentUser.id ,followindId:userId,action:'unfollow'});
            }else{
                request = () => axios.post(`/api/twitter/follow`,{userId:currentUser.id,followingId:userId,action:'follow'});
            }
            await request();
            fetchCurrentUser();
            fetchOtherUser();
            toast({
                title: 'Success',
                description: `User ${isFollowing ? 'unfollowed' : 'followed'} successfully`,
                variant: 'success'
            })

        }catch(error){
            toast({
                title: 'Error',
                description: error as string,
                variant: 'destructive'
            })
        }
    },[currentUser,isFollowing, userId, fetchCurrentUser, fetchOtherUser, toast])

    return {
        isFollowing,
        toggleFollow
    }

}

export default useFollow;