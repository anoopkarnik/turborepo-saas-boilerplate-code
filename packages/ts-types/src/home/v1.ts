import {User} from "@prisma/prisma/client";
import { PricingProps } from "../landing-page/pricing";

export interface sidebarHeaderItemsProps{
    title: string;
    icon?: any;
    url?: string;
    isActive?: boolean;
    items?: sidebarHeaderItemsProps[];
}

export interface sidebarHeaderProps {
    [key: string]: sidebarHeaderItemsProps[];
}

export interface sidebarFooterItemsProps {
    title: string;
    url: string;
    icon: any;
}

export interface CompanyLogoNameProps {
    name: string;
    logo: string;
    darkLogo: string;
}


export interface sidebarProps extends CompanyLogoNameProps,UserProps {
    items: sidebarHeaderProps;
    footerItems: sidebarFooterItemsProps[];
    showCredits: boolean;
    userDetails: User;
}



export interface UserProps {
    documentationLink?: string;
    supportEmailAddress?: string;
    githubUsername?: string;
    githubRepositoryName?: string;
    pricingList: PricingProps[];
}


export interface SettingsDialogProps extends UserProps {
    children?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    openedTab?: string;
  }
  
export interface SettingsHeaderProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export interface CreditsProps {
    creditsUsed: number;
    creditsTotal: number;
}

export interface NotificationProps {
    id: string;
    message: string;
    type: string;
    href: string;
    read: boolean;
    createdAt: string;
    updatedAt: string;
}