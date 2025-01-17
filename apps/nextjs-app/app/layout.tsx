
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../../packages/ui/src/styles/shadcn/shadcn-green.css"
import "../../../packages/ui/src/styles/custom/scroll.css"
import { ThemeProvider } from "@repo/ui/providers/theme-provider";
import "../../../packages/ui/src/styles/custom/heroBackgroundAnimation.css"
import { SessionProviders } from "../providers/session-provider";
import { Toaster } from "@repo/ui/molecules/custom/v1/Toaster";
import { Analytics } from "@vercel/analytics/react"
import { TanstackProvider } from "../providers/tanstack-provider";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleAnalytics } from "@next/third-parties/google";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Turborepo Micro SaaS Boilerplate",
  description: "Build your Turborepo Micro SaaS Application in turborepo effortlessly by keeping and modifying the required components, packages and apps to your project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <SessionProviders>
            <TanstackProvider>
              <ThemeProvider defaultTheme="dark" >
                {children}
                <Analytics/>
                <SpeedInsights/>
                <Toaster />
              </ThemeProvider>
            </TanstackProvider>
          </SessionProviders>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID as string}/>
      </body>
    </html>
  );
}
