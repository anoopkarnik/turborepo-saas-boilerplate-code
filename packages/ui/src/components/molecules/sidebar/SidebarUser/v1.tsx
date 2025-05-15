"use client"

import {
  BookOpen,
  ChevronsUpDown,
  LogOut,
  MessageCircle,
  Send,
  Settings,
} from "lucide-react"
import React, { useEffect, useState } from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../atoms/shadcn/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../shadcn/dropdown"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../../organisms/shadcn/sidebar"
import { UserProps } from "@repo/ts-types/home/v1"
import { SettingsDialog } from "../../../templates/settings/Settings/v1"
import { Theme } from "../../home/Theme/v1"
import { authClient, signOut, useSession } from "@repo/auth/better-auth/auth-client"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"

const SidebarUser = ({ documentationLink,supportEmailAddress, githubUsername,githubRepositoryName,
    pricingList}:UserProps) => {

  const { data:session,status } = useSession();


        // Refresh session manually after login

  const { isMobile } = useSidebar()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSettingsClick = (e: React.MouseEvent) => {
    // Prevent the dropdown from closing
    e.preventDefault()
    e.stopPropagation()
    
    // Open the settings dialog
    setIsSettingsOpen(true)
  }
  const router = useRouter()
  const handleSignout = async() =>{
    await authClient.signOut()
    router.replace('/landing'); // use replace to avoid back navigation
    window.location.reload(); // FORCE session + cookies to refresh
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={session?.user?.image ?? ''} alt={session?.user?.name ?? ''}  className="object-cover"/>
                <AvatarFallback className="rounded-lg">{session?.user?.name?session?.user?.name[0]?.toUpperCase() :'U'}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{session?.user?.name}</span>
                <span className="truncate text-xs">{session?.user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={session?.user?.image ?? ''} alt={session?.user?.name ?? ''} className="object-cover"/>
                  <AvatarFallback className="rounded-lg">{session?.user?.name?session?.user?.name[0]?.toUpperCase() :'U'}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{session?.user?.name}</span>
                  <span className="truncate text-xs">{session?.user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <SettingsDialog 
                open={isSettingsOpen} 
                onOpenChange={(open) => {
                  setIsSettingsOpen(open)
                  // Ensure dropdown remains open when dialog is closed
                  if (!open) {
                    setIsDropdownOpen(true)
                  }
                }}
                pricingList={pricingList}
                supportEmailAddress={supportEmailAddress}
              >
                <DropdownMenuItem 
                  className="flex gap-2 cursor-pointer" 
                  onClick={handleSettingsClick}
                >
                  <Settings size={20}/>
                  Settings
                </DropdownMenuItem>
              </SettingsDialog>
                <DropdownMenuItem 
                      className="flex gap-2 cursor-pointer" 
                    >
                      <Theme/>
                  </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={handleSignout}>
              <LogOut  size={20} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default SidebarUser;