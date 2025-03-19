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
import { Input } from '../../../../atoms/shadcn/input';
import { Textarea } from '../../../../atoms/shadcn/textarea';
import { Button } from '../../../../atoms/shadcn/button';
import {sendSupportEmail} from '@repo/email/resend/index'

const Support = ({ heroSection, footerSection, navbarSection}: {
     heroSection: HeroSectionProps, footerSection: FooterSectionProps, navbarSection: NavbarSectionProps}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  useEffect(() => {
  },[heroSection,footerSection])

  const router = useRouter();

  const handleSendFeedback = async () => {
    if(message){
        const response = await fetch('/api/email/sendFeedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subject, message }),
        });
        console.log(response);
        const result = await response.json();
        console.log(result);
        setSubject('');
        setMessage('');
        }
    }

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
        <DropdownMenuContent className='w-[400px] px-4' onCloseAutoFocus={(e) => e.preventDefault()} >
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
                {/* 🛠 Feedback*/}
                <DropdownMenuGroup>
                    <DropdownMenuLabel className='text-description mb-2'>Feeback</DropdownMenuLabel>
                    <div className='flex flex-col gap-2'>
                        <Input 
                            placeholder='Subject' 
                            className='w-full bg-background'
                            value={subject}
                            onChange={(e)=>setSubject(e.target.value)}
                            onKeyDown={(e) => e.stopPropagation()} // Prevent dropdown navigation
                        />
                        <Textarea 
                            placeholder='Message (Required)' 
                            className='w-full'
                            value={message}
                            onChange={(e)=>setMessage(e.target.value)}
                            onKeyDown={(e) => e.stopPropagation()} // Prevent dropdown navigation
                        />
                        <Button size={'sm'} className='mb-2' onClick={handleSendFeedback}>Send Feedback</Button>
                    </div>
                </DropdownMenuGroup>

        </DropdownMenuContent>
    </DropdownMenu>

     
  );
};

export default Support;
