
import type { Metadata } from "next";
import "../../../packages/ui/src/styles/shadcn/shadcn-green.css"
import "../../../packages/ui/src/styles/custom/scroll.css"
import "../../../packages/ui/src/styles/custom/heroBackgroundAnimation.css"
import "../../../packages/ui/src/styles/custom/spotlight.css"
import { geistSans, geistMono, cyberdyne } from "@repo/ui/typography/font";
import { productDetails, title } from "../lib/constants/appDetails";
import { ThemeProvider } from "@repo/ui/providers/theme-provider";
import { Toaster } from "@repo/ui/molecules/home/Toaster/v1";
import { TanstackProvider } from "../providers/tanstack-provider";
import NextTopLoader from "nextjs-toploader";
import { VercelAnalytics,VercelSpeedInsights } from "@repo/analytics/vercel.ts";
import { GoogleAnalytics } from "@repo/analytics/google.ts";
import { DataProvider } from "../context/DataContext";
import ActiveStatus from "./(home)/(clones)/messenger-clone/_components/common/ActiveStatus";
import { TRPCReactProvider } from "@/trpc/client";
import { NuqsAdapter } from "nuqs/adapters/next";


export const metadata: Metadata = {
  title: title,
  description: productDetails,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` ${geistSans.className} ${geistMono.variable} ${cyberdyne.variable} antialiased`} >
        <NuqsAdapter>
        <TRPCReactProvider>
          <TanstackProvider>
            <NextTopLoader color="#10b981" showSpinner={false} />
            <ThemeProvider defaultTheme="dark"   >
              <DataProvider>
                <ActiveStatus/>
              {children}
              </DataProvider>
              <VercelAnalytics/>
              <VercelSpeedInsights/>
              <Toaster />
            </ThemeProvider>
          </TanstackProvider>
        </TRPCReactProvider>
        </NuqsAdapter>
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID as string}
        />
      </body>
    </html>
  );
}
