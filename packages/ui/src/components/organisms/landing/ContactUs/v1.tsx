"use client"
import { ContactUsProps } from "@repo/ts-types/landing-page/legal"

const ContactUs = ({contactUs}:{contactUs:ContactUsProps}) => {
  return (
    <div className='p-6 mx-[20%]'>
        <h2 className='text-title-h1'>Contact Us</h2>

        <p className="text-description mb-6">Last updated: {contactUs?.lastUpdated}</p>
        <p className="mb-4">Merchant Legal entiy name: {contactUs?.companyLegalName}</p>
        <p className="mb-4">Registered Address: {contactUs?.address}</p>
        <p className="mb-4">Operational Address: {contactUs?.address}</p>
        <p className="mb-4">Contact Number: {contactUs?.contactNumber}</p>
        <p className="mb-4"> Email Id: &nbsp; 
          <a href={`https://mail.google.com/mail?view=cm&fs=1&to=${contactUs?.supportEmailAddress}&su=SupportEmail`} className='text-blue-500 cursor-pointer'>
            {contactUs?.supportEmailAddress}
          </a>
        </p>

    </div>
  )
}

export default ContactUs