"use client"
import { useEffect, useState, useTransition } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../shadcn/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../molecules/shadcn/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "../../../atoms/shadcn/button";
import { MenuIcon, Coffee } from "lucide-react";
import { ModeToggle } from "../../../molecules/sidebar/ThemeToggleDropdown/v1";
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { NavbarSectionProps, RouteProps } from "@repo/ts-types/landing-page/navbar";
import { CompanyLogoName } from "../../../molecules/home/CompanyLogoName/v1";

const Navbar = ({navbarSection,showLandingRoutes=true}: {
  navbarSection: NavbarSectionProps,showLandingRoutes?:boolean}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {theme} = useTheme();
  const [starCount, setStarCount] = useState<number>(0);

  useEffect(() => {
    const fetchStarCount = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${navbarSection.githubUsername}/${navbarSection.githubRepositoryName}`);
        if (response.ok) {
          const data = await response.json();
          setStarCount(data.stargazers_count);
        } else {
          console.error("Failed to fetch star count");
        }
      } catch (error) {
        console.log("Error fetching star count:", error);
      }
    };
    if(navbarSection?.githubLink){
      fetchStarCount();
    }

  }, [theme,navbarSection]);
  

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-background font-geistMono">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <CompanyLogoName logo={navbarSection?.logo} darkLogo={navbarSection?.darkLogo} name={navbarSection?.title} />
          </NavigationMenuItem>

          
          <span className="flex md:hidden">
            <ModeToggle />

            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger className="px-2">
                <MenuIcon  onClick={() => setIsOpen(true)} className="flex md:hidden h-5 w-5" />
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    Shadcn/React
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {navbarSection?.routeList?.map(({ href, label }: RouteProps) => (
                    <a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={`rounded-sm ${buttonVariants({ variant: "ghost" })}`}
                    >
                      {label}
                    </a>
                  ))}
                  <a
                    rel="noreferrer noopener"
                    href={navbarSection?.githubLink}
                    target="_blank"
                    className={`w-[110px] border ${buttonVariants({
                      variant: "secondary", size:"sm"
                    })}`}
                  >
                      <GitHubLogoIcon className="mr-2 w-5 h-5" />
                    {starCount}
                  </a>
                  <a rel="noreferrer noopener" href={navbarSection?.donateNowLink}>    
                    <Button size="sm" className="rounded-sm">
                      Donate Now
                    </Button>
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          {showLandingRoutes && 
          <nav className="hidden md:flex gap-2">
            {navbarSection?.routeList?.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>}
          <div className="hidden md:flex gap-2 items-center">
            <a
              rel="noreferrer noopener"
              href={navbarSection?.githubLink}
              target="_blank"
              className={`border flex items-center rounded-sm ${buttonVariants({ variant: "secondary" ,size:"sm"})}`}
            >
              <GitHubLogoIcon className="mr-2 w-5 h-5" />
              {starCount}
            </a>
            <a rel="noreferrer noopener" href={navbarSection?.donateNowLink}>    
              <Button size="sm" className="rounded-sm" >
                Donate Now
              </Button>
            </a>

            {/* <ModeToggle /> */}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Navbar;