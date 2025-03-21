"use client"

import React, { useEffect, useState } from "react"
import { BadgeCheck,Bell,  CircleUserIcon,  Globe,Link, Lock,  RadioIcon,  ReceiptIcon,  Settings, 
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../../molecules/shadcn/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "../../organisms/shadcn/sidebar"
import MyAccountSettings from "../../organisms/custom/home/MyAccountSettings"
import { cn } from "../../../lib/utils"
import { SettingsDialogProps } from "@repo/ts-types/home/v1"
import { Avatar, AvatarFallback, AvatarImage } from "../../atoms/shadcn/avatar"
import MyConnectionsSettings from "../../organisms/custom/home/MyConnectionsSettings"
import SessionSettings from "../../organisms/custom/home/SessionSettings"
import PlansBilling from "../../organisms/custom/home/PlansBilling"
import { useSession } from "next-auth/react"
import { Button } from "../../atoms/shadcn/button"

const data = {
  nav: [
    { name: "My Account", icon: CircleUserIcon},
    { name: "Sessions", icon: RadioIcon },
    // { name: "Plans & Billing", icon: ReceiptIcon },
    { name: "Notifications", icon: Bell },
    { name: "Language & Region", icon: Globe },
    // { name: "My Connections", icon: Link },
    { name: "Privacy & Visibility", icon: Lock },
  ],
}


export function SettingsDialog({children, open: controlledOpen, onOpenChange: setControlledOpen,connections,
  pricingList,supportEmailAddress,openedTab}: SettingsDialogProps) {
  
    const { data:session,status } = useSession();
  
    const [user, setUser] = useState<any>(null)
  
          // Refresh session manually after login
    const refreshSession = async () => {
      const response = await fetch("/api/auth/session");
      const newSession = await response.json();
      setUser(newSession?.user || null);
    };
  
    useEffect(() => {
      const fetchUserData = async () => {
        if (status === "authenticated") {
          setUser(session?.user || null);
          if (!session?.user) return;
          
        } else if (status === "unauthenticated") {
          refreshSession();
        }
      }
      fetchUserData();
    }, [session, status]);

  const [internalOpen, setInternalOpen] = React.useState(false)

  // Determine which open state to use
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen

  // Determine which setOpen function to use
  const setOpen = setControlledOpen || setInternalOpen

  const [currentOpenedTab, setCurrentOpenedTab] = React.useState(openedTab || "My Account")

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
        <>
            <BadgeCheck />
            Account
        </>)}
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 max-h-[80%] max-w-[80%]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider>
          <Sidebar collapsible="none" className="hidden md:flex bg-secondary">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu >
                    <div className="text-description mt-[1px] ml-[1px]">Settings</div>
                    <div className="flex items-center space-x-2 ">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user?.image ?? ''} alt={user?.name ?? ''} className="object-cover"/>
                        <AvatarFallback className="rounded-lg bg-sidebar">{user?.name?user?.name[0]?.toUpperCase() :'U'}</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{user?.name}</span>
                        <span className="truncate text-description">{user?.email}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start my-2 gap-1 w-full">
                      {data.nav.map((item) => (
                        <SidebarMenuItem key={item.name}>
                          <SidebarMenuButton
                            asChild
                            className={cn("cursor-pointer hover:bg-accent2", item.name === currentOpenedTab && "bg-accent2")}
                          >
                            <Button variant={'secondary'} className="cursor-pointer shadow-none" onClick={()=>setCurrentOpenedTab(item.name)}>
                              <item.icon />
                              <span>{item.name}</span>
                            </Button>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex flex-1 flex-col overflow-auto h-[90vh] bg-sidebar">
            {currentOpenedTab === "My Account" && 
            <MyAccountSettings/>}
            {currentOpenedTab === "My Connections" && 
            <MyConnectionsSettings connections={connections} />}
            {currentOpenedTab === "Sessions" && 
            <SessionSettings />}
            {currentOpenedTab === "Plans & Billing" &&
            <PlansBilling pricingList={pricingList} supportEmailAddress={supportEmailAddress || ''}/>}
            
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
