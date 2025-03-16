import { useEffect, useState } from "react";
import PricingItem from "../../../../molecules/custom/v1/PricingItem";
import { PricingSectionProps } from "@repo/ts-types/landing-page/pricing";


const Pricing = ({pricingSection}:{pricingSection:PricingSectionProps}) => {
  let href = "https://mail.google.com/mail?view=cm&fs=1&to="+pricingSection.supportEmailAddress+"&su=Support";
  const [headingArray,setHeadingArray] = useState<string[]>([])
  useEffect(()=>{
      if(pricingSection.heading){
          setHeadingArray(pricingSection.heading.split(" "))
      }
  },[pricingSection.heading])
  return (
    <section
      id="pricing"
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
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        {pricingSection.description}
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingSection.pricingList?.map((pricing) => (
          <PricingItem key={pricing.title} pricing={pricing} />
        ))}
      </div>
    </section>
  );
};

export default Pricing;