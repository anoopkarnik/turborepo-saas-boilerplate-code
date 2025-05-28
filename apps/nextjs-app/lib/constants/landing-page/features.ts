import { FeatureListProps, FeatureSectionProps, FeatureWithDescriptionProps } from "@repo/ts-types/landing-page/features";

export const featuresWithDescription: FeatureWithDescriptionProps[] = [
    {
      title: "Aesthetic Landing Page",
      description:
        "The landing page is designed to be minimalist and aesthetic inspired from https://github.com/leoMirandaa/shadcn-landing-page. It is designed to be responsive and mobile-friendly and easily customizable.",
      href:"./features/landing.png"
    },
    {
      title: "Atomic Design Shadcn Components",
      description:
        "All the Shadcn Components are stored in a atomic design manner as atoms, molecules. We have created organisms and templates using these components and some custom ones",
      href:"./features/shadcn.png"
    },
    {
      title: "Shadcn Themes",
      description:
        "All the Shadcn Themes can be used to change the look and feel of the landing page by just changing a import statement. We have created a dark and light theme for the landing page.",
      href:"./features/shadcn-themes.webp"
    },
    {
      title: "Authv5 Authentication",
      description:
        "Email Authentication with verification, forgot password, etc. Social Logins with Google, Github, Linkedin, etc. All the authentication is done using Authv5.",
      href:"./features/authv5.png"
    },
    {
      title: "Vercel Blob Storage",
      description:
        "Vercel Blob Storage is used to store the profile images of the users and also modify them.",
      href:"./features/vercel.jpg"
    },
    {
      title: "Prisma ORM",
      description:
        "Prisma ORM is used to store the user data.",
      href:"./features/prismaorm.jpg"
    },
    {
      title: "Profile Management Settings",
      description:
        "Profile Management Settings are used to change the user profile details.",
      href:"./features/settings.png"
    },
    {
      title: "Resend Email",
      description:
        "Resend Email is used to resend the verification and reset password email to the user.",
      href: "./features/resend.png"
    },
    {
      title: "Sidebar Navigation",
      description:
        "Sidebar Navigation is used to navigate to the different sections of the home page and also profile settings.",
      href: "./features/sidebar.png"
    },
    {
      title: "Notification System",
      description:
        "Notification System is used to see notifications of the user.",
      href: "./features/notifications.png"
    },
    {
      title: "Notion Client Library",
      description:
        "Notion Client Library is used to fetch the data from the Notion API.",
      href: "./features/notion.png"
    },
    {
      title: "OpenAI Client Library",
      description:
        "OpenAI Client Library is used to fetch the data from the OpenAI API.",
      href: "./features/openai.png"
    }

  ];

export const featureList: FeatureListProps[]= [
    {title: "Landing Page"},
    {title: "Dark/Light theme"},
    {title: "Docusaurus Documentation"},
    {title: "NextAuth Authentication"},
    {title: "Social Logins"},
    {title: "Shadcn Atomic Design Components"},
    {title: "Shadcn Themes"},
    {title: "Shadcn Templates"},
    {title: "Profile Management Settings"},
    {title: "Prisma ORM"},
    {title: "Resend Email"},
    {title: "Vercel Blob Storage"},
    {title: "Responsive design"},
    {title: "Minimalist"},
    {title: "Session Management"},
    {title: "Third Party Integrations"},
    {title: "Notification System"},
    {title: "Customized Pricing for API Credits"},
    {title: "Notion Client Library"},
    {title: "OpenAI Client Library"},
  ];

export const featureSection:FeatureSectionProps = {
    featuresWithDescription,
    featureList,
    heading: "Featues Used in This Boilerplate",
    description: "Our platform offers a wide range of features to help you manage your SaaS business."
};