"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../../../molecules/shadcn/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "../../../atoms/shadcn/avatar";
import { TestimonialSectionProps } from "@repo/ts-types/landing-page/testimonials";

const Testimonials = ({testimonialSection}:{testimonialSection:TestimonialSectionProps}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const [headingArray,setHeadingArray] = useState<string[]>([])
    useEffect(()=>{
        if(testimonialSection.heading){
            setHeadingArray(testimonialSection.heading.split(" "))
        }
    },[testimonialSection.heading])

  useEffect(() => {
    if (!api) {
      return;
    }

    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 4000);
  }, [api, current]);

  return (
    <section id="testimonials" className="w-full  py-24 sm:py-32 space-y-8 relative">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
        <div>
        <h2 className="text-3xl md:text-4xl font-bold text-left leading-tight">
      <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
        {headingArray.slice(0, Math.ceil(headingArray.length / 2)).join(" ")}
      </span>{" "}
      <span>
        {headingArray.slice(Math.ceil(headingArray.length / 2)).join(" ")}
      </span>
    </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8">
        {testimonialSection.description}
      </p>
        </div>

          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
                {testimonialSection.testimonials?.map((testimonial) => (
                    <CarouselItem className="lg:basis-1/4" key={testimonial.name}>
                    <div className="bg-muted rounded-md p-6 min-h-[200px] flex flex-col justify-between ">
                            <div className="flex flex-col">
                                <h3 className="text-exmphasis tracking-tight">
                                {testimonial.comment}
                                </h3>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <Avatar className="h-10 w-10 overflow-hidden">
                                    <AvatarImage src={testimonial.image} className="h-full w-full object-cover" />
                                    <AvatarFallback>{testimonial.userName.slice(0,1)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-start text-">
                                    <div className="text-sm ">{testimonial.name}</div>
                                    <div className="text-description">{testimonial.title}</div>
                                </div>
                               
                            </div>
                    </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
                  {/* Shadow effect */}
                  <div className="shadow"></div>
    </section>
  );
};

export default Testimonials;