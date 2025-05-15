"use client"
import { LandingPageProps } from '@repo/ts-types/landing-page/landing-page';
import { sectionRegistry } from '../SectionRegistry';

const LandingPage = ({heroSection,featureSection,testimonialSection,
  teamSection,faqSection,newsletterSection,pricingSection,footerSection,functionsToUse
 }: LandingPageProps) => {

    const HeroSection = sectionRegistry?.hero?.[heroSection?.version as keyof typeof sectionRegistry.hero || "v1"];

    // const HeroSection = sectionRegistry?.hero?.["v1"]

    const FeatureSection = sectionRegistry?.features?.[featureSection?.version as keyof typeof sectionRegistry.features || "v1"];
    const TestimonialSection = sectionRegistry?.testimonials?.[testimonialSection?.version as keyof typeof sectionRegistry.testimonials || "v1"];
    const TeamSection = sectionRegistry?.team?.[teamSection?.version as keyof typeof sectionRegistry.team || "v1"];
    const NewsletterSection = sectionRegistry?.newsletter?.[newsletterSection?.version as keyof typeof sectionRegistry.newsletter || "v1"];
    const FAQSection = sectionRegistry?.faq?.[faqSection?.version as keyof typeof sectionRegistry.faq || "v1"];
    const PricingSection = sectionRegistry?.pricing?.[pricingSection?.version as keyof typeof sectionRegistry.pricing || "v1"];
    const FooterSection = sectionRegistry?.footer?.[footerSection?.version as keyof typeof sectionRegistry.footer || "v1"];
    

  return (
    <div className='flex flex-col items-center justify-center'>
      <HeroSection heroSection={heroSection} features={featureSection?.featuresWithDescription} testimonials={testimonialSection?.testimonials} 
      teamList={teamSection?.teamList} pricingList={pricingSection?.pricingList} videoUrl={heroSection?.videoUrl}/>
      {featureSection  && (featureSection.featureList.length>0 || featureSection.featuresWithDescription.length>0) && 
       <FeatureSection featureSection={featureSection} />}
      {testimonialSection && 
        <TestimonialSection testimonialSection={testimonialSection}/>}
      {teamSection && teamSection.teamList.length>0 &&
      <TeamSection teamSection={teamSection} />}
      {newsletterSection && <NewsletterSection newsletterSection={newsletterSection} createContactAction={functionsToUse?.createContactAction}/>}
      {pricingSection && pricingSection.pricingList.length>0 && 
      <PricingSection pricingSection={pricingSection}/>}

      {faqSection && faqSection.faqList.length>0 && <FAQSection FAQSection={faqSection}/>} 
      {footerSection &&  <FooterSection footerSection={footerSection}/>}
    </div>
  );
};

export default LandingPage