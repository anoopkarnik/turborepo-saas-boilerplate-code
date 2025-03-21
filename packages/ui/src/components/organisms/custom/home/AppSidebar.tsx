import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../../shadcn/sidebar";
import { sidebarProps } from "@repo/ts-types/home/v1";
import { CompanyLogoName } from "../../../molecules/custom/v1/CompanyLogoName";
import SidebarItems from "../../../molecules/custom/v1/SidebarItems";
import SidebarUser  from "../../../molecules/custom/v1/SidebarUser";
import ProgressWithCredits from "../../../molecules/custom/v1/ProgressWithCredits";
import NotificationSheet from "./NotificationSheet";

export function AppSidebar({name,logo,darkLogo,items,footerItems,pricingList,documentationLink,
    supportEmailAddress,githubUsername,githubRepositoryName,connections,showCredits,userDetails}:sidebarProps) {
        
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <CompanyLogoName logo={logo} darkLogo={darkLogo} name={name}/>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarItems items={items}/>
            {/* <SidebarFooterItems footerItems={footerItems}/> */}
            <SidebarFooter className="p-0">
                <NotificationSheet />
            </SidebarFooter>

            <SidebarFooter>
                {/* {userDetails?.access === "TRIAL" ? <UpgradeToProButton />:null} */}
                {showCredits && 
                <ProgressWithCredits creditsUsed={userDetails?.creditsUsed } creditsTotal={userDetails?.creditsTotal}/>}
                <SidebarUser  pricingList={pricingList}
                      documentationLink={documentationLink} supportEmailAddress={supportEmailAddress} githubUsername={githubUsername} 
                      githubRepositoryName={githubRepositoryName} connections={connections}/>
            </SidebarFooter>
        </Sidebar>
    );
}
  