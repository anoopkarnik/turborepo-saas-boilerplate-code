'use client'

import {  useRouter } from 'next/navigation'
import React, { Suspense, useState } from 'react'
import LoadingCard from '@repo/ui/organisms/custom/auth/v1/LoadingCard'
import LoginCard from '@repo/ui/organisms/custom/auth/v1/LoginCard'
import Quote from '@repo/ui/organisms/custom/auth/v1/Quote'
import { author, credential, quote } from '../../../lib/constants/auth'
import { authClient } from '@repo/auth/better-auth/auth-client'
import { z } from 'zod'
import { LoginSchema } from '@repo/zod/auth'


const LoginContent = () => {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>(undefined)


  const loginWithSocials = async (type: string) => {
    const {error} = await authClient.signIn.social({provider: type})
    if (error) {
      setError(error.message)
    } else {
      router.push("/")
    }
  }

  const loginWithEmail = async (data:  z.infer<typeof LoginSchema>) => {
    const {error} = await authClient.signIn.email(data)
    if (error) {
      setError(error.message)
    } else {
      router.push("/")
    }
  }

  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 '>
        <div className='flex items-center justify-center bg-gradient-to-br from-primary to-black dark:bg-gradient-to-br'>
            <LoginCard showEmail={true} showGoogleProvider={true} 
            showGithubProvider={true}
              showLinkedinProvider={true} onEmailSubmit={loginWithEmail} 
              onGoogleProviderSubmit={()=>loginWithSocials('google')} 
              onGithubProviderSubmit={()=>loginWithSocials('github')} 
              onLinkedinProviderSubmit={()=>loginWithSocials('linkedin')} 
              errorMessage={error}/>
        </div>
        <div className='hidden lg:block bg-white'>
            <Quote quote={quote} author={author} credential={credential}/>
        </div>
    </div>
  )
}

const Login = () => {
  return (
    <Suspense fallback={<LoadingCard/>}>
      <LoginContent />
    </Suspense>
  )
}

export default Login
