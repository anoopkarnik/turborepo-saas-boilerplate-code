import { CancellationRefundPoliciesPageProps, PrivacyPolicyPageProps } from '@repo/ts-types/landing-page/v1'
import Navbar from '../../../organisms/custom/landing/Navbar'
import CancellationRefundPolicies from '../../../organisms/custom/landing/CancellationRefundPolicies'

const CancellationRefundPoliciesPage = ({routeList,githubLink,githubUsername,githubRepositoryName,title,logo,darkLogo,
    companyName,lastUpdated,websiteUrl,email}:CancellationRefundPoliciesPageProps) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Navbar routeList={routeList} githubLink={githubLink} githubUsername={githubUsername} 
      githubRepositoryName={githubRepositoryName} title={title} logo={logo} darkLogo={darkLogo} />
        <CancellationRefundPolicies lastUpdated={lastUpdated} companyName={companyName} siteName={title} 
    websiteUrl={websiteUrl} email={email} />
    </div>
  )
}

export default CancellationRefundPoliciesPage