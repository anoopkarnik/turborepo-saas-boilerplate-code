import { auth } from "@repo/auth/better-auth/auth"
import { NextResponse } from "next/server"
import db from "@repo/prisma-db/client"
import { headers } from "next/headers";

export async function POST(req: Request) {
    try{
        const body = await req.json()
        const session = await auth.api.getSession({
        headers: await headers(),
    });;
        const {src, name, description, instructions, seed, categoryId} = body

        if (!session.user) {
            return NextResponse.json("User not authenticated", {status: 401})
        }

        if (!src || !name || !description || !instructions || !seed || !categoryId) {
            return NextResponse.json("Missing required fields", {status: 400})
        }

        const companion = await db.companion.create({
            data: {
                src,
                name,
                description,
                instructions,
                seed,
                categoryId,
                userId: session.user.id,
                userName: session.user.name
            }
        })

        return NextResponse.json(companion)

    }catch(e){
        console.log("[COMPANION_POST", e)
        return NextResponse.json("error", {status: 500})
    }
}