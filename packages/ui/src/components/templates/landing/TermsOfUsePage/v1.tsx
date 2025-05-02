import React from 'react'
import { TermsOfServiceProps } from '@repo/ts-types/landing-page/legal'
import TermsOfService from '../../../organisms/landing/TermsOfService/v1'

const TermsOfServicePage = ({termsOfService}:{termsOfService:TermsOfServiceProps}) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <TermsOfService termsOfService={termsOfService}/>
    </div>
  )
}

export default TermsOfServicePage