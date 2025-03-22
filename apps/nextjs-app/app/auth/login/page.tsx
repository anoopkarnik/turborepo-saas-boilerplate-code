'use client'

import LoginPage from '@repo/ui/templates/auth/v1/LoginPage'
import {  useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { login } from '../_actions/login'

const LoginContent = () => {
  const searchParams = useSearchParams()

  const [urlError, setUrlError] = useState('')

  useEffect(() => {
    const error = searchParams.get('error')
    if (error === 'OAuthAccountNotLinked') {
      setUrlError('This email is already in use with another provider.')
    }
  }, [searchParams])
  

  const loginWithSocials = async (type: string) => {
    await signIn(type, { callbackUrl: '/' })
  }

  const title = 'Loading...'
  const description = 'Please wait while we are loading the page!'
  const quote = 'The only way to do great work is to love what you do.'
  const author = 'Late Steve Jobs'
  const credential = 'Ex CEO of Apple Inc.'
  const showEmail = true
  const showGoogleProvider = true
  const showGithubProvider = true
  const showLinkedinProvider = true

  return (
    <LoginPage
      title={title}
      description={description}
      quote={quote}
      author={author}
      credential={credential}
      showEmail={showEmail}
      showGoogleProvider={showGoogleProvider}
      showGithubProvider={showGithubProvider}
      showLinkedinProvider={showLinkedinProvider}
      onEmailSubmit={login}
      onGoogleProviderSubmit={()=>loginWithSocials('google')}
      onGithubProviderSubmit={()=>loginWithSocials('github')}
      onLinkedinProviderSubmit={()=>loginWithSocials('linkedin')}
      errorMessage={urlError}
    />
  )
}

const Login = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}

export default Login
