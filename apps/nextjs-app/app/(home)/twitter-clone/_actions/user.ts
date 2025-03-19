"use server"

import { auth } from "@repo/auth/next-auth/auth";
import db from "@repo/prisma-db/mongo-client";

export async function GetTwitterUserDetails(){
    const session = await auth();
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
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    await db.twitterUser.create({
        data: {
            userId: session.user.id,
            name: session.user.name,
            username: "@"+session.user.name,
            profileImage: session.user.image,
        },
    });

}