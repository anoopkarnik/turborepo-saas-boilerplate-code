import { sidebarFooterItemsProps, sidebarHeaderProps } from "@repo/ts-types/home/v1"
import {  Home, Inbox, AppWindowIcon, BoxesIcon, CoinsIcon,Twitter } from "lucide-react"

export const sidebarItems:sidebarHeaderProps = 
{
    "Application":[
        {title: "Home", url: "/", icon: Home},
        {title: "Systems", url: "/systems", icon: Inbox, isActive:true, items: [
            {title: "System 1", url: "/systems/system1"},
            {title: "System 2", url: "/systems/system2"},
            {title: "System 3", url: "/systems/system3"},
        ]},
        {title: "Scrape Flow", url: "/scrape-flow", icon: AppWindowIcon, isActive:true, items: [
          {title: "Workflows", url: "/scrape-flow/workflows"},
        ]},
        {title: "Twitter Clone", url: "/twitter-clone", icon: Twitter, isActive:true, items: [
            {title: "Notifications", url: "/twitter-clone/notifications"},
            {title: "Profile", url: "/twitter-clone/profile"},

        ]},
        {title: "Connections", url: "/connections", icon: BoxesIcon},
        {title: "Billing", url: "/billing", icon: CoinsIcon},
    ],
}

export const sidebarFooterItems:sidebarFooterItemsProps[] = 
[
        // {title: "Documentation", url: "#", icon: BookOpen},
        // {title: "Settings", url: "#", icon: Settings2},
        // {title: "Support", url: "https://mail.google.com/mail/u/0/?fs=1&to=support@bsamaritan.com&su=Help&tf=cm", icon: LifeBuoy},
        // {title: "Feedback", url: "#", icon: Send}
]



