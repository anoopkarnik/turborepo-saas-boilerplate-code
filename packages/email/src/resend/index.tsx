import {Resend} from 'resend';
import EmailVerification from '../templates/EmailVerification';
import ResetPassword from '../templates/ResetPassword';


export const sendVerificationEmail = async (email: string, token:string) => {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const verificationLink = `${process.env.NEXT_PUBLIC_URL}/auth/new-verification?token=${token}`
    let from = process.env.NEXT_PUBLIC_SUPPORT_MAIL || "support";
    let subject = "Verify Your Email Address";
    const response = await resend.emails.send({
        from: from,
        to: email,
        subject: subject,
        react: <EmailVerification verificationLink={verificationLink} />,
    })
    return response
}


export const sendResetEmail = async (email: string, token:string) => {

    const resend = new Resend(process.env.RESEND_API_KEY)
    const resetPasswordLink = `${process.env.NEXT_PUBLIC_URL}/auth/reset-password?token=${token}`
    let from = process.env.NEXT_PUBLIC_SUPPORT_MAIL || "support";
    let subject = "Verify Your Email Address";
    const response = await resend.emails.send({
        from: from,
        to: email,
        subject: subject,
        react: <ResetPassword resetPasswordLink={resetPasswordLink} />,
    })
    return response
}

export const sendSupportEmail = async (subject:string,body:string) => {
const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const response = await resend.emails.send({
      from: "feedback@bayesian-labs.com",
      to: "support@bayesian-labs.com",
      subject,
      html: `<p>${body}</p>`
    });
    return response;
  } catch (error) {
    console.log("Error sending email:", error);
    return null;
  }
};


export const createContact = async( email: string) => {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const response = await resend.contacts.create({
        email: email,
        audienceId: process.env.RESEND_AUDIENCE_ID || "",
    })
    return response
}
