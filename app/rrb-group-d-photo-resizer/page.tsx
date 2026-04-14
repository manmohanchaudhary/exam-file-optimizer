import LandingPageTemplate from '@/components/LandingPageTemplate';
import { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'RRB Group D Photo Resizer | Exact Image Size & Dimensions',
  description: 'Resize your signature for the RRB Group D exam. Get the exact 140x60 pixels and 30KB-49KB file size required for Railway Group D applications.',
  alternates: {
    canonical: '/rrb-group-d-photo-resizer',
  },
};

export default function RRBGroupDPhotoResize() {
  return (
    <LandingPageTemplate
      title="RRB Group D Signature Resizer"
      description="Easily resize and compress your signature for the RRB Group D exam. Get the exact 140x60 pixels and 30KB-49KB size required for RRB Group D applications."
      keyword="RRB Group D signature resizer"
      initialExamId="rrb-group-d"
      faqs={[
        {
          q: 'What is the RRB Group D photo size and dimensions?',
          a: 'For RRB Group D / Level 1, the photo is NOT uploaded normally. It must be captured via live capture (webcam or app flow) during the application process.'
        },
        {
          q: 'What is the RRB Group D signature size?',
          a: 'Your signature for RRB Group D must be between 30 KB and 49 KB, with minimum dimensions of 140 x 60 pixels.'
        },
        {
          q: 'What format is accepted for RRB Group D uploads?',
          a: 'Only JPG and JPEG formats are accepted for signature uploads on the RRB Group D portal. Documents must be in PDF format.'
        },
        {
          q: 'What is the maximum document size for RRB Group D?',
          a: 'If you need to upload any PDF documents (like caste certificates), the maximum allowed file size is 500 KB.'
        },
        {
          q: 'What are common mistakes that lead to signature rejection?',
          a: 'Common rejection reasons include using block/capital letters, signing with a color other than black, or uploading a blurry/unclear signature.'
        }
      ]}
      relatedTools={[
        {
          title: 'RRB Photo Size Hub',
          link: '/rrb-photo-resizer',
          desc: 'View requirements and tools for all Railway Recruitment Board (RRB) exams.'
        },
        {
          title: 'RRB NTPC Photo Resizer',
          link: '/rrb-ntpc-photo-resizer',
          desc: 'Resize your photo and signature specifically for the RRB NTPC exam.'
        },
        {
          title: 'RRB ALP Photo Resizer',
          link: '/rrb-alp-photo-resizer',
          desc: 'Format your photo and signature for the RRB Assistant Loco Pilot (ALP) exam.'
        }
      ]}
    >
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">RRB Group D Official Photo & Signature Requirements</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Photo Requirements</h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Important:</strong> For Group D / Level 1, the photo is <strong>not uploaded normally</strong>.</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Method:</strong> It is captured via live capture (webcam or app flow) during the application process.</span></li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Signature Requirements</h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Dimensions:</strong> Minimum 140 × 60 pixels</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>File Size:</strong> 30 KB to 49 KB</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Format:</strong> JPG / JPEG only</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Style:</strong> Sign on plain white paper with black ink using running handwriting. Do not use block/capital letters.</span></li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Document Requirements (if applicable)</h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Format:</strong> PDF only</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>File Size:</strong> Maximum 500 KB</span></li>
            </ul>
          </div>
        </div>
      </section>
    </LandingPageTemplate>
  );
}
