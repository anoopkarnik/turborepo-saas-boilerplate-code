import { NextResponse } from "next/server";
import db from "@repo/prisma-db/mongo-client"

export async function GET(req: Request, {params} : {params: {userId: string}}) {
    try {
        const { userId } = params;
        if(!userId || typeof userId !== 'string'){
            throw new Error('Invalid userId');
        }
        const notifications = await db.twitterNotification.findMany({
            where: { userId },
            orderBy:{createdAt:'desc'}
        });

        await db.twitterUser.update({
            where: {id: userId },
            data: {
                hasNotification: false
            }
        });
        return NextResponse.json(notifications, { status: 200 });

    }catch(error){
        console.log(error)
        return NextResponse.json( { message: 'Failed to fetch notifications' }, 
            { status: 400 });
    }
}