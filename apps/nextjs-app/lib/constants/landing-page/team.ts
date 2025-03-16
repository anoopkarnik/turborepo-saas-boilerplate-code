import { TeamProps, TeamSectionProps } from "@repo/ts-types/landing-page/team";

export const teamList: TeamProps[] = [
    {
      imageUrl: "/anoop.jpg",
      name: "Anoop Karnik Dasika",
      position: "Founder",
      description: "Just into creating Sci-Fi stuff. Currently working on automation and gamifying the boring stuff, we do in life.",
      socialNetworks: [
        {
          name: "Linkedin",
          url: "https://www.linkedin.com/in/anoopkarnik/",
        },
        {
          name: "Facebook",
          url: "https://www.facebook.com/anoop.karnik1",
        },
        {
          name: "Instagram",
          url: "https://www.instagram.com/anoopkarnik",
        },
        {
          name: "Twitter",
          url: "https://twitter.com/anooplegend1992",
        },
        {
          name: "Github",
          url: "https://github.com/anoopkarnik",
        },
        {
          name: "Youtube",
          url: "https://www.youtube.com/@bayesianlabs",
        }
      ]
    }
  ];

export const teamSection: TeamSectionProps = {
    heading: "Our Dedicated Crew",
    description: `Some of the best people in the industry are working with us,
    as we are the only ones in the industry of spontaneous product development.`,
    teamList
}