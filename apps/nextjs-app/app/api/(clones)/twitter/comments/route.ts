import { NextResponse } from "next/server";
import db from "@repo/prisma-db/client";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const { userId, postId, body } = reqBody;


    if (!body || typeof body !== 'string') {
      return NextResponse.json({ message: 'Content is required' }, { status: 400 });
    }
    if (!postId || typeof postId !== 'string') {
      return NextResponse.json({ message: 'postId not provided or invalid' }, { status: 400 });
    }
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ message: 'userId not provided or invalid' }, { status: 400 });
    }

    const comment = await db.twitterComment.create({
      data: {
        body,
        postId,
        userId
      }
    });

    try {
      const post = await db.twitterPost.findUnique({
        where: { id: postId }
      });
      if (post?.userId) {
        await db.twitterNotification.create({
          data: {
            body: 'Someone replied to your tweet!',
            userId: post.userId,
          }
        });
        await db.twitterUser.update({
          where: { id: post.userId },
          data: {
            hasNotification: true
          }
        });
      }
    } catch (error) {
      console.log(error);
    }

    return NextResponse.json(comment, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Failed to create comment', error }, { status: 400 });
  }
}
