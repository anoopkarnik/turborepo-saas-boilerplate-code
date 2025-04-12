'use client'

import React, { Suspense} from 'react'
import LoadingCard from '@repo/ui/organisms/custom/auth/v1/LoadingCard'
import VerificationCard from '@repo/ui/organisms/custom/auth/v1/VerificationCard'
import Quote from '@repo/ui/organisms/custom/auth/v1/Quote'
import { author, credential, quote } from '../../../lib/constants/auth'

const NewVerificationContent = () => {


  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 '>
        <div className='flex items-center justify-center bg-gradient-to-br from-primary to-black dark:bg-gradient-to-br'>
            <VerificationCard errorMessage={"Email Not Verified"} successMessage={"Email Verified"}/>
        </div>
        <div className='hidden lg:block bg-white'>
            <Quote quote={quote} author={author} credential={credential}/>
        </div>
    </div>
  )
}

const NewVerification = () => {
  return (
    <Suspense fallback={<LoadingCard/>}>
      <NewVerificationContent />
    </Suspense>
  )
}

export default NewVerification
