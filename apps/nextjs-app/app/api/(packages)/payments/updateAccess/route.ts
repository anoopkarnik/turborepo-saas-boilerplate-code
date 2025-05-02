import { modifyAccess } from "@repo/prisma-db/repo/user";
import { NextResponse } from "next/server";
import { auth } from  "@repo/auth/better-auth/auth";
import { headers } from "next/headers";

export async function GET() {
    try {
        // Get the current session
        const session = await auth.api.getSession({
        headers: await headers(),
    });;
    
        // Ensure the user is authenticated
        if (!session?.user?.id) {
          return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}`);
        }
    
        const userId = session.user.id;
    
        // Modify the user's access
        await modifyAccess(userId, "PRO");
    
        // Redirect to the home page
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/home`);
      } catch (error) {
        console.error("Error modifying user access:", error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}`);
      }
    }
