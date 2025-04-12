"use client"
import ErrorCard from '@repo/ui/organisms/custom/auth/v1/ErrorCard'
import Quote from '@repo/ui/organisms/custom/auth/v1/Quote'
import React from 'react'
import { author, credential, quote } from '../../../lib/constants/auth'

const ErrorTemp = () => {

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 '>
          <div className='flex items-center justify-center bg-gradient-to-br from-violet-400/30 to-black/90 dark:bg-gradient-to-br'>
              <ErrorCard errorMessage={"Oops! Something went wrong!"}/>
          </div>
          <div className='invisible lg:visible bg-white'>
              <Quote quote={quote} author={author} credential={credential}/>
          </div>
    </div>
  )
}

export default ErrorTemp;