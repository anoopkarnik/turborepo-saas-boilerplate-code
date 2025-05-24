import { NextResponse } from "next/server";
import db from "@repo/prisma-db/client"

export async function GET(req: Request) {
    try{
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        let posts;
        if(userId){

            posts = await db.twitterPost.findMany({
                where:{userId:userId},
                include:{user:true, comments:true},
                orderBy:{createdAt:'desc'}}    
            );
        }
        else{
            posts = await db.twitterPost.findMany({
                include:{user:true, comments:true},
                orderBy:{createdAt:'desc'}}    
            );
        }
        return NextResponse.json(posts, { status: 200 });

    }catch(error){
        console.log(error)
        return NextResponse.json( { message: 'Failed to fetch users' }, { status: 400 });
    }
}

export async function POST(req: Request){
    try{
        const reqBody= await req.json()
        const { userId, body } = reqBody
        if (!body){
            return NextResponse.json( { message: 'Content is required' }, { status: 400 });
        }

        const newPost = await db.twitterPost.create({
            data: {
                body,
                userId
            }
        })

        return NextResponse.json(newPost, { status: 200 });
    }catch(error){
        console.log(error)
        return NextResponse.json( { message: 'Failed to create post' }, { status: 400 });
    }
}