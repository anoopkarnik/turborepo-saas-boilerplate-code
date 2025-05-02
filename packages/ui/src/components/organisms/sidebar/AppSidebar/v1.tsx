import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../../shadcn/sidebar";
import { sidebarProps } from "@repo/ts-types/home/v1";
import { CompanyLogoName } from "../../../molecules/home/CompanyLogoName/v1";
import SidebarItems from "../../../molecules/sidebar/SidebarItems/v1";
import SidebarUser  from "../../../molecules/sidebar/SidebarUser/v1";
import ProgressWithCredits from "../../../../../../payments/src/components/molecules/v1/ProgressWithCredits";
import NotificationSheet from "../../home/NotificationSheet/v1";

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
  