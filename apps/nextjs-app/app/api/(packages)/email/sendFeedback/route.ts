import { sendSupportEmail } from '@repo/email/resend/index';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { subject, message } = await req.json();

    const response = await sendSupportEmail(subject,message)
    console.log(response)

    return NextResponse.json({ success: true, message: "Feedback received!" });
  } catch (error) {
    console.error("Error processing feedback:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
