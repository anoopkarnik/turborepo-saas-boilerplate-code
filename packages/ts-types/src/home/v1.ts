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
    connections?: ConnectionCardProps[];
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
export enum ConnectionType {
    OAuth2 = 'OAuth2',
    ApiKey = 'ApiKey',
    Misc = 'Misc',
}
export interface ConnectionCardProps {
    title: string;
    description: string;
    logo: string;
    darkLogo: string;
    type: ConnectionType;
    clientId?: string;
    clientSecret?: string;
    oauthUrl?: string;
    published: boolean;
    showModal?: boolean;
    formElements?: ConnectionCardFormProps[];
}

export interface ConnectionCardFormProps {
    label: string;
    placeholder: string;
    type: string;
    name: string;
    required: boolean;
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