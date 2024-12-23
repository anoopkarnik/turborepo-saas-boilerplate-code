import React from 'react'
import Navbar from '../../../organisms/custom/landing/Navbar'
import PrivacyPolicy from '../../../organisms/custom/landing/PrivacyPolicy'
import { PrivacyPolicyPageProps } from '@repo/ts-types/landing-page/v1'

const PrivacyPolicyPage = ({routeList,githubLink,githubUsername,githubRepositoryName,title,logo,darkLogo,
    companyName,country,lastUpdated,websiteUrl,email}:PrivacyPolicyPageProps) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Navbar routeList={routeList} githubLink={githubLink} githubUsername={githubUsername} 
      githubRepositoryName={githubRepositoryName} title={title} logo={logo} darkLogo={darkLogo} />
        <PrivacyPolicy lastUpdated={lastUpdated} companyName={companyName} siteName={title} 
    websiteUrl={websiteUrl} country={country} email={email}  />
    </div>
  )
}

export default PrivacyPolicyPage