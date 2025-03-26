
import type { Metadata } from "next";
import "../../../packages/ui/src/styles/shadcn/shadcn-green.css"
import "../../../packages/ui/src/styles/custom/scroll.css"
import "../../../packages/ui/src/styles/custom/heroBackgroundAnimation.css"
import { geistSans, geistMono, cyberdyne } from "@repo/ui/typography/font";

import RootClientLayout from "./_components/RootClientLayout";
import { productDetails, title } from "../lib/constants/appDetails";


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
        <RootClientLayout>{children}</RootClientLayout>
      </body>
    </html>
  );
}
