import { NextResponse } from "next/server";
import db from "@repo/prisma-db/client"

export async function GET(req: Request, {params} : {params: {postId: number}}) {

    try {
        const { postId } = params;
        if(!postId || typeof postId !== 'string'){
            throw new Error('Invalid postId');
        }
        // fetch post details

        const post = await db.twitterPost.findUnique({
            where: { id: postId },
            include:{user:true, comments:{include:{user:true},orderBy:{createdAt:'desc'}}}
        });

        if(!post){
            return NextResponse.json( { message: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json(post, { status: 200 });


    }catch(error){
        console.log(error)
        return NextResponse.json( { message: 'Failed to fetch post details' }, { status: 400 });
    }
    return NextResponse.json({ message: 'This is the GET method for /api/twitter/posts/[postId]' }, { status: 200 });
}
