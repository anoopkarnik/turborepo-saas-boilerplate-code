import { faqSectionProps } from "@repo/ts-types/landing-page/faq";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../../../molecules/shadcn/accordion";
import { useEffect, useState } from "react";


  
  const FAQ = ({FAQSection}:{FAQSection:faqSectionProps}) => {

    let href = "https://mail.google.com/mail?view=cm&fs=1&to="+FAQSection.supportEmailAddress+"&su=Support";

    const [headingArray,setHeadingArray] = useState<string[]>([])
    useEffect(()=>{
        if(FAQSection.heading){
            setHeadingArray(FAQSection.heading.split(" "))
        }
    },[FAQSection.heading])

    return (
      <section
        id="faq"
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
  
        <Accordion
          type="single"
          collapsible
          className="w-full AccordionRoot"
        >
          {FAQSection.faqList?.map((faq) => (
            <AccordionItem
              key={faq.value}
              value={faq.value}
            >
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
  
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
  
        <h3 className="font-medium mt-4">
          Still have questions?{" "}
          <a
            rel="noreferrer noopener"
            href={href}
            target="_blank"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Contact us
          </a>
        </h3>
      </section>
    );
  };

  export default FAQ;