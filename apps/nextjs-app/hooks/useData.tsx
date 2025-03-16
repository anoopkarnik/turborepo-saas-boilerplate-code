"use client";

import { useEffect, useState } from "react";
import { navbarSection } from "../lib/constants/landing-page/navbar";
import { testimonialSection } from "../lib/constants/landing-page/testimonials";
import { footerSection } from "../lib/constants/landing-page/footer";
import { teamSection } from "../lib/constants/landing-page/team";
import { heroSection } from "../lib/constants/landing-page/hero";
import { newsletterSection } from "../lib/constants/landing-page/newsletter";
import { faqSection } from "../lib/constants/landing-page/faq";
import { pricingSection } from "../lib/constants/landing-page/pricing";
import { featureSection } from "../lib/constants/landing-page/features";
import { termsOfService } from "../lib/constants/legal/termsOfService";
import { privacyPolicy } from "../lib/constants/legal/privacyPolicy";
import { cancellationRefundPolicies } from "../lib/constants/legal/cancellationRefundPolicies";
import { contactUs } from "../lib/constants/legal/contactUs";
import { getLegalDetails, getSaaSDetails } from "../actions/strapi/landing";

export const useData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [constantsType, setConstantsType] = useState("file");

  const [navbarSectionState, setNavbarSectionState] = useState(navbarSection);
  const [heroSectionState, setHeroSectionState] = useState(heroSection);
  const [featureSectionState, setFeatureSectionState] = useState(featureSection);
  const [testimonialSectionState, setTestimonialSectionState] = useState(testimonialSection);
  const [teamSectionState, setTeamSectionState] = useState(teamSection);
  const [faqSectionState, setFaqSectionState] = useState(faqSection);
  const [pricingSectionState, setPricingSectionState] = useState(pricingSection);
  const [newsletterSectionState, setNewsletterSectionState] = useState(newsletterSection);
  const [footerSectionState, setFooterSectionState] = useState(footerSection);

  const [termsOfServiceState, setTermsOfServiceState] = useState(termsOfService);
  const [privacyPolicyState, setPrivacyPolicyState] = useState(privacyPolicy);
  const [cancellationRefundPoliciesState, setCancellationRefundPoliciesState] = useState(cancellationRefundPolicies);
  const [contactUsState, setContactUsState] = useState(contactUs);

  useEffect(() => {
    const storedConstantsType = localStorage.getItem("constantsType") || "cms";
    setConstantsType(storedConstantsType);

    if (storedConstantsType === "cms") {
      updateDataFromStrapiCms();
    } else {
      setIsLoading(false);
    }
  }, []);

  const updateDataFromStrapiCms = async () => {
    setIsLoading(true);
    try {
      const saasDetails = await getSaaSDetails();
      setNavbarSectionState(saasDetails.navbarSection);
      setHeroSectionState(saasDetails.heroSection);
      setFeatureSectionState(saasDetails.featureSection);
      setTestimonialSectionState(saasDetails.testimonialSection);
      setTeamSectionState(saasDetails.teamSection);
      setFaqSectionState(saasDetails.faqSection);
      setPricingSectionState(saasDetails.pricingSection);
      setNewsletterSectionState(saasDetails.newsletterSection);
      setFooterSectionState(saasDetails.footerSection);

      const legalDetails = await getLegalDetails();
      setPrivacyPolicyState(legalDetails.privacyPolicy);
      setTermsOfServiceState(legalDetails.termsOfService);
      setCancellationRefundPoliciesState(legalDetails.cancellationRefundPolicies);
      setContactUsState(legalDetails.contactUs);
    } catch (error) {
      console.error("Error fetching CMS data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateDataFromFiles = () => {
    setNavbarSectionState(navbarSection);
    setHeroSectionState(heroSection);
    setFeatureSectionState(featureSection);
    setTestimonialSectionState(testimonialSection);
    setTeamSectionState(teamSection);
    setFaqSectionState(faqSection);
    setPricingSectionState(pricingSection);
    setNewsletterSectionState(newsletterSection);
    setFooterSectionState(footerSection);
    setPrivacyPolicyState(privacyPolicy);
    setTermsOfServiceState(termsOfService);
    setCancellationRefundPoliciesState(cancellationRefundPolicies);
    setContactUsState(contactUs);
  };

  const handleConstantsType = async () => {
    if (constantsType === "file") {
      await updateDataFromStrapiCms();
      setConstantsType("cms");
      localStorage.setItem("constantsType", "cms");
    } else {
      updateDataFromFiles();
      setConstantsType("file");
      localStorage.setItem("constantsType", "file");
    }
  };

  return {
    isLoading,
    navbarSectionState,
    heroSectionState,
    featureSectionState,
    testimonialSectionState,
    teamSectionState,
    faqSectionState,
    pricingSectionState,
    newsletterSectionState,
    footerSectionState,
    termsOfServiceState,
    privacyPolicyState,
    cancellationRefundPoliciesState,
    contactUsState,
    constantsType,
    handleConstantsType,
  };
};
