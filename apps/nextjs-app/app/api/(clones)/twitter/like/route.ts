import { NextResponse } from "next/server";
import db from "@repo/prisma-db/client"

export async function POST(req: Request){
    try{
        const reqBody= await req.json()
        const { userId,postId, action } = reqBody

        if (!postId || typeof postId !== 'string'){
            return NextResponse.json( { message: 'Invalid postId' }, { status: 400 });
        }

        const post = await db.twitterPost.findUnique({
            where:{id:postId}
        })
        if(!post){
            return NextResponse.json( { message: 'Invalid' }, { status: 401 });
        }

        let updatedLikedIds = [...post.likedIds|| []]
        if (action === 'like'){
            updatedLikedIds.push(userId)
            try{
                const post = await db.twitterPost.findUnique({
                    where:{id:postId}
                })
                if(post?.userId){
                    await db.twitterNotification.create({
                        data: {
                            body: 'Someone liked your tweet!',
                            userId: post.userId,
                        }

                    })
                    await db.twitterUser.update({
                        where: { id: post.userId },
                        data: {
                            hasNotification: true
                        }
                    })
                }
            }catch(error){
                console.log(error)
            }
        }else{
            updatedLikedIds= updatedLikedIds.filter(id => id !== userId)
        }
        const updatedLikedPosts = await db.twitterPost.update({
            where: { id: postId },
            data: {
                likedIds: updatedLikedIds
            }
        })

        return NextResponse.json(updatedLikedPosts, { status: 200 });


    } catch(error){
        console.log(error)
        return NextResponse.json( { message: 'Failed to follow user' }, { status: 400 });
    }
}