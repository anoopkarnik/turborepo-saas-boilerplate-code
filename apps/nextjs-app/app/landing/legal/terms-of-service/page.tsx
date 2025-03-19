"use client"


import React from 'react';
import LoadingPage from '@repo/ui/templates/landing/v1/LoadingPage';
import { useGlobalData } from '../../../../context/DataContext';
import TermsOfServicePage from '@repo/ui/templates/landing/v1/TermsOfUsePage';

const TermsOfService = () => {
      const data = useGlobalData();
      if (data.isLoading) {
        return (
          <LoadingPage />
        );
      }
  return (
    <TermsOfServicePage termsOfService={data.termsOfServiceState}  />
  );
}

export default TermsOfService;
