import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "InsurIntel AI — Precision Underwriting for the Modern Era",
  description:
    "Make smarter insurance decisions with AI. Compare policies, inspect policy PDFs, simulate claims, and get AI-powered recommendations — all in one platform.",
  keywords: [
    "InsurIntel AI",
    "AI insurance",
    "underwriting",
    "policy analysis",
    "claim simulation",
    "insurance recommendations",
  ],
  authors: [{ name: "InsurIntel AI" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "InsurIntel AI",
    description: "Precision Underwriting for the Modern Era.",
    siteName: "InsurIntel AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InsurIntel AI",
    description: "Precision Underwriting for the Modern Era.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
