"use server"

import { auth } from "@repo/auth/better-auth/auth";
import db from "@repo/prisma-db/mongo-client";
import { headers } from "next/headers";

export async function GetTwitterUserDetails(){
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const user = await db.twitterUser.findFirst({
        where: {
            userId: session.user.id,
        },
    });
    return user;
}

export async function GetAllUsers(){
    try{
        const users = await db.twitterUser.findMany({
            orderBy: { createdAt: "desc" },
        });
        return users;
    }
    catch(error){
        console.log(error)
        return null;
    }
}

export async function CreateTwitterUser(){
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }

    if(session.user.image){
        await db.twitterUser.create({
            data: {
                userId: session.user.id,
                name: session.user.name,
                username: session.user.name,
                profileImage: session.user.image,
            },
        });
    }
    else{
        await db.twitterUser.create({
            data: {
                userId: session.user.id,
                name: session.user.name,
                username: session.user.name,
            },
        });
    }


}