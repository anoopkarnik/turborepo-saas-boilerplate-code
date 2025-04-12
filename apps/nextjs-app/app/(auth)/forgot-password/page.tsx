'use client'

import React, {useState } from 'react'
import ForgotPasswordCard from '@repo/ui/organisms/custom/auth/v1/ForgotPasswordCard'
import Quote from '@repo/ui/organisms/custom/auth/v1/Quote'
import { author, credential, quote } from '../../../lib/constants/auth'
import { authClient } from '@repo/auth/better-auth/auth-client'

const ForgotPasswordClient = () => {


    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const ResetPasswordFunction = async (email: string) => {
        try {
            const {error} = await authClient.forgetPassword({email,redirectTo: "/reset-password"})
            if(error){
                setSuccess(undefined)
                setError(error)
                return
            }
            setSuccess("Check your email for the reset link")
        } catch  {
            setError("Something went wrong!")
        }
    }


  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 '>
        <div className='flex items-center justify-center bg-gradient-to-br from-primary to-black dark:bg-gradient-to-br'>
            <ForgotPasswordCard resetFunction={ResetPasswordFunction} errorMessage={error} successMessage={success}/>
        </div>
        <div className='hidden lg:block bg-white'>
            <Quote quote={quote} author={author} credential={credential}/>
        </div>
    </div>
  )
}

export default ForgotPasswordClient