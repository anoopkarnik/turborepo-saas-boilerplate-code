import { auth } from "@repo/auth/better-auth/auth";
import { createNotification } from "@repo/prisma-db/repo/notification";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {userId, message, type,href} = await request.json();
    let currentUserId = userId;
    if(!currentUserId){
        const session = await auth.api.getSession({
        headers: await headers(),
    });;
        currentUserId = session.user.id;
    }
    
    const notification = await createNotification({userId,message,type,href})
    return NextResponse.json({ notification });
}