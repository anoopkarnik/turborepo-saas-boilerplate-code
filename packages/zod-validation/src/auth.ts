import * as z from 'zod';

const getPasswordSchema = ( type: "password" | "confirmPassword") => 
    z.string({required_error: `${type} is required`})
        .min(1, `${type} is required`)
        .min(8, `${type} must be at least 8 characters`)
        .max(50, `${type} must be less than 50 characters`)

const getEmailSchema = () => 
    z.string({required_error: "Email is required"})
        .email("Invalid email address")


const getNameSchema = () => 
    z.string({required_error: " name is required"})
        .min(1, "Name is required")
        .max(50, "Name must be less than 50 characters")
        
export const ResetPasswordSchema = z.object({
    oldPassword: getPasswordSchema("password"),
    password: getPasswordSchema("password"),
    confirmPassword: getPasswordSchema("confirmPassword"),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });


export const LoginSchema = z.object({
    email: getEmailSchema(),
    password: getPasswordSchema("password"),
})


export const ForgotPasswordSchema = z.object({
    email: getEmailSchema(),
})


export const RegisterSchema = z.object({
    name: getNameSchema(),
    email: getEmailSchema(),
    password: getPasswordSchema("password"),
    confirmPassword: getPasswordSchema("confirmPassword"),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });


export const ResetPasswordSettingsSchema = z.object({
    currentPassword: z.string().min(1,{
        message: "Old Password is required"
    }),
    newPassword: z.string().min(6,{
        message: "New Password must be at least 6 characters long"
    }),
})