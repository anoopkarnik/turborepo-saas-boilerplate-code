"use server"
import { auth } from "@repo/auth/better-auth/auth";
import db from "@repo/prisma-db/mongo-client";
import { pusherServer } from "../../../../lib/helper/pusher";
import { headers } from "next/headers";

export const getMessages = async (conversationId: string) => {
    try {
        const messages = await db.message.findMany({
            where: {
                conversationId: conversationId
            },
            include: {
                sender: true,
                seen: true
            },
            orderBy: {
                createdAt: "asc"
            }
        })
        return messages;
    }catch (error) {
        console.error(error);
        return null;
    }
}

export const createMessage = async ({conversationId,message,image}:{
    conversationId: string,
    message?: string,
    image?: string
}) => {

    try {
        const session = await auth.api.getSession({
        headers: await headers(),
    });;
        if (!session?.user?.id) {
            throw new Error("User not authenticated");
        }

        const messengerUser = await db.messengerUser.findFirst({
            where: {
                userId: session.user.id,
            },
        });
        if (!messengerUser) {
            throw new Error("Messenger user not found");
        }

        const newMessage = await db.message.create({
            data: {
                body: message as string,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: messengerUser.id
                    }
                },
                seen: {
                    connect: {
                        id: messengerUser.id
                    }
                },
                image: image

            },
            include: {
                sender: true,
                seen: true
            }
        })

        const updatedConversation = await db.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        })

        await pusherServer.trigger(conversationId, "messages:new", newMessage);

        const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];
        updatedConversation.users.forEach((user) => {
            pusherServer.trigger(user.id, "conversation:update", {
                id: conversationId,
                messages: [lastMessage],
            }
            );
        });

        return newMessage;
    } catch (error) {
        console.error(error);
        return null;
    }
}
