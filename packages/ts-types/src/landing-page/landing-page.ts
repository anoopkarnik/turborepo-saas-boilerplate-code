import { faqSectionProps } from "./faq";
import { FeatureSectionProps } from "./features";
import { FooterSectionProps } from "./footer";
import { HeroSectionProps } from "./hero";
import { NewsletterSectionProps } from "./newsletter";
import { PricingSectionProps } from "./pricing";
import { TeamSectionProps } from "./team";
import { TestimonialSectionProps } from "./testimonials";

export interface LandingPageProps  {
  heroSection: HeroSectionProps;
  featureSection?: FeatureSectionProps;
  testimonialSection?: TestimonialSectionProps;
  teamSection?: TeamSectionProps;
  faqSection?: faqSectionProps;
  newsletterSection?: NewsletterSectionProps;
  pricingSection?: PricingSectionProps;
  footerSection: FooterSectionProps;
  functionsToUse?: {
    createContactAction?: any;
  };
}
