"use client"

import { SidebarProvider, SidebarTrigger } from "@repo/ui/organisms/shadcn/sidebar"
import { AppSidebar } from "@repo/ui/organisms/custom/home/AppSidebar"
import { CONNECTIONS, sidebarFooterItems, sidebarItems } from "../../lib/constants/home"
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import LoadingCard from "@repo/ui/organisms/custom/auth/v1/LoadingCard";
import { darkLogo, githubRepositoryName, githubUsername, logo, maxTrialCredits, maxProCredits, showCredits, supportEmailAddress, tagline, title } from "../../lib/constants/appDetails";
import { pricingList } from "../../lib/constants/landing-page";
import { getUserDetails } from "./_actions/prisma";
import { RecoilRoot } from "recoil";
import { SupportChat } from "@repo/ui/organisms/custom/home/SupportChat";
import { Separator } from "@repo/ui/atoms/shadcn/separator";
import {BreadcrumbsHeader} from "@repo/ui/molecules/custom/v1/BreadcrumbsHeader"


export default function Layout({ children }: { children: React.ReactNode }) {

    const homePath = '/home'
    const documentationLink = process.env.NEXT_PUBLIC_DOCUMENTATION_URL as string;


    const { data:session,status } = useSession();
    
    const [userDetails, setUserDetails] = useState<any>(null)
    
    const logout = async () => {
        await signOut()
    }

      // Refresh session manually after login
  const refreshSession = async () => {
    const response = await fetch("/api/auth/session");
    const newSession = await response.json();
    const userDetails = await getUserDetails(newSession?.user?.id || "");
    setUserDetails(userDetails);
  };

    useEffect(() => {
      const fetchUserData = async () => {
        if (status === "authenticated") {
          if (!session?.user) return;
          const userDetails = await getUserDetails(session?.user?.id || "");
          setUserDetails(userDetails);
          
        } else if (status === "unauthenticated") {
          refreshSession();
        }
      }
      fetchUserData();
    }, [session, status]);

    if (status === "loading") {
        return <LoadingCard title="" description="Loading the Home Page"/>
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
            homePath={homePath}
            logoutFunction={logout}
            pricingList={pricingList}
            documentationLink={documentationLink}
            supportEmailAddress={supportEmailAddress}
            githubUsername={githubUsername}
            githubRepositoryName={githubRepositoryName}
            connections={CONNECTIONS}
            userDetails={userDetails}
            maxTrialCredits={maxTrialCredits}
            maxProCredits={maxProCredits}
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
