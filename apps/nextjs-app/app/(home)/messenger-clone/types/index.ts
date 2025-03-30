import {Conversation, Message, MessengerUser} from "@prisma-mongo/prisma/client"

export type FullMessageType = Message & {
    sender: MessengerUser,
    seen: MessengerUser[]
}

export type FullConversationType = Conversation & {
    users: MessengerUser[],
    messages: FullMessageType[]
}