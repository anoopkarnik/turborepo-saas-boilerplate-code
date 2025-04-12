"use server"

import { getUserById } from "@repo/prisma-db/repo/user";
import { auth } from "@repo/auth/better-auth/auth";

export const getUserDetails = async () => {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const user = await getUserById(session.user.id);
    return user;
}