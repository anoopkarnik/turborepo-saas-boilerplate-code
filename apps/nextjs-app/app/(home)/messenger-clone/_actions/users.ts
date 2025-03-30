"use server"

import { auth } from "@repo/auth/next-auth/auth";
import db from "@repo/prisma-db/mongo-client";
import { pusherServer } from "../../../../lib/helper/pusher";

export async function GetMessengerUserDetails(){
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const user = await db.messengerUser.findFirst({
        where: {
            userId: session.user.id,
        },
    });
    return user;
}

export async function GetAllUsers(){
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    try{
        const users = await db.messengerUser.findMany({
            orderBy: { createdAt: "desc" },
            where: {
                userId: {
                    not: session.user.id
                }
            },
        });
        return users;
    }
    catch(error){
        console.log(error)
        return []
    }
}

export async function CreateMessengerUser(){
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }

    if(session.user.image){
        await db.messengerUser.create({
            data: {
                userId: session.user.id,
                name: session.user.name,
                profileImage: session.user.image,
            },
        });
    }
    else{
        await db.messengerUser.create({
            data: {
                userId: session.user.id,
                name: session.user.name
            },
        });
    }


}

export async function userOnlineHandler(socketId: string, channelName: string) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }

    const res = pusherServer.authorizeChannel(socketId, channelName, {
        user_id: session.user.id,
    });
    return res;
}