import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureWithDescriptionProps = {
  title: string;
  description: string;
  href: string;
};

export const featuresWithDescription: FeatureWithDescriptionProps[] = [
  {
    title: "Aesthetic Landing Page",
    description:
      "The landing page is designed to be minimalist and aesthetic inspired from https://github.com/leoMirandaa/shadcn-landing-page. It is designed to be responsive and mobile-friendly and easily customizable.",
    href:"./img/features/landing.png"
  },
  {
    title: "Atomic Design Shadcn Components",
    description:
      "All the Shadcn Components are stored in a atomic design manner as atoms, molecules. We have created organisms and templates using these components and some custom ones",
    href:"./img/features/shadcn.png"
  },
  {
    title: "Shadcn Themes",
    description:
      "All the Shadcn Themes can be used to change the look and feel of the landing page by just changing a import statement. We have created a dark and light theme for the landing page.",
    href:"./img/features/shadcn-themes.webp"
  },
  {
    title: "Authv5 Authentication",
    description:
      "Email Authentication with verification, forgot password, etc. Social Logins with Google, Github, Linkedin, etc. All the authentication is done using Authv5.",
    href:"./img/features/authv5.png"
  },
  {
    title: "Razorpay Payments",
    description:
      "Razorpay Payments are integrated into the landing page.",
    href:"./img/features/razorpay.webp"
  },
  {
    title: "Vercel Blob Storage",
    description:
      "Vercel Blob Storage is used to store the profile images of the users and also modify them.",
    href:"./img/features/vercel.jpg"
  },
  {
    title: "Prisma ORM",
    description:
      "Prisma ORM is used to store the user data.",
    href:"./img/features/prismaorm.jpg"
  },
  {
    title: "Profile Management Settings",
    description:
      "Profile Management Settings are used to change the user profile details.",
    href:"./img/features/settings.png"
  },
  {
    title: "Resend Email",
    description:
      "Resend Email is used to resend the verification and reset password email to the user.",
    href: "./img/features/resend.png"
  },
  {
    title: "Sidebar Navigation",
    description:
      "Sidebar Navigation is used to navigate to the different sections of the home page and also profile settings.",
    href: "./img/features/sidebar.png"
  },
  {
    title: "Notification System",
    description:
      "Notification System is used to see notifications of the user.",
    href: "./img/features/notifications.png"
  },
  {
    title: "Customized Pricing for API Credits using Cashfree Payments",
    description:
      "Customized Pricing for API Credits is used to show the pricing of the API Credits.",
    href: "./img/features/cashfree.avif"
  },
  {
    title: "Notion Client Library",
    description:
      "Notion Client Library is used to fetch the data from the Notion API.",
    href: "./img/features/notion.png"
  },
  {
    title: "OpenAI Client Library",
    description:
      "OpenAI Client Library is used to fetch the data from the OpenAI API.",
    href: "./img/features/openai.png"
  }

];


function Feature({title,description,href}: FeatureWithDescriptionProps) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={href} alt={title} width="180" height="100"/>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {featuresWithDescription.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
