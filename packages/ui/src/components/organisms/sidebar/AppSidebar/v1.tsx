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
import ProgressWithCredits from "@repo/payments/components/molecules/ProgressWithCredits/v1";
import NotificationSheet from "../../home/NotificationSheet/v1";

export function AppSidebar({name,logo,darkLogo,items,footerItems,pricingList,supportEmailAddress,showCredits,
    userDetails}:sidebarProps) {
        
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
                <SidebarUser  pricingList={pricingList} supportEmailAddress={supportEmailAddress}   />
            </SidebarFooter>
        </Sidebar>
    );
}
  