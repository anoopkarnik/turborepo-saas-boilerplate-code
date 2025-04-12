"use client"

import { SidebarProvider, SidebarTrigger } from "@repo/ui/organisms/shadcn/sidebar"
import { AppSidebar } from "@repo/ui/organisms/custom/home/AppSidebar"
import { sidebarFooterItems, sidebarItems } from "../../lib/constants/home"
import { useSession} from "@repo/auth/better-auth/auth-client";
import { darkLogo, githubRepositoryName, githubUsername, logo, showCredits, supportEmailAddress, title } from "../../lib/constants/appDetails";
import { RecoilRoot } from "recoil";
import { Separator } from "@repo/ui/atoms/shadcn/separator";
import {BreadcrumbsHeader} from "@repo/ui/molecules/custom/v1/BreadcrumbsHeader"
import { CONNECTIONS } from "../../lib/constants/connections";
import LoadingPage from "@repo/ui/templates/landing/v1/LoadingPage";
import { pricingList } from "../../lib/constants/landing-page/pricing";
import Support from "@repo/ui/organisms/custom/landing/v1/Support";
import { useGlobalData } from "../../context/DataContext";


export default function Layout({ children }: { children: React.ReactNode }) {

    const documentationLink = process.env.NEXT_PUBLIC_DOCUMENTATION_URL as string;
      const data = useGlobalData(); 

    const { isPending,data:session } = useSession();

    

    if (isPending) {
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
            pricingList={pricingList}
            documentationLink={documentationLink}
            supportEmailAddress={supportEmailAddress}
            githubUsername={githubUsername}
            githubRepositoryName={githubRepositoryName}
            connections={CONNECTIONS}
            userDetails={session?.user}
            showCredits={showCredits}
          />
        <div className="flex flex-col flex-1 max-h-screen">
          <div className="flex items-center gap-4 py-2">
            <SidebarTrigger />
            <BreadcrumbsHeader />
          </div>
          <Separator/>
          {children}
        </div>
        <Support heroSection={data.heroSectionState} footerSection={data.footerSectionState} 
      navbarSection={data.navbarSectionState} />
      </SidebarProvider>
    </RecoilRoot>
  )
}
