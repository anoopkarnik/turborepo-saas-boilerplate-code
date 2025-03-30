// app/api/pusher/auth/route.ts

import { auth } from '@repo/auth/next-auth/auth'
import { NextRequest, NextResponse } from 'next/server'
import { pusherServer } from '../../../lib/helper/pusher'
import qs from 'querystring' // 👈 needed to parse the form data

export async function POST(req: NextRequest) {
  const rawBody = await req.text(); // 👈 read raw body
  const { socket_id, channel_name } = qs.parse(rawBody); // 👈 parse it

  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const authResponse = pusherServer.authorizeChannel(
    socket_id as string,
    channel_name as string,
    {
      user_id: session.user.id,
    }
  );

  return NextResponse.json(authResponse);
}
