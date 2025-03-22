import { sidebarFooterItemsProps, sidebarHeaderProps } from "@repo/ts-types/home/v1"
import {  Home, Inbox, AppWindowIcon, BoxesIcon, CoinsIcon,Twitter, WorkflowIcon, BellIcon, CircleUserRoundIcon, BotIcon, MessageSquare, ImageIcon, VideoIcon, MusicIcon, CodeIcon } from "lucide-react"

export const sidebarItems:sidebarHeaderProps = 
{
    "Application":[
        {title: "Home", url: "/", icon: Home},
        {title: "Scrape Flow", url: "/scrape-flow", icon: AppWindowIcon, isActive:false, items: [
          {title: "Workflows", url: "/scrape-flow/workflows", icon: WorkflowIcon},
        ]},
        {title: "Twitter Clone", url: "/twitter-clone", icon: Twitter, isActive:false, items: [
            {title: "Notifications", url: "/twitter-clone/notifications", icon: BellIcon},
            {title: "Profile", url: "/twitter-clone/users", icon: CircleUserRoundIcon},

        ]},
        {title: "AI SaaS", url: "/ai-saas", icon: BotIcon, isActive:false, items: [
            {title: "Conversation", url: "/ai-saas/conversation", icon: MessageSquare},
            {title: "Image Generation", url: "/ai-saas/image-generation", icon: ImageIcon},
            {title: "Video Generation", url: "/ai-saas/video-generation", icon: VideoIcon},
            {title: "Music Generation", url: "/ai-saas/music-generation", icon: MusicIcon},
            {title: "Code Generation", url: "/ai-saas/code-generation", icon: CodeIcon},
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



