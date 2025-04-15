"use client"
import {  BookIcon, LogIn } from "lucide-react";
import { Button } from "../../../../atoms/shadcn/button";
import { useEffect, useState } from "react";
import { HeroSectionProps } from "@repo/ts-types/landing-page/hero";
import { FeatureWithDescriptionProps } from "@repo/ts-types/landing-page/features";
import { TestimonialProps } from "@repo/ts-types/landing-page/testimonials";
import { TeamProps } from "@repo/ts-types/landing-page/team";
import { useRouter } from "next/navigation";
import { PricingProps } from "@repo/ts-types/landing-page/pricing";
import TypewriterComponent from 'typewriter-effect';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../../../molecules/shadcn/carousel";


const Hero = ({heroSection, features ,testimonials, pricingList,teamList}:{
  heroSection:HeroSectionProps ,features:FeatureWithDescriptionProps[]  | undefined,testimonials:TestimonialProps[] | undefined,
  pricingList: PricingProps[]| undefined, teamList:TeamProps[]  | undefined}) => {
    const [taglineArray,setTaglineArray] = useState<string[]>([])
    const router = useRouter()
    useEffect(()=>{
        if(heroSection.tagline){
            setTaglineArray(heroSection.tagline.split(" "))
        }
        console.log(heroSection)
    },[heroSection.tagline,heroSection.getStartedLink,heroSection.documentationLink,heroSection.blogLink])
  return (
    <section className="container flex flex-col justify-center items-center py-20 md:py-32 gap-10">
      <div className="text-center  space-y-6">
      <main className="text-5xl md:text-6xl text-left leading-tight">
        <h1 className="inline-block">
          <span className="bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
            {taglineArray.slice(0, Math.ceil(taglineArray.length / 3)).join(" ")}
          </span>{" "}
          <span>
            {taglineArray
              .slice(Math.ceil(taglineArray.length / 3), Math.ceil((2 * taglineArray.length) / 3))
              .join(" ")}
          </span>{" "}
          <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
            {taglineArray.slice(Math.ceil((2 * taglineArray.length) / 3)).join(" ")}
          </span>
        </h1>
      </main>


        <div className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          <TypewriterComponent 
            options={{
              strings: heroSection.description ? [heroSection.description] : [],
              autoStart: true,
              loop: true,
            }}/>
        </div>

        <div className="flex items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
        {heroSection.documentationLink && <div>
            <Button
            className="flex items-center gap-2"
              variant="outline"
              onClick={() => heroSection.documentationLink && router.push(heroSection.documentationLink)}
            ><BookIcon size={20} /> Documentation
            </Button>
            </div>}
            { heroSection.blogLink &&           
            <Button
             className="flex items-center gap-2"
              variant="outline"
              onClick={() => heroSection.blogLink && router.push(heroSection.blogLink)}
            > <BookIcon size={20} />
            Read the Blogs
            </Button>}
            
            { heroSection.getStartedLink &&           
            <Button
             className="flex items-center gap-2"
              variant="default"
              size="lg"
              onClick={() => heroSection.getStartedLink && router.push(heroSection.getStartedLink)}
            > 
            Get Started
            </Button>}
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
      <Carousel>
            <CarouselContent>
            <div className="shadow"></div>
                <CarouselItem>

                </CarouselItem>
                <CarouselItem>...</CarouselItem>
                <CarouselItem>...</CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
        
      </div>


    </section>
  );
};

export default Hero;