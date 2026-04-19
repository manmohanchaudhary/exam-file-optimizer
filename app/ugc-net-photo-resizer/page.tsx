import LandingPageTemplate from '@/components/LandingPageTemplate';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'UGC NET Photo Resizer 2026 – Resize as per NTA Specs | ExamResize',
  description: 'Resize your photo & signature for UGC NET 2026 application instantly. Meets NTA specs: photo 10KB–200KB, signature 4KB–30KB. Free, fast & accurate.',
  alternates: {
    canonical: 'https://examresize.online/ugc-net-photo-resizer',
  },
  openGraph: {
    title: 'UGC NET Photo Resizer 2026 – Free Tool by ExamResize',
    description: 'Instantly resize your photo and signature as per NTA\'s UGC NET official specs. No signup needed.',
    url: 'https://examresize.online/ugc-net-photo-resizer',
    images: [
      {
        url: 'https://examresize.online/og/ugc-net-tool.png',
        width: 1200,
        height: 630,
        alt: 'UGC NET Photo Resizer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UGC NET Photo Resizer 2026 – Free Tool by ExamResize',
    description: 'Instantly resize your photo and signature as per NTA\'s UGC NET official specs. No signup needed.',
    images: ['https://examresize.online/og/ugc-net-tool.png'],
  },
};

export default function UGCNetPhotoResizer() {
  return (
    <>
      <LandingPageTemplate
        title="UGC NET Photo & Signature Resizer – Free Online Tool for 2026 Application"
        description="Applying for UGC NET June 2026? Don't let a photo upload error reject your application. ExamResize automatically resizes your photograph to 10KB–200KB and your signature to 4KB–30KB, exactly as required by NTA's official UGC-NET Information Bulletin. Works on mobile and desktop. Upload, resize, download — done."
        keyword="UGC NET photo resize"
        initialExamId="ugc-net"
        faqs={[
          {
            q: "What is the photo size requirement for UGC NET 2026 application form?",
            a: "According to NTA's official UGC NET Information Bulletin, the photograph must be between 10 KB and 200 KB in file size. It should be a recent passport-size photo with at least 80% face visible, taken against a white background, with both ears visible. The format must be JPG or JPEG."
          },
          {
            q: "What is the signature size for UGC NET application?",
            a: "The signature file must be between 4 KB and 30 KB in size, in JPG or JPEG format. It should be your own signature on white paper using a black or blue pen, scanned or photographed clearly."
          },
          {
            q: "How do I resize my photo for UGC NET if it's too large?",
            a: "Use ExamResize's free UGC NET Photo Resizer. Upload your photo, and the tool will automatically compress and resize it to fit within the 10 KB–200 KB limit required by NTA. No app download or registration is needed."
          },
          {
            q: "Can I use a selfie for UGC NET application form?",
            a: "No. NTA requires a formal passport-size photograph with a plain white background, 80% face visible including ears, and taken in good lighting. A casual selfie is likely to get rejected. Use ExamResize to check and resize your photo after clicking it properly."
          },
          {
            q: "What happens if my photo is rejected on the NTA portal?",
            a: "If your photo or signature doesn't meet the file size or format specifications, the NTA portal will show an error and prevent you from completing your application. You'll need to resize and re-upload. ExamResize ensures your file is within the accepted range before you upload."
          },
          {
            q: "Is ExamResize free to use for UGC NET photo resizing?",
            a: "Yes, completely free. There is no registration, no subscription, and no hidden fee. Simply upload your photo or signature, download the resized version, and upload it to the NTA portal."
          },
          {
            q: "What is the last date for UGC NET June 2026 application form?",
            a: "Based on the trend from past cycles, the UGC NET June 2026 application form is expected to open approximately in March–April 2026. The exact dates will be announced on the official NTA website at ugcnet.nta.nic.in. Based on current Google search trends, aspirants are already searching for \"ugc net june 2026 application form last date\" — bookmark ExamResize to stay ready."
          },
          {
            q: "Does ExamResize store my photo or personal files?",
            a: "No. ExamResize processes all files directly in your browser. No image, document, or personal data is transmitted to or stored on our servers."
          },
          {
            q: "Can I use this tool on my mobile phone?",
            a: "Yes. ExamResize is fully mobile-responsive. You can upload your photo directly from your phone gallery, resize it, and download the result — all without a laptop."
          },
          {
            q: "I need to resize a photo for UGC NET revised answer key or result form. Does this help?",
            a: "If you're re-uploading or re-applying after checking the UGC NET revised result or revised answer key, you may need to resubmit documents. ExamResize ensures your photo and signature always meet NTA's exact specifications."
          }
        ]}
        relatedTools={[
          { title: "CUET Photo Resizer", link: "/exam-photo-size-converter", desc: "For Central University admissions." },
          { title: "NEET Photo Resizer", link: "/exam-photo-size-converter", desc: "For medical entrance exams." },
          { title: "JEE Main Photo Resizer", link: "/exam-photo-size-converter", desc: "For engineering entrance." },
          { title: "SSC Photo Resizer", link: "/photo-resize-for-ssc-form", desc: "SSC CGL and CHSL uploads." },
          { title: "UPSC Photo Resizer", link: "/exam-photo-size-converter", desc: "UPSC standard documents." },
          { title: "CSIR NET Photo Resizer", link: "/exam-photo-size-converter", desc: "Trending for June 2026 applications." }
        ]}
      >

        {/* Badges Section */}
        <section className="mb-12 mt-4 max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center items-center text-sm font-medium text-slate-700">
            <span className="bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200">
              ✅ Official Spec Compliant (Based on NTA UGC-NET Information Bulletin)
            </span>
            <span className="bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full border border-blue-200">
              ⚡ Instant Under 5s
            </span>
            <span className="bg-slate-100 text-slate-800 px-3 py-1.5 rounded-full border border-slate-200">
              🔒 Privacy Safe
            </span>
            <span className="bg-purple-50 text-purple-800 px-3 py-1.5 rounded-full border border-purple-200">
              🆓 Free
            </span>
            <span className="bg-orange-50 text-orange-800 px-3 py-1.5 rounded-full border border-orange-200">
              📱 Mobile Friendly
            </span>
          </div>
          
          <div className="text-center mt-8">
            <Link href="#how-it-works" className="inline-block mt-4 text-emerald-600 hover:text-emerald-700 font-medium underline underline-offset-4">
              Check NTA Photo Requirements
            </Link>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white" id="how-it-works">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">How to Resize Your UGC NET Photo in 3 Steps</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center text-left">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 border border-emerald-200">1</div>
                <h3 className="font-bold text-slate-900 mb-2">Upload Your Photo</h3>
                <p className="text-slate-600 text-sm">Click &quot;Upload Photo&quot; and select your photograph or signature from your phone or computer. Accepted formats: JPG, JPEG, PNG.</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 border border-emerald-200">2</div>
                <h3 className="font-bold text-slate-900 mb-2">Auto-Resize to NTA Specs</h3>
                <p className="text-slate-600 text-sm">Our tool automatically detects whether you&apos;re uploading a photo or signature and resizes it to match NTA&apos;s official UGC NET requirements — no manual settings needed.</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 border border-emerald-200">3</div>
                <h3 className="font-bold text-slate-900 mb-2">Download & Upload</h3>
                <p className="text-slate-600 text-sm">Download your resized file and directly upload it at ugcnet.nta.nic.in during your application. Done in under a minute.</p>
              </div>
            </div>
          </div>
        </section>

        {/* NTA Requirements Summary */}
        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Official NTA Photo & Signature Requirements for UGC NET 2026</h2>
            <p className="text-slate-600 text-center mb-10 leading-relaxed max-w-3xl mx-auto">
              The following specifications are taken directly from the official UGC-NET December 2025 Information Bulletin published by the National Testing Agency (NTA). These remain the governing standards for UGC NET June 2026 applications as well.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4 text-xl border-b pb-2">Photograph</h3>
                <table className="w-full text-sm text-left text-slate-600">
                  <tbody>
                    <tr className="border-b border-slate-100"><td className="py-3 font-semibold w-1/3">File Size</td><td className="py-3">10 KB – 200 KB</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-3 font-semibold">Format</td><td className="py-3">JPG / JPEG</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-3 font-semibold">Background</td><td className="py-3">White background only</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-3 font-semibold">Face Visibility</td><td className="py-3">Minimum 80% face visible (without mask)</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-3 font-semibold">Colour</td><td className="py-3">Colour or Black & White</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-3 font-semibold">Ears</td><td className="py-3">Both ears must be visible</td></tr>
                    <tr><td className="py-3 font-semibold">Photo Type</td><td className="py-3">Recent passport-size photograph</td></tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4 text-xl border-b pb-2">Signature</h3>
                <table className="w-full text-sm text-left text-slate-600">
                  <tbody>
                    <tr className="border-b border-slate-100"><td className="py-3 font-semibold w-1/3">File Size</td><td className="py-3">4 KB – 30 KB</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-3 font-semibold">Format</td><td className="py-3">JPG / JPEG</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-3 font-semibold">Background</td><td className="py-3">White background</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-3 font-semibold">Ink</td><td className="py-3">Black or blue pen on white paper</td></tr>
                    <tr><td className="py-3 font-semibold">Content</td><td className="py-3">Candidate&apos;s own signature only</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl">
              <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">
                <span className="text-2xl">⚠️</span> Common Rejection Reasons
              </h4>
              <ul className="list-disc pl-5 text-red-700 space-y-1 mt-3">
                <li>Photo background is not white</li>
                <li>File size exceeds 200 KB or is below 10 KB</li>
                <li>Face is less than 80% visible or obscured by mask/hat</li>
                <li>Scanned selfie or ID photo used instead of proper passport photo</li>
                <li>Signature file exceeds 30 KB</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Trending Intents Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Also Useful For These UGC NET 2026 Tasks</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-1">UGC NET Application Form 2026</h4>
                <p className="text-slate-600 text-sm">When the UGC NET 2026 form opens, photo upload is one of the first steps. Get your photo ready in advance.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-1">UGC NET June 2026 Application Form</h4>
                <p className="text-slate-600 text-sm">Searches for June 2026 applications are up 120%+ in India. Don&apos;t scramble at the last minute — resize now.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-1">UGC NET Revised Result Dec 2025</h4>
                <p className="text-slate-600 text-sm">If you&apos;re applying again after checking your revised result, your documents must still meet current NTA specs.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-1">UGC NET Registration</h4>
                <p className="text-slate-600 text-sm">First-time registrants often get stuck at the photo upload step. ExamResize makes it error-free.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-1">NTA UGC NET Answer Key Errors</h4>
                <p className="text-slate-600 text-sm">Answer key challenges may require re-login to NTA portal — having your documents pre-resized helps.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="pb-16 pt-8 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs text-slate-500 text-center leading-relaxed">
              Disclaimer: ExamResize is an independent utility tool and is not affiliated with, endorsed by, or connected to the National Testing Agency (NTA), University Grants Commission (UGC), or any Government of India body. All photo and signature specifications referenced on this page are sourced from the official UGC-NET Information Bulletin published by NTA. Candidates are advised to verify current requirements at ugcnet.nta.nic.in before submitting their application.
            </p>
          </div>
        </section>

      </LandingPageTemplate>
    </>
  );
}
