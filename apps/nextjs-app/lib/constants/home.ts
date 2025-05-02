import { sidebarFooterItemsProps, sidebarHeaderProps } from "@repo/ts-types/home/v1"
import {  Home, AppWindowIcon, BoxesIcon, CoinsIcon,Twitter, WorkflowIcon, BellIcon,
     CircleUserRoundIcon, BotIcon, MessageSquare, ImageIcon, VideoIcon, MusicIcon, 
     CodeIcon, UserPen, UserPlus, Facebook, Users,
     SquareStackIcon,
     GithubIcon,
     ShieldQuestionIcon,
     PresentationIcon} from "lucide-react"

export const sidebarItems:sidebarHeaderProps = 
{
    "Application":[
        {title: "Home", url: "/", icon: Home},
        {title: "Connections", url: "/connections", icon: BoxesIcon},
        {title: "Billing", url: "/billing", icon: CoinsIcon},
    ],
    "Clones":[
        {title: "Scrape Flow", url: "/scrape-flow", icon: AppWindowIcon, isActive:false, items: [
            {title: "Workflows", url: "/scrape-flow/workflows", icon: WorkflowIcon},
          ]},
          {title: "Twitter Clone", url: "/twitter-clone", icon: Twitter, isActive:false, items: [
              {title: "Notifications", url: "/twitter-clone/notifications", icon: BellIcon},
              {title: "Profile", url: "/twitter-clone/users", icon: CircleUserRoundIcon},
  
          ]},
          {title: "AI Generation", url: "/ai-generation", icon: BotIcon, isActive:false, items: [
              {title: "Conversation", url: "/ai-generation/conversation", icon: MessageSquare},
              {title: "Image Generation", url: "/ai-generation/image-generation", icon: ImageIcon},
              {title: "Video Generation", url: "/ai-generation/video-generation", icon: VideoIcon},
              {title: "Music Generation", url: "/ai-generation/music-generation", icon: MusicIcon},
              {title: "Code Generation", url: "/ai-generation/code-generation", icon: CodeIcon},
          ]},
          {title: "AI Companion", url: "/ai-companion", icon: UserPen, isActive:false, items: [
              {title: "Create Companion", url: "/ai-companion/companion", icon: UserPlus},
          ]},
          {title: "Messenger Clone", url: "/messenger-clone", icon: Facebook, isActive:false, items:[
              {title: "Users", url: "/messenger-clone/users", icon: Users},
          ]},
          {title: "PhotoAI Clone", url: "/photoai-clone", icon: SquareStackIcon,},
          {title: "AI Github", url: "/ai-github", icon: GithubIcon, isActive:false, items:[
              {title: "Q&A", url: "/ai-github/qa", icon: ShieldQuestionIcon},
              {title: "Meetings", url: "/ai-github/meetings", icon: PresentationIcon},
          ]},
    ]
}

export const sidebarFooterItems:sidebarFooterItemsProps[] = 
[
        // {title: "Documentation", url: "#", icon: BookOpen},
        // {title: "Settings", url: "#", icon: Settings2},
        // {title: "Support", url: "https://mail.google.com/mail/u/0/?fs=1&to=support@bsamaritan.com&su=Help&tf=cm", icon: LifeBuoy},
        // {title: "Feedback", url: "#", icon: Send}
]



