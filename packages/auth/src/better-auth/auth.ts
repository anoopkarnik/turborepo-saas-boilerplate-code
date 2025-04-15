import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import db from '@repo/prisma-db/client'
import { admin,  openAPI, jwt } from "better-auth/plugins";
import { sendResetEmail, sendVerificationEmail } from "@repo/email/resend/index";
 

export const auth:any = betterAuth({
    basePath: "/api/auth",
    database: prismaAdapter(db, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    rateLimit:{
        window: 60,
        max: 100,
        customRules: {
            '/sign-in/email':{
                window: 60,
                max:3
            }
        }
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 day
        updateAge: 60 * 60 * 24, // 1 day 
        cookieCache: {
            enabled: true,
            maxAge: 5* 60
        }
    },
    user: {
        additionalFields: {
            creditsUsed: {
                type: "number",
                required: false,
            },
            creditsTotal: {
                type: "number",
                required: false,
            },
        },
        changeEmail: {
            enabled: true,
            sendChangeEmailVerification: async ({user, newEmail, url, token}, request) => {
                await sendVerificationEmail(newEmail,url)
            }
        },
        deleteUser: {
            enabled: true,
        }
    },
    account:{
        accountLinking: {
            enabled: true,
            trustedProviders: ['google','github','linkedin']
        }
    },
    socialProviders: {
        github: {
            clientId: process.env.AUTH_GITHUB_CLIENT_ID ?? "",
            clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET ?? "",
        },
        google: {
            clientId: process.env.AUTH_GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET ?? "",
        },
        linkedin: {
            clientId: process.env.AUTH_LINKEDIN_CLIENT_ID ?? "",
            clientSecret: process.env.AUTH_LINKEDIN_CLIENT_SECRET ?? "",
        }
    },
    plugins: [openAPI(),admin({
        impersonationSessionDuration: 3600
    })],
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword : async ({user, url}) =>{
            await sendResetEmail(user.email, url)
        }
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async({user,token})=>{
            const fullUser = await db.user.findUnique({
                where: { id: user.id },
                include: {
                  accounts: true,
                },
              });
            
              const isSocial =
                fullUser?.accounts?.some((account) =>
                  ["google", "github", "linkedin"].includes(account.providerId)
                ) ?? false;
            
              if (isSocial) {
                console.log("Skipping email verification for social login user");
                return;
              }
            
            const verificationUrl = `${process.env.NEXT_PUBLIC_URL}/api/auth/verify-email?token=${token}
            &callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
            await sendVerificationEmail(user.email,verificationUrl)
        },
    }

} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;