import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { symmetricDecrypt, symmetricEncrypt } from '../../../../lib/helper/encryption';
import { GetConnectionByUserIdAndConnection, updateConnectionDetails } from '@repo/connections/connections'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const notionConnection = await GetConnectionByUserIdAndConnection('Notion');
  if (!notionConnection) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/connections`);
  }
  const details = JSON.parse(notionConnection?.details);
  const clientId = symmetricDecrypt(details.clientId);
  const clientSecret = symmetricDecrypt(details.clientSecret);
   
  const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
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
      details.accessToken = symmetricEncrypt(response.data.access_token);
      await updateConnectionDetails(notionConnection.id, details);
      
    }
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/connections`);
}
