"use server"

import {createContact} from "@repo/email/resend/index"

export const createContactAction = async (email:string) => {
    // add to contact list
    try{
        await createContact(email)
        return {"success": "Successfully subscribed to our newsletter"}
    }
    catch{
        return {"error": "Failed to subscribe to our newsletter"}
    }
}