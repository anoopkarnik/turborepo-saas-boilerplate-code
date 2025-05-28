import { NavbarSectionProps, RouteProps } from "@repo/ts-types/landing-page/navbar";
import { githubLink, githubUsername, githubRepositoryName, title, logo, darkLogo, } from "../appDetails";

export const routeList: RouteProps[] = [
  {href: "#features", label: "Features",},
  {href: "#testimonials", label: "Testimonials",},
  {href: "#pricing", label: "Pricing",},
  {href: "#faq", label: "FAQ",}
]

export const navbarSection:NavbarSectionProps = {
    routeList,
    githubLink,
    githubUsername,
    githubRepositoryName,
    title,
    logo,
    darkLogo,
}