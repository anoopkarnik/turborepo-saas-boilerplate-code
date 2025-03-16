export interface TeamProps {
    imageUrl: string;
    name: string;
    position: string;
    description: string;
    socialNetworks: SociaNetworksProps[];
  }
  
  export interface SociaNetworksProps {
    name: string;
    url: string;
  }

  export interface TeamSectionProps {
    teamList: TeamProps[];
    heading: string;
    description: string;
  }