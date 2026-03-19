import type {Metadata} from 'next';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/next";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'ExamResize | Resize Photos & Signatures for Forms',
  description: 'Instantly Convert Photos & Documents for Exam Forms. Optimize file size, dimensions, and format for SSC, UPSC, Banking, and other exams.',
  keywords: ['exam photo resizer', 'signature resize', 'ssc photo resize', 'upsc photo resize', 'banking exam photo converter', '20kb photo converter', '50kb photo converter'],
  authors: [{ name: 'ExamResize' }],
  openGraph: {
    title: 'ExamResize | Resize Photos & Signatures for Forms',
    description: 'Instantly Convert Photos & Documents for Exam Forms. Optimize file size, dimensions, and format for SSC, UPSC, Banking, and other exams.',
    url: 'https://examresize.online',
    siteName: 'ExamResize',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://examresize.online',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ExamResize | Resize Photos & Signatures for Forms',
    description: 'Instantly Convert Photos & Documents for Exam Forms. Optimize file size, dimensions, and format for SSC, UPSC, Banking, and other exams.',
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
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: "/apple-touch-icon.png"
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6489750582616731"
          crossOrigin="anonymous"
        ></script>
        {/* Google Analytics Placeholder */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
