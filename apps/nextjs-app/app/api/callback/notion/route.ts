import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { auth } from '@repo/next-auth/auth';
import { createConnection } from '@repo/prisma-db/repo/connection';

export async function GET(req: NextRequest) {
    const session = await auth();
  const code = req.nextUrl.searchParams.get('code');
  const encoded = Buffer.from(
    `${process.env.NEXT_PUBLIC_NOTION_CLIENT_ID}:${process.env.NEXT_PUBLIC_NOTION_CLIENT_SECRET}`
  ).toString('base64');
  if (code) {
    const response = await axios('https://api.notion.com/v1/oauth/token', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Basic ${encoded}`,
        'Notion-Version': '2022-06-28',
      },
      data: JSON.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.NEXT_PUBLIC_URL + '/api/callback/notion',
      }),
    });
    if (response) {
      const notion = new Client({
        auth: response.data.access_token,
      });
      const databasesPages = await notion.search({
        filter: {
          value: 'database',
          property: 'object',
        },
        sort: {
          direction: 'ascending',
          timestamp: 'last_edited_time',
        },
      });
      const databaseId = databasesPages?.results?.length
        ? databasesPages?.results[0]?.id
        : '';
      
      await createConnection({
        name: 'New Notion Connection',
        type: 'Notion',
        userId: session.user.id,
        details: {
          database_id: databaseId,
          token: response.data.access_token,
          workspace_name: response.data.workspace_name,
          workspace_icon: response.data.workspace_icon,
          workspace_id: response.data.workspace_id,
        },
      });
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/home`
      );
    }
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/home`);
}
