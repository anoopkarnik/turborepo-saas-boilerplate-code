"use client"

import React from 'react'

import Navbar from '@repo/ui/organisms/landing/Navbar/v1';
import { useGlobalData } from '../../../context/DataContext';


const Layout= ({ children }: { children: React.ReactNode }) => {
  const data = useGlobalData(); // Use global data

  return (
    <div className='relative'>
      <Navbar navbarSection={data.navbarSectionState} showLandingRoutes={false}/>
      {children}
    </div>
  );
};

export default Layout;