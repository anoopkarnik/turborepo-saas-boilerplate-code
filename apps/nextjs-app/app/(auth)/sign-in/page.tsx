'use client'

import {  useRouter } from 'next/navigation'
import React, { Suspense, useState } from 'react'

import { quote } from '../../../lib/constants/auth'
import { authClient } from '@repo/auth/better-auth/auth-client'
import { z } from 'zod'
import { LoginSchema } from '@repo/auth/utils/zod'
import LoginCard from '@repo/auth/components/authflow/organisms/v1/LoginCard'
import Quote from '@repo/auth/components/authflow/organisms/v1/Quote'
import LoadingCard from '@repo/ui/organisms/misc/LoadingCard/v1'
import { waitFor } from '../../../lib/helper/waitFor'


const LoginContent = () => {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>(undefined)


  const loginWithSocials = async (type: string) => {
    const {error} = await authClient.signIn.social({provider: type})
    await waitFor(3000)
    if (error) {
      setError(error.message)
    } else {
      router.push("/")
    }
  }

  const loginWithEmail = async (data:  z.infer<typeof LoginSchema>) => {
    const {error} = await authClient.signIn.email(data )
    if (error) {
      setError(error.message)
    } else {
      router.push("/")
    }
  }

  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 '>
        <div className='flex items-center justify-center bg-gradient-to-br from-primary to-sidebar dark:bg-gradient-to-br'>
            <LoginCard showEmail={true} showGoogleProvider={true} 
            showGithubProvider={true}
              showLinkedinProvider={true} onEmailSubmit={loginWithEmail} 
              onGoogleProviderSubmit={()=>loginWithSocials('google')} 
              onGithubProviderSubmit={()=>loginWithSocials('github')} 
              onLinkedinProviderSubmit={()=>loginWithSocials('linkedin')} 
              errorMessage={error}/>
        </div>
        <div className='hidden lg:block '>
            <Quote quote={quote}/>
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
