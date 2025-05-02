import React from 'react'
import ContactUs from '../../../organisms/landing/ContactUs/v1'
import { ContactUsProps } from '@repo/ts-types/landing-page/legal'

const ContactUsPage = ({contactUs}:{contactUs:ContactUsProps}) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <ContactUs contactUs={contactUs}/>
    </div>
  )
}

export default ContactUsPage