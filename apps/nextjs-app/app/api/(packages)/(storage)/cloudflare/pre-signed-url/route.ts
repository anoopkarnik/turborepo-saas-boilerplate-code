import { auth } from "@repo/auth/better-auth/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


export async function POST(request: Request) {
    try {
        const { key, bucket } = await request.json();
        // Get the current session
        const session = await auth.api.getSession({
            headers: await headers(),
        });;
    
        // Ensure the user is authenticated
        if (!session?.user?.id) {
          return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}`);
        }
        
        const client = new S3Client({
            region: "auto",
            endpoint: process.env.MEETINGS_ENDPOINT!,
            credentials: {
              accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
              secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
            },
          });

        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: key
          });
          const url = await getSignedUrl(client, command, {
            expiresIn: 60 * 5, // 5 minutes
          });
        
        // Redirect to the home page
        return NextResponse.json({ url });
      } catch (error) {
        console.error("Error modifying user access:", error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}`);
      }
    }
