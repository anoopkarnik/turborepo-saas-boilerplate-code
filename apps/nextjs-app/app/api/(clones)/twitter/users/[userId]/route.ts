import db from "@repo/prisma-db/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params;

    // Get the user
    const existingUser = await db.twitterUser.findUnique({
      where: { id: userId },
      include: {following: true,},
    });

    if (!existingUser) {
      throw new Error("User not found");
    }
    const { following, ...userWithoutFollowing } = existingUser;
    const followingIds = Array.isArray(following) ? following.map(f => f.id) : [];
    const userWithFollowing = {
        ...userWithoutFollowing, 
        followingIds,
    };


    // Count followers (users whose 'following' includes this user)
    const followersCount = await db.twitterUser.count({
      where: {
        following: {
          some: {
            id: userId
          }
        }
      }
    });

    return NextResponse.json({ ...userWithFollowing, followersCount }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Failed to fetch follower details' }, { status: 400 });
  }
}
