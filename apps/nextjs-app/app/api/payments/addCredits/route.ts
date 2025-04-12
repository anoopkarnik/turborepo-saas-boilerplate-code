import { NextResponse } from "next/server";
import { auth } from  "@repo/auth/better-auth/auth";
import db from "@repo/prisma-db/client";
import { headers } from "next/headers";

export async function POST(request: Request) {
    try {
        // Get the current session
        const {quantity} = await request.json();
        const session = await auth.api.getSession({
        headers: await headers(),
    });;
    
        // Ensure the user is authenticated
        if (!session?.user?.id) {
          return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}`);
        }
    
        const userId = session.user.id;
    
        await db.user.update({
            where: {id: userId},
            data: {
                creditsTotal: {
                    increment: quantity
                }
            }
        });

        
        // Redirect to the home page
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/home`);
      } catch (error) {
        console.error("Error modifying user access:", error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}`);
      }
    }
