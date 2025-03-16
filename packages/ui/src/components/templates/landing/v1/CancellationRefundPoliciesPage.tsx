
import CancellationRefundPolicies from '../../../organisms/custom/landing/v1/CancellationRefundPolicies'
import { CancellationRefundPoliciesProps } from '@repo/ts-types/landing-page/legal'

const CancellationRefundPoliciesPage = ({cancellationRefundPolicies}:{
  cancellationRefundPolicies:CancellationRefundPoliciesProps
}) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <CancellationRefundPolicies cancellationRefundPolicies={cancellationRefundPolicies} />
    </div>
  )
}

export default CancellationRefundPoliciesPage