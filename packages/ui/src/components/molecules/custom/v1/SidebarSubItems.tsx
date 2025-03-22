import { sidebarHeaderItemsProps} from "@repo/ts-types/home/v1";
import { ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../shadcn/collapsible"
import {
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarMenuAction,

} from "../../../organisms/shadcn/sidebar";
import { usePathname, useRouter } from 'next/navigation'
import { cn } from "../../../../lib/utils";


const SidebarSubItems = ({item}:{item:sidebarHeaderItemsProps}) => {
    const router = useRouter()
    const pathname = usePathname();
    
    return (
        <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem >
                <SidebarMenuButton asChild tooltip={item.title} 
                className={cn("cursor-pointer",pathname===item.url && "bg-sidebar-accent")}
                onClick={() => router.push(item.url as string)}>
                    <div className="flex items-center ">
                        <item.icon />
                        <span>{item.title}</span>
                    </div>
                </SidebarMenuButton>
                {item.items?.length ? (
                    <>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuAction className="data-[state=open]:rotate-90">
                                <ChevronRight />
                                <span className="sr-only">Toggle</span>
                            </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub >
                                {item.items.map((subItem: sidebarHeaderItemsProps) => (
                                    <SidebarMenuSubItem key={subItem.title}>
                                        <SidebarMenuSubButton asChild className={cn("cursor-pointer",
                                            pathname===subItem.url && "bg-sidebar-accent") }
                                            onClick={(e) => { e.stopPropagation(); router.push(subItem.url as string); }}>
                                                
                                                <div className="flex items-center ">
                                                    <subItem.icon />
                                                    <span>{subItem.title}</span>
                                                </div>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </>
                ) : null}
            </SidebarMenuItem>
        </Collapsible>
  )
}

export default SidebarSubItems