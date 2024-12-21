import React from 'react';
import { address, companyName, country, darkLogo, githubLink, githubRepositoryName, githubUsername,
   lastUpdatedPrivacyPolicy, logo, supportEmailAddress, title, websiteUrl,version } from '../../../lib/constants/appDetails';
import TermsOfUsePage from '@repo/ui/templates/landing/v1/TermsOfUsePage';

const page = () => {
    const routeList:any = [];

  return (
    <TermsOfUsePage githubLink={githubLink} githubUsername={githubUsername} 
    githubRepositoryName={githubRepositoryName} title={title} logo={logo} darkLogo={darkLogo} routeList={routeList}
    lastUpdated={lastUpdatedPrivacyPolicy} companyName={companyName} 
    siteName={title} websiteUrl={websiteUrl} country={country} email={supportEmailAddress} version={version} 
    address={address}  />
  );
}

export default page;
