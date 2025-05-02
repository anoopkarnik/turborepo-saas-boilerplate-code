import { sidebarFooterItemsProps, sidebarHeaderProps } from "@repo/ts-types/home/v1";
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../../../organisms/shadcn/sidebar";
const SidebarFooterItems = ({footerItems}:{footerItems:sidebarFooterItemsProps[]})=> {
    return (
<SidebarContent className="mt-auto">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {footerItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
    )
}

export default SidebarFooterItems;