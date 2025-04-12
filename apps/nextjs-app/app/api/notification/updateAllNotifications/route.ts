import { auth } from "@repo/auth/better-auth/auth";
import { markAllNotificationsAsRead} from "@repo/prisma-db/repo/notification";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session.user.id;
    
    await markAllNotificationsAsRead(userId)
    return NextResponse.json({  });
}