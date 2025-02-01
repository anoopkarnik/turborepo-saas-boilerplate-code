import {Resend} from 'resend';
import EmailVerification from '../templates/EmailVertification';
import ResetPassword from '../templates/ResetPassword';


export const sendVerificationEmail = async (email: string, token:string) => {

    const resend = new Resend(process.env.RESEND_API_KEY)
    const verificationLink = `${process.env.NEXT_PUBLIC_URL}/auth/new-verification?token=${token}`
    let from = process.env.NEXT_PUBLIC_SUPPORT_MAIL || "support";
    let subject = "Verify Your Email Address";
    const res = await resend.emails.send({
        from: from,
        to: email,
        subject: subject,
        react: <EmailVerification verificationLink={verificationLink} />,
    })
}


export const sendResetEmail = async (email: string, token:string) => {

    const resend = new Resend(process.env.RESEND_API_KEY)
    const resetPasswordLink = `${process.env.NEXT_PUBLIC_URL}/auth/reset-password?token=${token}`
    let from = process.env.NEXT_PUBLIC_SUPPORT_MAIL || "support";
    let subject = "Verify Your Email Address";
    await resend.emails.send({
        from: from,
        to: email,
        subject: subject,
        react: <ResetPassword resetPasswordLink={resetPasswordLink} />,
    })
}

export const createContact = async( email: string) => {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.contacts.create({
        email: email,
        audienceId: process.env.RESEND_AUDIENCE_ID || "",
    })
}
