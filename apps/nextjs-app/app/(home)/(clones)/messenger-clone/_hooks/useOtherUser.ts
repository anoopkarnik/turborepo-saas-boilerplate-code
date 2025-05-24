import { useSession } from "@repo/auth/better-auth/auth-client";
import { FullConversationType } from "../types";
import { MessengerUser } from "@prisma/client";
import { useMemo } from "react";


const useOtherUser = (conversation: FullConversationType | {users: MessengerUser[]})=>{

    const session = useSession()

    const otherUser = useMemo(()=>{
        const currentUserId = session?.data?.user?.id
        const otherUser = conversation.users.filter((user)=>user.userId !== currentUserId)
        return otherUser[0]
    },[session?.data?.user?.id,conversation.users])

    return otherUser 
} 

export default useOtherUser