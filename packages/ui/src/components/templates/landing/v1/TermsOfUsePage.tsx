import React from 'react'
import { TermsOfServiceProps } from '@repo/ts-types/landing-page/legal'
import TermsOfService from '../../../organisms/custom/landing/v1/TermsOfService'

const TermsOfServicePage = ({termsOfService}:{termsOfService:TermsOfServiceProps}) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <TermsOfService termsOfService={termsOfService}/>
    </div>
  )
}

export default TermsOfServicePage