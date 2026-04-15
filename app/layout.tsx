import type {Metadata} from 'next';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL('https://examresize.online'),
  title: 'Exam Form Photo & Signature Resizer | ExamResize',
  description: 'Instantly resize and compress photos, signatures, and documents for online exam forms. Optimize dimensions and file size for SSC, UPSC, Banking, and NEET.',
  keywords: ['exam photo resizer', 'signature resize', 'ssc photo resize', 'upsc photo resize', 'banking exam photo converter', '20kb photo converter', '50kb photo converter'],
  authors: [{ name: 'ExamResize' }],
  openGraph: {
    title: 'Exam Form Photo & Signature Resizer | ExamResize',
    description: 'The most reliable tool to resize and compress photos for government exam forms. Support for SSC, UPSC, Banking, and other competitive exams in India.',
    siteName: 'ExamResize',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exam Form Photo & Signature Resizer | ExamResize',
    description: 'Quickly resize and compress your photos and documents for online exam applications. Ensure your application is accepted with correct image dimensions.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" }
    ]
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "ExamResize",
  }
};

import { GoogleAnalytics } from '@next/third-parties/google';
import { TooltipProvider } from "@/components/ui/tooltip";
import AdSenseInit from '@/components/AdSenseInit';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>
        <AdSenseInit />
        <TooltipProvider>
          {children}
          <Analytics />
          <Toaster position="top-center" />
        </TooltipProvider>
        <GoogleAnalytics gaId="G-LYXYW6ZM7K" />
      </body>
    </html>
  );
}
