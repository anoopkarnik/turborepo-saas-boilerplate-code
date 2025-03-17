"use server"

import axios from 'axios';

export const getSaaSDetails = async () => {
    try{
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL + "/api/" || "http://localhost:1337/api/";
        const database = "saas-landing-pages";
        const filter = "filter[slug][$eq]=saas-landing-page-1"
        const populateNavbarSection = "populate[navbarSection][populate][0]=routeList"
        const populateHeroSection = "populate[heroSection]=true"
        const populateFaqSection = "populate[faqSection][populate][0]=faqList"
        const populateNewsletterSection = "populate[newsletterSection]=true"
        const populateFeatureSection = "populate[featureSection][populate][0]=featureList&populate[featureSection][populate][1]=featuresWithDescription"
        const populateTestimonialSection = "populate[testimonialSection][populate][0]=testimonials"
        const populateFooterSection = "populate[footerSection][populate][0]=footerList"
        const url = `${baseUrl}${database}?${filter}&${populateNavbarSection}&${populateHeroSection}&${populateFeatureSection}&
        ${populateTestimonialSection}&${populateFooterSection}&${populateFaqSection}&${populateNewsletterSection}`;
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url,
            headers: { 
              'Authorization': `Bearer ${process.env.STRAPI_TOKEN ?? ""}`
            }
          };
          const response  = await axios.request(config);
          const result = await response.data;
          return result.data[0];
    }
    catch(e){
        console.log(e);
        return null;
    }
}     

export const getLegalDetails = async () => {
  try{
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL + "/api/" || "http://localhost:1337/api/";
      const database = "saas-landing-pages";
      const filter = "filter[slug][$eq]=saas-landing-page-1"
      const populateNavbarSection = "populate[navbarSection]=true"
      const populateTermsOfService = "populate[termsOfService]=true"
      const populatePrivacyPolicy = "populate[privacyPolicy]=true"
      const populateCancellationRefundPolicies = "populate[cancellationRefundPolicies]=true"
      const populateContactUs = "populate[contactUs]=true"
      const url = `${baseUrl}${database}?${filter}`;
      const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url,
          headers: { 
            'Authorization': `Bearer ${process.env.STRAPI_TOKEN ?? ""}`
          }
        };
        const response  = await axios.request(config);
        const result = await response.data;
        return result.data[0];
  }
  catch(e){
      console.log(e);
      return null;
  }

}     
