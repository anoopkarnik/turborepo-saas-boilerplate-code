"use client"
import React from 'react';
import PrivacyPolicyPage from '@repo/ui/templates/landing/v1/PrivacyPolicyPage';
import { useGlobalData } from '../../../../context/DataContext';
import LoadingPage from '@repo/ui/templates/landing/v1/LoadingPage';

const PrivacyPolicy = () => {
      const data = useGlobalData();

      if (data.isLoading) {
        return (
          <LoadingPage />
        );
      }
  return (
    <PrivacyPolicyPage privacyPolicy={data.privacyPolicyState} />
  );
}

export default PrivacyPolicy;
