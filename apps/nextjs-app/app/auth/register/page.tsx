'use client'

import RegisterPage from '@repo/ui/templates/auth/v1/RegisterPage'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { register } from '../_actions/register'

const RegisterContent = () => {
  const searchParams = useSearchParams()

  const [urlError, setUrlError] = useState('')

  useEffect(() => {
    const error = searchParams.get('error')
    if (error === 'OAuthAccountNotLinked') {
      setUrlError('This email is already in use with another provider.')
    }
  }, [searchParams])

  const title = 'Loading...'
  const description = 'Please wait while we are loading the page!'
  const quote = 'The only way to do great work is to love what you do.'
  const author = 'Late Steve Jobs'
  const credential = 'Ex CEO of Apple Inc.'
  const showEmail = true
  const showGoogleProvider = true
  const showGithubProvider = true
  const showLinkedinProvider = true

  const login = async (type: string) => {
    await signIn(type, { callbackUrl: '/' })
  }

  return (
    <RegisterPage
      title={title}
      description={description}
      quote={quote}
      author={author}
      credential={credential}
      showEmail={showEmail}
      showGoogleProvider={showGoogleProvider}
      showGithubProvider={showGithubProvider}
      showLinkedinProvider={showLinkedinProvider}
      onEmailSubmit={register}
      onGoogleProviderSubmit={login}
      onGithubProviderSubmit={login}
      onLinkedinProviderSubmit={login}
      errorMessage={urlError}
    />
  )
}

const Register = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterContent />
    </Suspense>
  )
}

export default Register
