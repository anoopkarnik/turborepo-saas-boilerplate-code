import { NextResponse } from "next/server";
import db from "@repo/prisma-db/mongo-client"

export async function POST(req: Request){
    try{
        const reqBody= await req.json()
        const { userId,followingId, action } = reqBody
        if (!userId || typeof userId !== 'string'){
            return NextResponse.json( { message: 'Invalid userId' }, { status: 400 });
        }
        const user = await db.twitterUser.findFirst({
            where:{id:userId}
        })
        if(!user){
            return NextResponse.json( { message: 'Invalid' }, { status: 401 });
        }
        let updatedFollowingIds = [...user.followingIds || []]
        if (action === 'follow'){
            updatedFollowingIds.push(followingId)
        }else{
            updatedFollowingIds = updatedFollowingIds.filter(id => id === followingId)
        }
        const updatedUser = await db.twitterUser.update({
            where: { id: userId },
            data: {
                followingIds: updatedFollowingIds
            }
        })
        return NextResponse.json(updatedUser, { status: 200 });


    } catch(error){
        console.log(error)
        return NextResponse.json( { message: 'Failed to follow user' }, { status: 400 });
    }
}