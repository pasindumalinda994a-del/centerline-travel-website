import type { Metadata } from "next";
import localFont from "next/font/local";
import { ConditionalFooter } from "@/app/components/layout/ConditionalFooter";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SmoothScroll } from "@/app/components/providers/SmoothScroll";
import "./globals.css";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Centreline Tours",
  description:
    "Discover the Sri Lanka that lives beyond the usual tourist trail.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${satoshi.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <SmoothScroll>
          <div className="flex min-h-svh flex-col">
            <SiteHeader />
            <div className="flex flex-1 flex-col">{children}</div>
            <ConditionalFooter />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
