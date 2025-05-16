// sectionRegistry.ts
import FAQ from '../../organisms/landing/FAQ/v1';
import FeaturesV1 from '../../organisms/landing/Features/v1';
import FeaturesV2 from '../../organisms/landing/Features/v2';
import Footer from '../../organisms/landing/Footer/v1';
import HeroV1 from '../../organisms/landing/Hero/v1';
import HeroV2 from '../../organisms/landing/Hero/v2';

import Newsletter from '../../organisms/landing/Newsletter/v1';
import Pricing from '../../organisms/landing/Pricing/v1';
import Team from '../../organisms/landing/Team/v1';
import TestimonialsV1 from '../../organisms/landing/Testimonials/v1';
import TestimonialsV2 from '../../organisms/landing/Testimonials/v2';

export const sectionRegistry = {
  hero: {
    v1: HeroV1,
    v2: HeroV2
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
    v1: FeaturesV1,
    v2: FeaturesV2
  }
  // Add other sections like team, faq, pricing, etc.
};
