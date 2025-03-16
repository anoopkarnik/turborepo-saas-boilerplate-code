import { useEffect, useState } from "react";
import { Button } from "../../../../atoms/shadcn/button";
import { Input } from "../../../../atoms/shadcn/input";
import { NewsletterSectionProps } from "@repo/ts-types/landing-page/newsletter";

const Newsletter = ({newsletterSection,createContactAction}:{
  newsletterSection:NewsletterSectionProps,createContactAction:any}) => {

  const [email, setEmail] = useState<string>("");
  const [headingArray,setHeadingArray] = useState<string[]>([])
  useEffect(()=>{
      if(newsletterSection.heading){
          setHeadingArray(newsletterSection.heading.split(" "))
      }
  },[newsletterSection.heading])
  

  return (
    <section id="newsletter">
      <hr className="w-full mx-auto" />

      <div className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center leading-tight">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {headingArray.slice(0, Math.ceil(headingArray.length / 2)).join(" ")}
        </span>{" "}
        <span>
          {headingArray.slice(Math.ceil(headingArray.length / 2)).join(" ")}
        </span>
      </h2>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-8">
          {newsletterSection.description}
        </p>

        <div
          className="flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2 "
        >
          <Input
            placeholder={newsletterSection.supportEmailAddress}
            aria-label="email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={()=>{
            if (createContactAction) {
              createContactAction(email);
              setEmail('');
            }
          }}>Subscribe</Button>
      </div>
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};

export default Newsletter;