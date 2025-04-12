"use server"
import { auth } from "@repo/auth/better-auth/auth";
import db from "@repo/prisma-db/mongo-client";
import { pusherServer } from "../../../../lib/helper/pusher";
import { headers } from "next/headers";

export const createConversation = async (userId?: string, isGroup?: boolean, 
    members?: any, name?: string
) => {
    try {
        const session = await auth.api.getSession({
        headers: await headers(),
    });;
        if (!session?.user?.id) {
            throw new Error("User not authenticated");
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            throw new Error("Group conversation requires at least 2 members and a name");
        }

        const messengerUser = await db.messengerUser.findFirst({
            where: {
                userId: session.user.id,
            },
        });
        if (!messengerUser) {
            throw new Error("Messenger user not found");
        }

        if (isGroup) {
            const newConversation = await db.conversation.create({
                data: {
                    isGroup: true,
                    name: name,
                    users: {
                        connect: [
                            ...members.map((member:{value:string}) => ({ 
                                id: member.value
                            })),
                            { id: messengerUser.id }, // Add the current user
                        ]
                    },
                },
                include: {
                    users: true
                }
            });
            newConversation.users.forEach((user) =>{
                if(user.userId){
                    pusherServer.trigger(user.userId,  'conversation:new', newConversation)
                }
            })

            return newConversation;
        }
        if(userId){
            const existingConversations = await db.conversation.findMany({
                where: {
                    OR: [
                        {userIds: {equals: [messengerUser.id, userId]}},
                        {userIds: {equals: [userId,messengerUser.id]}}
                    ]
                }
            })
    
            const singleConversation = existingConversations[0];
    
            if (singleConversation) {
                return singleConversation;
            }
    
            const newConversation = await db.conversation.create({
                data: {
                    isGroup: false,
                    users: {
                        connect: [
                            { id: messengerUser.id},
                            { id: userId }
                        ]
                    }
                },
                include: {
                    users: true
                }
            })
            newConversation.users.forEach((user) =>{
                if(user.userId){
                    pusherServer.trigger(user.userId,  'conversation:new', newConversation)
                }
            })

            return newConversation;
        }



        return null
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getConversations = async () => {
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

        const conversations = await db.conversation.findMany({
            orderBy:{lastMessageAt: "desc"},
            where: {userIds: {has: messengerUser.id}},
            include: {users: true,messages:{include: {sender:true,seen:true}}}
        });

        return conversations;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getConversationById = async (conversationId: string) => {

    try {
        const conversation = await db.conversation.findFirst({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        })
        return conversation;
    }catch (error) {
        console.error(error);
        return null;
    }
}

export const makeConversationSeen = async (conversationId: string) => {

    try{
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

        const conversation = await db.conversation.findUnique({
            where: {
                id: conversationId
            },
            include:{
                users: true,
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        })
        if (!conversation) {
            throw new Error("Conversation not found");
        }

        const lastMessage = conversation.messages[conversation.messages.length - 1];

        if (!lastMessage) {
            throw new Error("No messages found in conversation");
        }

        const updatedMessage = await db.message.update({
            where: {
                id: lastMessage.id
            },
            data: {
                seen: {
                    connect: {
                        id: messengerUser.id
                    }
                }
            },
            include: {
                sender: true,
                seen: true
            }
        })

        await pusherServer.trigger(messengerUser.userId, 'conversation:update', {
            id: conversationId,
            messages: [updatedMessage]
        })

        if (lastMessage.seenIds.indexOf(messengerUser.id) === -1){
            return conversation
        }
        await pusherServer.trigger( conversationId,'message:update', updatedMessage)


        return updatedMessage;


    }catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteConversation = async (conversationId: string) => {
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

        const conversation = await db.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        })
        conversation?.users.forEach((user) =>{
            if(user.userId){
                pusherServer.trigger(user.userId,  'conversation:remove', conversation)
            }
        }
        )

        if (!conversation) {
            throw new Error("Conversation not found");
        }

        const deletedConversation = await db.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [messengerUser.id]
                }
            }
        })

        return deletedConversation;
    } catch (error) {
        console.error(error);
        return null;
    }
}