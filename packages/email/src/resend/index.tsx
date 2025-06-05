import {Resend} from 'resend';
import EmailVerification from '../templates/EmailVerification';
import ResetPassword from '../templates/ResetPassword';


export const sendVerificationEmail = async (email: string, verificationUrl: string) => {
    const resend = new Resend(process.env.RESEND_API_KEY)
    let from = process.env.NEXT_PUBLIC_SUPPORT_MAIL!;
    let subject = "Verify Your Email Address";
    const response = await resend.emails.send({
        from: from,
        to: email,
        subject: subject,
        react: <EmailVerification verificationLink={verificationUrl} />,
    })
    return response
}


export const sendResetEmail = async (email: string, resetUrl: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY)

  let from = process.env.NEXT_PUBLIC_SUPPORT_MAIL!;
  let subject = "Reset your password";
  const response = await resend.emails.send({
      from: from,
      to: email,
      subject: subject,
      react: <ResetPassword resetPasswordLink={resetUrl} />,
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
