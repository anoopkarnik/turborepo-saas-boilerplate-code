"use client"

import React from 'react';
import CancellationRefundPoliciesPage from '@repo/ui/templates/landing/CancellationRefundPoliciesPage/v1';
import { useGlobalData } from '../../../../context/DataContext';
import LoadingPage from '@repo/ui/templates/landing/LoadingPage/v1';

const CancellationRefundPolicies = () => {
        const data = useGlobalData();
        if (data.isLoading) {
          return (
            <LoadingPage />
          );
        }
  return (
    <>
        <CancellationRefundPoliciesPage cancellationRefundPolicies={data.cancellationRefundPoliciesState}  />
    </>
  );
}

export default CancellationRefundPolicies;
