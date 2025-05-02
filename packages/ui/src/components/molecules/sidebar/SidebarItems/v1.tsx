import { sidebarHeaderItemsProps, sidebarHeaderProps } from "@repo/ts-types/home/v1";

import {SidebarContent,SidebarGroup,SidebarGroupLabel,SidebarMenu} from "../../../organisms/shadcn/sidebar";
import SidebarSubItems from "../SidebarSubItems/v1";


const SidebarItems = ({ items }: {items: sidebarHeaderProps}) => {
    return (
        <SidebarContent>
            {items && Object.keys(items).map((key:string) => (
                <SidebarGroup key={key}>
                    <SidebarGroupLabel>{key}</SidebarGroupLabel>
                    <SidebarMenu>
                        {items[key]?.map((item: sidebarHeaderItemsProps) => (
                            <SidebarSubItems key={item.title} item={item} />
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </SidebarContent>
    );
};

export default SidebarItems;
