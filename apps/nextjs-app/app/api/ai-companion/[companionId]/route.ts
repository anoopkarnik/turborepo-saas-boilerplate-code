import { auth } from "@repo/auth/next-auth/auth"
import { NextResponse } from "next/server"
import db from "@repo/prisma-db/client"

export async function PATCH(req: Request,{params}: {params: {companionId: string}}) {
    try{
        const body = await req.json()
        const session = await auth();
        const {src, name, description, instructions, seed, categoryId} = body

        if (!params.companionId) {
            return NextResponse.json("Companion not found", {status: 404})
        }

        if (!session.user) {
            return NextResponse.json("User not authenticated", {status: 401})
        }

        if (!src || !name || !description || !instructions || !seed || !categoryId) {
            return NextResponse.json("Missing required fields", {status: 400})
        }

        const companion = await db.companion.update({
            where: {
                id: params.companionId
            },
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
        console.log("[COMPANION_PATCH", e)
        return NextResponse.json("error", {status: 500})
    }
}

export async function DELETE( request: Request, {params}: {params: {companionId: string}}) {
    try{
        const session = await auth();

        if (!params.companionId) {
            return NextResponse.json("Companion not found", {status: 404})
        }

        if (!session.user) {
            return NextResponse.json("User not authenticated", {status: 401})
        }

        const companion = await db.companion.delete({
            where: {
                id: params.companionId,
                userId: session.user.id
            }
        })

        return NextResponse.json(companion)

    }catch(e){
        console.log("[COMPANION_DELETE", e)
        return NextResponse.json("error", {status: 500})
    }
}