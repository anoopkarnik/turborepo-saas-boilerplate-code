import React from 'react'
import PrivacyPolicy from '../../../organisms/custom/landing/v1/PrivacyPolicy'
import { PrivacyPolicyProps } from '@repo/ts-types/landing-page/legal'

const PrivacyPolicyPage = ({privacyPolicy}:{privacyPolicy:PrivacyPolicyProps}) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <PrivacyPolicy privacyPolicy={privacyPolicy}  />
    </div>
  )
}

export default PrivacyPolicyPage