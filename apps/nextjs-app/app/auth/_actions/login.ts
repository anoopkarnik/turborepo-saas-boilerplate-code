"use server";

import { LoginSchema } from '@repo/zod/auth';
import * as z from 'zod';
import { signIn } from '@repo/auth/next-auth/auth';
import { AuthError } from 'next-auth';
import { createVerificationToken } from '@repo/prisma-db/repo/user';
import { getUserByEmail } from '@repo/prisma-db/repo/user';
import { sendVerificationEmail } from '@repo/email/resend/index';

export const login = async (values:z.infer<typeof LoginSchema>) =>{
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: "Invalid Username or Password!"}
    }
    const {email, password} = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password){
        return {error: "Email not registered at all | Email not registered with credentials!"}
    }
    if (!existingUser.emailVerified){
        const token = await createVerificationToken( existingUser.email);
        await sendVerificationEmail(token.email,token.token);
        return {
            success: "Confirmation email sent! Please verify your email before logging in!",
            error: "Email not verified! Please verify your email before logging in!"}
    }

    try{
        await signIn('credentials', {email, password,redirectTo: "/"});
    }
    catch(err){
        if (err instanceof AuthError ){
            switch(err.type){
                case "CredentialsSignin":
                    return {error: "Invalid Username or Password!"}
                default:
                    return {error: "An error occurred while signing in!"}
            }
        }
        throw err;
    }
}