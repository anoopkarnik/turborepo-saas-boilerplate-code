"use client"


import React from 'react';
import LoadingPage from '@repo/ui/templates/landing/LoadingPage/v1';
import { useGlobalData } from '../../../../context/DataContext';
import TermsOfServicePage from '@repo/ui/templates/landing/TermsOfUsePage/v1';

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
