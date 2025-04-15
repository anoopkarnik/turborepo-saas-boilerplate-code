"use client";
import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"

export const authClient:any = createAuthClient({
    /** the base url of the server (optional if you're using the same domain) */
    baseURL: process.env.NEXT_PUBLIC_URL,
    plugins: [adminClient()]
})

export const { signIn, signOut, useSession } = authClient;
