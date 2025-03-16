"use client"

import { SidebarProvider, SidebarTrigger } from "@repo/ui/organisms/shadcn/sidebar"
import { AppSidebar } from "@repo/ui/organisms/custom/home/AppSidebar"
import { sidebarFooterItems, sidebarItems } from "../../lib/constants/home"
import { useSession} from "next-auth/react";
import { useEffect, useState } from "react";
import LoadingCard from "@repo/ui/organisms/custom/auth/v1/LoadingCard";
import { darkLogo, githubRepositoryName, githubUsername, logo, showCredits, supportEmailAddress, tagline, title } from "../../lib/constants/appDetails";
import { RecoilRoot } from "recoil";
import { SupportChat } from "@repo/ui/organisms/custom/home/SupportChat";
import { Separator } from "@repo/ui/atoms/shadcn/separator";
import {BreadcrumbsHeader} from "@repo/ui/molecules/custom/v1/BreadcrumbsHeader"
import { CONNECTIONS } from "../../lib/constants/connections";
import LoadingPage from "@repo/ui/templates/landing/v1/LoadingPage";
import { getUserDetails } from "../../actions/user";
import { pricingList } from "../../lib/constants/landing-page/pricing";


export default function Layout({ children }: { children: React.ReactNode }) {

    const documentationLink = process.env.NEXT_PUBLIC_DOCUMENTATION_URL as string;

    const { status } = useSession();
    
    const [userDetails, setUserDetails] = useState<any>(null)
    
    // Function to fetch user details
    const fetchUserDetails = async () => {
      try {
        const data = await getUserDetails(); // Call server action
        setUserDetails(data); // Update state with fetched data
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };
  
    // Poll every 30 seconds
    useEffect(() => {
      fetchUserDetails(); // Fetch immediately on mount
  
      const interval = setInterval(() => {
        fetchUserDetails();
      }, 30 * 1000); // 30 seconds interval
  
      return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    if (status === "loading") {
        return <LoadingPage/>
    }

  return (
    <RecoilRoot>
      <SidebarProvider>
          <AppSidebar
            items={sidebarItems}
            footerItems={sidebarFooterItems}
            name={title}
            logo={logo}
            darkLogo={darkLogo}
            quote={tagline}
            pricingList={pricingList}
            documentationLink={documentationLink}
            supportEmailAddress={supportEmailAddress}
            githubUsername={githubUsername}
            githubRepositoryName={githubRepositoryName}
            connections={CONNECTIONS}
            userDetails={userDetails}
            showCredits={showCredits}
          />
        <div className="flex flex-col flex-1 min-h-screen">
          <div className="flex items-center gap-4 py-2">
            <SidebarTrigger />
            <BreadcrumbsHeader />
          </div>
          <Separator/>
          {children}
        </div>
        <SupportChat/>
      </SidebarProvider>
    </RecoilRoot>
  )
}
