import {Conversation, MessengerMessage, MessengerUser} from "@prisma/client"

export type FullMessageType = MessengerMessage & {
    sender: MessengerUser,
    seen: MessengerUser[]
}

export type FullConversationType = Conversation & {
    users: MessengerUser[],
    messages: FullMessageType[]
}