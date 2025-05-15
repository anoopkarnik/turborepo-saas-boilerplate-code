import { NextResponse } from "next/server";
import db from "@repo/prisma-db/mongo-client"
import { auth } from "@repo/auth/better-auth/auth";
import { headers } from "next/headers";

export async function GET(){
    try{
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session?.user?.id) {
            return NextResponse.json( { message: 'User not authenticated' }, { status: 401 });
        }
        let users = await db.twitterUser.findMany(
            {orderBy:{createdAt:'desc'}}
        );
        users = users.filter((user) => user.userId !== session.user.id);

        return NextResponse.json(users, { status: 200 });
    }catch(error){
        console.log(error)
        return NextResponse.json( { message: 'Failed to fetch users' }, { status: 400 });
    }
}