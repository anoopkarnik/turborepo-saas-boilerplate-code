"use client"
import LandingPage from "@repo/ui/templates/landing/v1/LandingPage";

import { useRouter } from "next/navigation";

import { useGlobalData } from "../../context/DataContext";
import { useToast } from "@repo/ui/hooks/use-toast";
import { createContactAction } from "../../actions/email";
import LoadingPage from "@repo/ui/templates/landing/v1/LoadingPage";
import Navbar from "@repo/ui/organisms/custom/landing/v1/Navbar";

export default function Landing() {
  
  const {toast} = useToast();
  const data = useGlobalData();
  
  const createContact = async (email: string): Promise<{ success?: string; error?: string }> => {
    const res = await createContactAction(email); // Use function from newsletterSection
    if (res?.success) {
        toast({ title: "Success", description: res.success, variant: "default" });
        return { success: res.success };
    } else if (res?.error) {
        toast({ title: "Error", description: res.error, variant: "destructive" });
        return { error: res.error };
    }
    return {};
};

  const functionsToUse = {
    createContactAction : createContact,
}

  if (data.isLoading) {
    return (
      <LoadingPage />
    );
  }


  return (
    <div className="relative">
      <Navbar navbarSection={data.navbarSectionState} />
      <LandingPage
        heroSection={data.heroSectionState}
        featureSection={data.featureSectionState}
        testimonialSection={data.testimonialSectionState}
        teamSection={data.teamSectionState}
        faqSection={data.faqSectionState}
        pricingSection={data.pricingSectionState}
        newsletterSection={data.newsletterSectionState} 
        footerSection={data.footerSectionState}
        functionsToUse={functionsToUse}
      />
    </div>
  );
}
