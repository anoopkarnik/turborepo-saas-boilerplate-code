"use client";

import { ThemeProvider } from "@repo/ui/providers/theme-provider";
import { SessionProviders } from "../../providers/session-provider";
import { Toaster } from "@repo/ui/molecules/custom/v1/Toaster";
import { TanstackProvider } from "../../providers/tanstack-provider";
import NextTopLoader from "nextjs-toploader";
import { VercelAnalytics,VercelSpeedInsights } from "@repo/analytics/vercel.ts";
import { GoogleAnalytics } from "@repo/analytics/google.ts";
import { DataProvider } from "../../context/DataContext";

const RootClientLayout = ({ children }: { children: React.ReactNode }) => {


  return (
    <>
      <SessionProviders>
        <TanstackProvider>
          <NextTopLoader color="#10b981" showSpinner={false} />
          <ThemeProvider defaultTheme="dark"   >
            <DataProvider>
            {children}
            </DataProvider>
            <VercelAnalytics/>
            <VercelSpeedInsights/>
            <Toaster />
          </ThemeProvider>
        </TanstackProvider>
      </SessionProviders>
      <GoogleAnalytics
        gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID as string}
      />
    </>
  );
};

export default RootClientLayout;
