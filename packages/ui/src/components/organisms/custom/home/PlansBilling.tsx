import React, { useState } from 'react'
import SettingsHeading from '../../../molecules/custom/v1/SettingsHeading';
import { useSession } from 'next-auth/react';
import { PricingProps } from '@repo/ts-types/landing-page/v1';
import PricingItem from '../../../molecules/custom/v1/PricingItem';

const PlansBilling = ({pricingList,supportEmailAddress}:{pricingList:PricingProps[], supportEmailAddress:string}) => {
  const [sessions, setSessions] = useState<any[]>([])
  const { data:session } = useSession();
  const title = 'Plans & Billing'
  const description = 'Plans and Billing Information'
 
return (
  <SettingsHeading title={title} description={description}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingList.map((pricing: PricingProps) => (
          <PricingItem key={pricing.title} pricing={pricing} />
        ))}
      </div>
  </SettingsHeading>
)
}

export default PlansBilling