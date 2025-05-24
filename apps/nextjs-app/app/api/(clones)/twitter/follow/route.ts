import { NextResponse } from "next/server";
import db from "@repo/prisma-db/client";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const { userId, followingId, action } = reqBody;


    if (!userId || typeof userId !== 'string' ) {
      return NextResponse.json({ message: 'Invalid userId' }, { status: 400 });
    }
    if (!followingId || typeof followingId !== 'string') {
      return NextResponse.json({ message: 'Invalid followingId' }, { status: 400 });
    }

    // Make sure both users exist
    const user = await db.twitterUser.findUnique({ where: { id: userId } });
    const targetUser = await db.twitterUser.findUnique({ where: { id: followingId } });
    if (!user || !targetUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    console.log("my-user", user);
    console.log("target-user", targetUser);

    let updatedUser;
    if (action === 'follow') {
      updatedUser = await db.twitterUser.update({
        where: { id: userId },
        data: {
          following: { connect: { id: followingId } }
        }
      });
    } else if (action === 'unfollow') {
      updatedUser = await db.twitterUser.update({
        where: { id: userId },
        data: {
          following: { disconnect: { id: followingId } }
        }
      });
    } else {
      return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Failed to follow/unfollow user' }, { status: 400 });
  }
}
