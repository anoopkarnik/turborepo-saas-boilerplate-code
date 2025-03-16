"use client"
import React, { useEffect, useState } from 'react';
import {  InboxIcon } from 'lucide-react';
import DocSidebar from '@repo/ui/organisms/custom/landing/v1/DocSidebar';
import { SidebarProvider, SidebarTrigger } from '@repo/ui/organisms/shadcn/sidebar';
import { getDocCategories, getDocs } from '../../../actions/strapi/docs';
import { getSaaSDetails } from '../../../actions/strapi/landing';

export default function DocsLayout({ children }: { children: React.ReactNode }) {

    const [docs, setDocs] = useState([]);
    const [docCategories, setDocCategories] = useState([]);
    const [productDetails, setProductDetails] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            const docs = await getDocs();
            setDocs(docs);
            const docCategories = await getDocCategories();
            setDocCategories(docCategories);
            const productDetails = await getSaaSDetails();
            setProductDetails(productDetails);
        };
        fetchData();
    }, []);

    // Handle empty docs
    if (docs.length === 0) {
        return (
            <div className='flex flex-col gap-4 h-full items-center'>
                <div className='rounded-full w-20 h-20 flex items-center justify-center'>
                    <InboxIcon size={40} className='stroke-primary'/>
                </div>
                <div className='flex flex-col gap-1 text-center'>
                    <p className='text-emphasized'>No Docs Created Yet</p>
                </div>
            </div> 
        );
    }

    return (
        <div className="flex">
          <SidebarProvider>
            {/* Sidebar */}
            <DocSidebar docs={docs} docCategories={docCategories} navbarSection={productDetails.navbarSectionState}/>
            <SidebarTrigger />
            {/* Main Content */}
            <main className="flex-grow p-6">
                {children} {/* This will render the current doc page */}
            </main>
            </SidebarProvider>
        </div>
    );
}
