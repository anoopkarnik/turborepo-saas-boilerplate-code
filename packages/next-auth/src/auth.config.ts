import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

import { LoginSchema } from "@repo/zod/auth";

import type {NextAuthConfig} from "next-auth";
import { getUserByEmail } from "@repo/prisma-db/repo/user";
import bcrypt from "bcryptjs";
import linkedin from "next-auth/providers/linkedin";


const authConfig: NextAuthConfig = {
    providers: [
        Credentials({
            async authorize(credentials) { 
                const validatedFields = LoginSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const {email, password} = validatedFields.data;
                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) {
                        return user
                    }
                }
                return null;         
            }
        }),
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        }),
        linkedin({
            clientId: process.env.AUTH_LINKEDIN_ID,
            clientSecret: process.env.AUTH_LINKEDIN_SECRET
        }),
    ]
};

export default authConfig;