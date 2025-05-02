"use client"
import React from 'react';
import PrivacyPolicyPage from '@repo/ui/templates/landing/PrivacyPolicyPage/v1';
import { useGlobalData } from '../../../../context/DataContext';
import LoadingPage from '@repo/ui/templates/landing/LoadingPage/v1';

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
