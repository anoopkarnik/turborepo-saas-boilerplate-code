"use client"

import React from 'react';
import CancellationRefundPoliciesPage from '@repo/ui/templates/landing/v1/CancellationRefundPoliciesPage';
import { useGlobalData } from '../../../../context/DataContext';
import LoadingPage from '@repo/ui/templates/landing/v1/LoadingPage';

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
