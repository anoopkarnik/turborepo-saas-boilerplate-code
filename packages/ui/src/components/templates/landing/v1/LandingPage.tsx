"use client"
import Navbar from '../../../organisms/custom/landing/v1/Navbar';
import Hero from '../../../organisms/custom/landing/v1/Hero';
import Testimonials from '../../../organisms/custom/landing/v2/Testimonials';
import Footer from '../../../organisms/custom/landing/v1/Footer';
import Team  from '../../../organisms/custom/landing/v1/Team';
import Newsletter from '../../../organisms/custom/landing/v1/Newsletter';
import { LandingPageProps } from '@repo/ts-types/landing-page/landing-page';
import FAQ from '../../../organisms/custom/landing/v1/FAQ';
import Pricing from '../../../organisms/custom/landing/v1/Pricing';
import Features from '../../../organisms/custom/landing/v1/Features';

const LandingPage = ({heroSection,featureSection,testimonialSection,
  teamSection,faqSection,newsletterSection,pricingSection,footerSection,functionsToUse
 }: LandingPageProps) => {
    

  return (
    <div className='flex flex-col items-center justify-center'>
      <Hero heroSection={heroSection} features={featureSection?.featuresWithDescription} testimonials={testimonialSection?.testimonials} 
      teamList={teamSection?.teamList} pricingList={pricingSection?.pricingList}/>
      {featureSection  && (featureSection.featureList.length>0 || featureSection.featuresWithDescription.length>0) && 
       <Features featureSection={featureSection} />}
      {testimonialSection && <Testimonials testimonialSection={testimonialSection}/>}
      {teamSection && teamSection.teamList.length>0 &&<Team teamSection={teamSection} />}
      {newsletterSection && <Newsletter newsletterSection={newsletterSection} createContactAction={functionsToUse?.createContactAction}/>}
      {pricingSection && pricingSection.pricingList.length>0 && <Pricing pricingSection={pricingSection}/>}

      {faqSection && faqSection.faqList.length>0 && <FAQ FAQSection={faqSection}/>} 
      {footerSection &&  <Footer footerSection={footerSection}/>}
    </div>
  );
};

export default LandingPage