"use server"

import { auth } from "@repo/auth/next-auth/auth";
import db from "@repo/prisma-db/client"
import { ConnectionType } from "@repo/ts-types/home/v1";
import { addApiKeyConnectionSchema, addApiKeyConnectionSchemaType, addOAuthConnectionSchema, addOAuthConnectionSchemaType } from "@repo/zod/scrape-flow/connection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { symmetricEncrypt } from "../lib/helper/encryption";

export async function GetConnectionsForUser(){
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }

    return db.connection.findMany({
        where: {
            userId: session.user.id
        },
        orderBy:{
            name: 'asc'
        }
    })
}

export async function AddApiKeyConnection(form: addApiKeyConnectionSchemaType){
    const {success, data} = addApiKeyConnectionSchema.safeParse(form);
    if (!success) {
        throw new Error("Invalid form data");
    }

    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }

    // Encrypt the API key before storing it
    const encryptedApiKey = symmetricEncrypt(data.apiKey);
    const result = await db.connection.create({
        data:{
            name: data.name,
            type: ConnectionType.ApiKey,
            userId: session.user.id,
            details: JSON.stringify({apiKey: encryptedApiKey})
        }
    });

    if (!result) {
        throw new Error("Failed to create connection");
    }
    revalidatePath('/connections');

}

export async function AddOAuthConnection(form: addOAuthConnectionSchemaType){
    const {success, data} = addOAuthConnectionSchema.safeParse(form);
    if (!success) {
        throw new Error("Invalid form data");
    }

    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }

    // Encrypt the Client ID and Client Secret before storing it
    const encryptedClientId = symmetricEncrypt(data.clientId);
    const encryptedClientSecret = symmetricEncrypt(data.clientSecret);
    const result = await db.connection.create({
        data:{
            connection: data.connection,
            name: data.name,
            type: ConnectionType.OAuth2,
            userId: session.user.id,
            details: JSON.stringify({
                clientId: encryptedClientId,
                clientSecret: encryptedClientSecret})
        }
    });

    if (!result) {
        throw new Error("Failed to create connection");
    }

    if(data.connection === 'Notion'){
       const redirect_uri = process.env.NEXT_PUBLIC_URL + `/api/callback/notion`;
       const OAuthUrl = `https://api.notion.com/v1/oauth/authorize?client_id=${data.clientId}&response_type=code&owner=user&redirect_uri=${redirect_uri}`;
       redirect(OAuthUrl);
    }
    
}


export async function DeleteConnection(name: string){
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }

    await db.connection.delete({
        where:{
            userId_name:{
                userId: session.user.id,
                name
            }
        }
    })

    revalidatePath('/connections');
}

export async function GetConnectionByUserIdAndConnection(connection: string){
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const latestConnection = db.connection.findFirst({
        where: {
            userId: session.user.id,
            connection
        },
        orderBy:{
            createdAt: 'desc'
        }
    })
    if (!latestConnection){
        throw new Error("Connection not found");
    }
    return latestConnection;  
}

export async function updateConnectionDetails(id: string, details: any){
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }

    await db.connection.update({
        where:{
            id
        },
        data:{
            details: JSON.stringify(details)
        }
    })
    revalidatePath('/connections');
}