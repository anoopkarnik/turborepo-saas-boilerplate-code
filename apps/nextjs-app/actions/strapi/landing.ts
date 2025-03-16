"use server"

import axios from 'axios';

export const getSaaSDetails = async () => {
    try{
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL + "/api/" || "http://localhost:1337/api/";
        const database = "company-landing-page";
        const populateNavbarSection = "populate[navbarSection][populate]p[0]=routeList"
        const populateHeroSection = "populate[heroSection]=true"
        const populateAboutSection = "populate[aboutSection]=true"
        const populateProjectsSection = "populate[projectSection][populate][projects][populate][0]=websiteDetails&populate[projectSection][populate][projects][populate][1]=notionDetails&populate[projectSection][populate][projects][populate][2]=openSourceDetails&populate[projectSection][populate][projects][populate][3]=techStack&populate[projectSection][populate][projects][populate][4]=contentDetails"
        const populateServicesSection = "populate[serviceSection][populate][0]=services"
        const populateTeamSection = "populate[teamSection][populate][0]=teamList"
        const populateTestimonialSection = "populate[testimonialSection][populate][0]=testimonials"
        const populateFooterSection = "populate[footerSection][populate][0]=footerList"
        const url = `${baseUrl}${database}?${populateNavbarSection}&${populateHeroSection}&${populateAboutSection}&${populateServicesSection}&${populateTeamSection}&${populateTestimonialSection}&${populateProjectsSection}&${populateFooterSection}`;
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
          return result.data;
    }
    catch(e){
        console.log(e);
        return null;
    }
}     

export const getLegalDetails = async () => {
  try{
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL + "/api/" || "http://localhost:1337/api/";
      const database = "company-landing-page";
      const populateNavbarSection = "populate[navbarSection]=true"
      const populateTermsOfService = "populate[termsOfService]=true"
      const populatePrivacyPolicy = "populate[privacyPolicy]=true"
      const populateCancellationRefundPolicies = "populate[cancellationRefundPolicies]=true"
      const populateContactUs = "populate[contactUs]=true"
      const url = `${baseUrl}${database}?${populateNavbarSection}&${populateTermsOfService}&${populatePrivacyPolicy}&${populateCancellationRefundPolicies}&${populateContactUs}`;
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
        return result.data;
  }
  catch(e){
      console.log(e);
      return null;
  }

}     
