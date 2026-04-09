'use client';

import { useEffect } from 'react';

type AdBannerProps = {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
  className?: string;
};

export default function AdBanner({
  dataAdSlot,
  dataAdFormat = 'auto',
  dataFullWidthResponsive = true,
  className = '',
}: AdBannerProps) {
  useEffect(() => {
    // Check if we already pushed for this specific instance
    let pushed = false;
    
    const timeoutId = setTimeout(() => {
      if (pushed) return;
      
      try {
        // @ts-ignore
        const adsbygoogle = window.adsbygoogle || [];
        
        // If adsbygoogle is not available (e.g. blocked by adblocker), we can't do much
        // but we've already rendered the <ins> tag.
        if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
          (window as any).adsbygoogle.push({});
          pushed = true;
        }
      } catch (err: any) {
        // Only log if it's not the "already have ads" error which is common in React/Next.js
        if (err.message && !err.message.includes('already have ads')) {
          console.error('AdSense error', err);
        }
      }
    }, 500); // Small delay to ensure DOM is fully ready and avoid race conditions

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // If the client ID or slot ID is not configured/placeholder, show a placeholder for consistency
  const isPlaceholderSlot = dataAdSlot === 'YOUR_AD_SLOT_ID' || !dataAdSlot;
  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || isPlaceholderSlot) {
    return (
      <div className={`w-full max-w-4xl mx-auto bg-slate-100 border border-slate-200 rounded-lg h-24 flex items-center justify-center text-slate-400 text-sm ${className}`}>
        {isPlaceholderSlot && process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID 
          ? 'AdSense Slot ID not configured' 
          : 'Advertisement Space (Google AdSense)'}
      </div>
    );
  }

  return (
    <div className={`w-full overflow-hidden flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: '90px' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
      />
    </div>
  );
}
