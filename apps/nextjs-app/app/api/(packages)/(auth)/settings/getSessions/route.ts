import { getRecentSessions} from "@repo/prisma-db/repo/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { userId } = await request.json();
    const sessions = await getRecentSessions(userId);
    return NextResponse.json({ sessions});

}