import { NextResponse } from "next/server";
import db from "@repo/prisma-db/mongo-client"

export async function GET(){
    try{
        const users = await db.twitterUser.findMany(
            {orderBy:{createdAt:'desc'}}
        );
        return NextResponse.json(users, { status: 200 });
    }catch(error){
        console.log(error)
        return NextResponse.json( { message: 'Failed to fetch users' }, { status: 400 });
    }
}