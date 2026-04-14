import LandingPageTemplate from '@/components/LandingPageTemplate';
import { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'RRB ALP Photo Resizer | Exact Image Size & Dimensions',
  description: 'Resize your photo and signature for the RRB ALP (Assistant Loco Pilot) exam. Get the exact 240x320 pixels and 30KB-70KB file size required for Railway ALP applications.',
  alternates: {
    canonical: '/rrb-alp-photo-resizer',
  },
};

export default function RRBALPPhotoResize() {
  return (
    <LandingPageTemplate
      title="RRB ALP Photo Resizer"
      description="Easily resize and compress your photo for the RRB ALP exam. Get the exact 240x320 pixels and 30KB-70KB size required for RRB ALP applications."
      keyword="RRB ALP photo resizer"
      initialExamId="rrb-alp"
      faqs={[
        {
          q: 'What is the RRB ALP photo size and dimensions?',
          a: 'For the RRB ALP exam, your photo must be between 30 KB and 70 KB in size. The exact dimensions required are 240(W) x 320(H) pixels.'
        },
        {
          q: 'What is the RRB ALP signature size?',
          a: 'Your signature for RRB ALP must be between 30 KB and 70 KB, with minimum dimensions of 140 x 60 pixels.'
        },
        {
          q: 'What background is allowed for RRB ALP photo?',
          a: 'A plain white or very light-colored background is strictly required for your RRB ALP passport-size photo.'
        },
        {
          q: 'What format is accepted for RRB ALP uploads?',
          a: 'Only JPG and JPEG formats are accepted for both photo and signature uploads on the RRB ALP portal. Documents must be in PDF format.'
        },
        {
          q: 'What is the maximum document size for RRB ALP?',
          a: 'If you need to upload any PDF documents (like caste certificates), the maximum allowed file size is 500 KB.'
        },
        {
          q: 'What are common mistakes that lead to photo rejection?',
          a: 'Common rejection reasons include wearing a cap or tinted sunglasses, having a dark or busy background, uploading a selfie, or having a blurry/unclear face.'
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
          title: 'RRB Group D Photo Resizer',
          link: '/rrb-group-d-photo-resizer',
          desc: 'Get the exact photo and signature size required for RRB Group D applications.'
        }
      ]}
    >
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">RRB ALP Photo & Signature Requirements</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Photo Requirements</h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Dimensions:</strong> 240(W) × 320(H) pixels</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>File Size:</strong> 30 KB to 70 KB</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Format:</strong> JPG / JPEG only</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Background:</strong> Plain white or very light-colored background</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Style:</strong> Clear front view, neutral expression. No cap, no mask, no tinted sunglasses. Must not be a selfie.</span></li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Signature Requirements</h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>Dimensions:</strong> Minimum 140 × 60 pixels</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span><strong>File Size:</strong> 30 KB to 70 KB</span></li>
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
