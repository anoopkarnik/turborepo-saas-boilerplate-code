"use client"
import React, { useEffect, useState, useRef } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../../molecules/shadcn/dropdown';
import { MessageCircleQuestion } from 'lucide-react';
import { DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/navigation';
import { Separator } from '../../../../atoms/shadcn/separator';
import { HeroSectionProps } from '@repo/ts-types/landing-page/hero';
import { FooterSectionProps } from '@repo/ts-types/landing-page/footer';
import { NavbarSectionProps } from '@repo/ts-types/landing-page/navbar';

const Support = ({ heroSection, footerSection, navbarSection}: {
     heroSection: HeroSectionProps, footerSection: FooterSectionProps, navbarSection: NavbarSectionProps}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  useEffect(() => {
  },[heroSection,footerSection])

  const router = useRouter();

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
            <div
            ref={triggerRef}
            className='fixed bottom-4 right-4 flex items-center justify-center gap-2 p-4 rounded-full 
            bg-sidebar cursor-pointer opacity-80 hover:opacity-100'
            >
            <MessageCircleQuestion className='w-6 h-6 text-primary' />
            </div>
        </DropdownMenuTrigger >
        <DropdownMenuContent className='w-46 px-4'>
    
                {/* 🛠 Community & Support */}
                <DropdownMenuGroup>
                    <DropdownMenuLabel className='text-description'>Community & Support</DropdownMenuLabel>
                    <DropdownMenuItem className='cursor-pointer text-xs' 
                    onClick={() => window.open(`https://github.com/${navbarSection.githubUsername}/${navbarSection.githubRepositoryName}/issues/new?template=bug_report.md`, '_blank')}>
                        Report a Bug
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer text-xs'
                    onClick={() => window.open(`https://github.com/${navbarSection.githubUsername}/${navbarSection.githubRepositoryName}/issues/new?template=feature_request.md`, '_blank')}>
                        Feature Request
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <Separator className='my-2' />
                {/* 🌎 Join Us */}
                <DropdownMenuGroup>
                    <DropdownMenuLabel className='text-description'>Check Out</DropdownMenuLabel>
                    {footerSection?.footerList?.filter(item=> item.type === "Follow Us").map((item, index) => (
                            <DropdownMenuItem key={index} className='cursor-pointer text-xs' 
                            onClick={() => window.open(item.href, '_blank')}>
                                {item.label}
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuGroup>

                <Separator className='my-2' />
                {/* 📖 Resources */}
                {(heroSection.documentationLink && heroSection.blogLink) && 
                <DropdownMenuGroup>
                    <DropdownMenuLabel className='text-description'>Resources</DropdownMenuLabel>

                    {heroSection?.documentationLink && <DropdownMenuItem className='cursor-pointer text-xs'
                     onClick={() => router.push(heroSection.documentationLink as string)}>
                        Documentation
                    </DropdownMenuItem>}
                    {heroSection?.blogLink && <DropdownMenuItem className='cursor-pointer text-xs' 
                    onClick={() => router.push(heroSection.blogLink as string)}>
                        Blog
                    </DropdownMenuItem>}
                </DropdownMenuGroup>}
                <Separator className='mb-2' />
                {/* 📧 Contact Us */}

        </DropdownMenuContent>
    </DropdownMenu>

     
  );
};

export default Support;
