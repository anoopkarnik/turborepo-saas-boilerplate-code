import { NextResponse } from "next/server";
import db from "@repo/prisma-db/mongo-client"
import { auth } from "@repo/auth/next-auth/auth";

export async function PATCH(req: Request){
    try{
        const session = await auth()
        if(!session?.user){
            return NextResponse.json( { message: 'Unauthorized' }, { status: 401 });
        }
        const body = await req.json()
        const { name, username, bio, profileImage, coverImage} = body
        if (!name || !username){
            return NextResponse.json( { message: 'Name and username are required' }, { status: 400 });
        }

        const updatedUser = await db.twitterUser.update({
            where: { userId: session.user.id },
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage
            }
        })


        return NextResponse.json(updatedUser, { status: 200 });
    }catch(error){
        console.log(error)
        return NextResponse.json( { message: 'Failed to edit user' }, { status: 400 });
    }
}