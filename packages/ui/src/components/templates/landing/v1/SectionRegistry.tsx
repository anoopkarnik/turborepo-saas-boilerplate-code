// sectionRegistry.ts
import FAQ from '../../../organisms/custom/landing/v1/FAQ';
import Features from '../../../organisms/custom/landing/v1/Features';
import Footer from '../../../organisms/custom/landing/v1/Footer';
import Hero from '../../../organisms/custom/landing/v1/Hero';
import Newsletter from '../../../organisms/custom/landing/v1/Newsletter';
import Pricing from '../../../organisms/custom/landing/v1/Pricing';
import Team from '../../../organisms/custom/landing/v1/Team';
import TestimonialsV1 from '../../../organisms/custom/landing/v1/Testimonials';
import TestimonialsV2 from '../../../organisms/custom/landing/v2/Testimonials';

export const sectionRegistry = {
  hero: {
    v1: Hero
  },
  testimonials: {
    v1: TestimonialsV1,
    v2: TestimonialsV2,
  },
  footer: {
    v1: Footer
  },
  team: {
    v1: Team
  },
  newsletter: {
    v1: Newsletter
  },
  faq: {
    v1: FAQ
  },
  pricing: {
    v1: Pricing
  },
  features: {
    v1: Features
  }
  // Add other sections like team, faq, pricing, etc.
};
