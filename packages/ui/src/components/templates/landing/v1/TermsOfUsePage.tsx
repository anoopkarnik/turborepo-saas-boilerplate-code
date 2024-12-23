import React from 'react'
import Navbar from '../../../organisms/custom/landing/Navbar'
import { PrivacyPolicyPageProps, TermsOfServicePageProps } from '@repo/ts-types/landing-page/v1'
import TermsOfUse from '../../../organisms/custom/landing/TermsOfUse'

const TermsOfUsePage = ({routeList,githubLink,githubUsername,githubRepositoryName,title,logo,darkLogo,
    companyName,country,lastUpdated,websiteUrl,email,version,address}:TermsOfServicePageProps) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Navbar routeList={routeList} githubLink={githubLink} githubUsername={githubUsername} 
      githubRepositoryName={githubRepositoryName} title={title} logo={logo} darkLogo={darkLogo} />
        <TermsOfUse lastUpdated={lastUpdated} companyName={companyName} siteName={title} 
    websiteUrl={websiteUrl} country={country} email={email} version={version} address={address}  />
    </div>
  )
}

export default TermsOfUsePage