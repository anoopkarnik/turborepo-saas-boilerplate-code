"use client"
import React from 'react';
import ContactUsPage from '@repo/ui/templates/landing/ContactUsPage/v1';
import { useGlobalData } from '../../../../context/DataContext';
import LoadingPage from '@repo/ui/templates/landing/LoadingPage/v1';

const ContactUs = () => {
    const data = useGlobalData();

  if (data.isLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <ContactUsPage contactUs={data.contactUsState} />
  );
}

export default ContactUs;
