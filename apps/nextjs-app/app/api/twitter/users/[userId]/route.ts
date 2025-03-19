
import db from "@repo/prisma-db/mongo-client"
import { NextResponse } from "next/server";

export async function GET(req: Request, {params} : {params: {userId: string}}) {
    try{
        const {userId} =  params;
        if(!userId || typeof userId !== 'string'){
            throw new Error('Invalid userId');
        }
        const existingUser = await db.twitterUser.findUnique(
            {where:{id:userId}}
        );
        const followersCount = await db.twitterUser.count({
            where:{
                followingIds:{
                    has:userId
                }
            }
        })
        console.log('followersCount', followersCount)
        return NextResponse.json({...existingUser, followersCount}, { status: 200 });
    }catch(error){
        console.log(error)
        return NextResponse.json( { message: 'Failed to fetch follower details' }, { status: 400 });
    }
}