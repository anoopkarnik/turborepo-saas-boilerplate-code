"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../molecules/shadcn/dropdown";
import { MessageCircleQuestion } from "lucide-react";
import { useRouter } from "next/navigation";
import { HeroSectionProps } from "@repo/ts-types/landing-page/hero";
import { FooterSectionProps } from "@repo/ts-types/landing-page/footer";
import { NavbarSectionProps } from "@repo/ts-types/landing-page/navbar";
import { Input } from "../../../../atoms/shadcn/input";
import { Textarea } from "../../../../atoms/shadcn/textarea";
import { Button } from "../../../../atoms/shadcn/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../../molecules/shadcn/tabs";
import { SupportChat } from "../../home/SupportChat";
import CrispChat from "../../../../molecules/custom/v1/CrispChat";

const Support = ({
  heroSection,
  footerSection,
  navbarSection,
}: {
  heroSection: HeroSectionProps;
  footerSection: FooterSectionProps;
  navbarSection: NavbarSectionProps;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("feedback"); // Default Tab
  const triggerRef = useRef<HTMLDivElement>(null);
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  useEffect(() => {}, [heroSection, footerSection]);

  const router = useRouter();

  const handleSendFeedback = async () => {
    if (message) {
      const response = await fetch("/api/email/sendFeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message }),
      });
      const result = await response.json();
      setSubject("");
      setMessage("");
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <div
          ref={triggerRef}
          className="fixed bottom-4 right-6 flex items-center justify-center gap-2 p-4 rounded-full bg-sidebar-foreground/30s dark:bg-sidebar cursor-pointer opacity-80 hover:opacity-100 z-50"
        >
          <MessageCircleQuestion className="w-6 h-6 text-primary" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[600px] px-4 max-h-screen pb-20" onCloseAutoFocus={(e) => e.preventDefault()}>
        <Tabs defaultValue="feedback" className="w-full">
          {/* 📌 Content Sections */}
          <TabsContent value="feedback">
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Subject"
                className="w-full bg-background"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()} // Prevent dropdown navigation
              />
              <Textarea
                placeholder="Message (Required)"
                className="w-full h-[200px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()} // Prevent dropdown navigation
              />
              <Button size={"sm"} className="mb-2" onClick={handleSendFeedback}>
                Send Feedback
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="flex flex-col gap-2">
                <p className="text-description text-sm">For Details:</p>

                    {heroSection?.documentationLink && 
                    <DropdownMenuItem className='cursor-pointer text-sm'
                        onClick={() => router.push(heroSection.documentationLink as string)}>
                            Documentation
                        </DropdownMenuItem>}
                    {heroSection?.blogLink && 
                    <DropdownMenuItem className='cursor-pointer text-sm' 
                    onClick={() => router.push(heroSection.blogLink as string)}>
                        Blog
                    </DropdownMenuItem>}
            </div>
          </TabsContent>
          <TabsContent value="supportbot">
            <SupportChat />
          </TabsContent>
          <TabsContent value="chat">
            <CrispChat />
          </TabsContent>
          <TabsContent value="social">
            <div className="flex flex-col gap-2">
              <p className="text-description text-sm">Follow us on:</p>
              {footerSection?.footerList
                ?.filter((item) => item.type === "Follow Us")
                .map((item, index) => (
                
                    <DropdownMenuItem className='cursor-pointer text-sm' key={index}
                    onClick={() => window.open(item.href, "_blank")}>
                        {item.label}
                        </DropdownMenuItem>

                ))}
            </div>
          </TabsContent>

          {/* 🔥 Tabs at the Bottom */}
          <TabsList className="absolute bottom-0 left-0 w-full  p-2 rounded-b-lg flex justify-around">
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="supportbot">Support Bot</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Support;
