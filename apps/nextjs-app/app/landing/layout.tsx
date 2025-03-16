"use client"

import React from 'react'
import {  useGlobalData } from '../../context/DataContext';
import Settings from '@repo/ui/organisms/custom/landing/v1/Settings';
import Support from '@repo/ui/organisms/custom/landing/v1/Support';


const Layout= ({ children }: { children: React.ReactNode }) => {
  const data = useGlobalData(); // Use global data

  return (
    <div className='relative w-full'>
      {children}
      <Settings data={data} />
      <Support heroSection={data.heroSectionState} footerSection={data.footerSectionState} 
      navbarSection={data.navbarSectionState}/>
    </div>
  );
};

export default Layout;