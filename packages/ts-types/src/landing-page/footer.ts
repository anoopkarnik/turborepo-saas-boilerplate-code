  
  export interface FooterProps {
    label: string;
    href: string;
    type: string;                                                                                       
  }
  
  export interface FooterSectionProps {
    footerList: FooterProps[];
    creator: string;
    creatorLink: string;
    title: string;
    logo: string;
    darkLogo: string;
    version?: string;
  }
  