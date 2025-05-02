import { TestimonialSectionProps } from "@repo/ts-types/landing-page/testimonials";
import { Avatar, AvatarFallback, AvatarImage } from "../../../atoms/shadcn/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../molecules/shadcn/card";
import { useEffect, useState } from "react";


const Testimonials = ({testimonialSection}:{testimonialSection:TestimonialSectionProps}) => {
  const [headingArray,setHeadingArray] = useState<string[]>([])
  useEffect(()=>{
      if(testimonialSection.heading){
          setHeadingArray(testimonialSection.heading.split(" "))
      }
  },[testimonialSection.heading])
  return (
    <section
      id="testimonials"
      className="container py-24 sm:py-32"
    >
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

      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
        {testimonialSection.testimonials?.map(
          (testimonial) => (
            <Card
              key={testimonial.userName}
              className="max-w-md md:break-inside-avoid overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage
                    alt=""
                    src={testimonial.image}
                    className="object-cover"
                  />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.userName}</CardDescription>
                </div>
              </CardHeader>

              <CardContent>{testimonial.comment}</CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  );
};

export default Testimonials;