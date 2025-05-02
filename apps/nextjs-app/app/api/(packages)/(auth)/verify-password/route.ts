
import { NextResponse } from 'next/server';

export async function POST(req:Request) {
  const { password } =  await req.json();
  if (password === process.env.SETTINGS_PASSWORD) {
    return NextResponse.json({ success: true });
   
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
