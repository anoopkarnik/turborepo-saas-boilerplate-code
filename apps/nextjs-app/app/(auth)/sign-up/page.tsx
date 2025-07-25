'use client'

import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

import { quote } from '../../../lib/constants/auth'

import { authClient } from '@repo/auth/better-auth/auth-client'
import { z } from 'zod'
import { RegisterSchema } from '@repo/auth/utils/zod'
import RegisterCard from '@repo/ui/organisms/auth/authflow/RegisterCard'
import Quote from '@repo/ui/organisms/auth/authflow/Quote'
import LoadingCard from '@repo/ui/organisms/misc/LoadingCard/v1'

const RegisterContent = () => {
  const searchParams = useSearchParams()

  const [urlError, setUrlError] = useState('')

  useEffect(() => {
    const error = searchParams.get('error')
    if (error === 'OAuthAccountNotLinked') {
      setUrlError('This email is already in use with another provider.')
    }
  }, [searchParams])

  const loginWithSocials = async (type: string) => {
    await authClient.signIn.social({provider: type})
  }

  const register = async (data:  z.infer<typeof RegisterSchema>) => {
    const result = await  authClient.signUp.email(data)
    return result
  }



  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 '>
        <div className='flex items-center justify-center bg-gradient-to-br from-primary to-sidebar dark:bg-gradient-to-br'>
            <RegisterCard showEmail={true} 
              showGoogleProvider={true} showGithubProvider={true} 
              showLinkedinProvider={true} onEmailSubmit={register} 
              onGoogleProviderSubmit={()=>loginWithSocials('google')} 
              onGithubProviderSubmit={()=>loginWithSocials('github')} 
              onLinkedinProviderSubmit={()=>loginWithSocials('linkedin')} 
                errorMessage={urlError}/>
        </div>
        <div className='invisible lg:visible '>
            <Quote quote={quote} />
        </div>
    </div>
  )
}

const Register = () => {
  return (
    <Suspense fallback={<LoadingCard/>}>
      <RegisterContent />
    </Suspense>
  )
}

export default Register
