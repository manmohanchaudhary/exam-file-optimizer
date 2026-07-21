import LandingPageTemplate from '@/components/LandingPageTemplate';
import { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free III Exam Photo & Signature Resizer | ExamResize',
  description: 'Easily crop and resize your photo and signature to exact Insurance Institute of India (III) guidelines (.jpg, under 25 KB).',
  alternates: {
    canonical: '/iii-exam-photo-signature-resizer',
  },
};

export default function IIIExamPhotoResize() {
  return (
    <LandingPageTemplate
      title="Free III Exam Photo & Signature Resizer"
      description="Crop and resize to exact III guidelines (.jpg, under 25 KB)."
      keyword="III Exam photo resizer & signature resize"
      initialExamId="iii"
      toolHelperText={
        <p>Tool supports <strong>III photo resize</strong> and <strong>III signature resize</strong> exactly to the specified dimensions and size limit.</p>
      }
      faqs={[
        {
          q: 'What is the required III exam photo and signature size?',
          a: 'For III exams, your photograph must be under 25 KB with dimensions of 133x152 pixels. The signature must also be under 25 KB, with dimensions of 152x140 pixels.'
        },
        {
          q: 'What format should the images be in?',
          a: 'Both the photograph and the signature must be in .jpg or .jpeg format.'
        }
      ]}
      relatedTools={[
        {
          title: "IBPS Photo Resizer",
          link: "/ibps-photo-resizer",
          desc: "Resize photos for banking exams."
        },
        {
          title: "UPSC Photo Resizer",
          link: "/upsc-photo-resizer",
          desc: "Format images for UPSC civil services."
        }
      ]}
    >
      <div className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
          III Exam Photo & Signature Guidelines
        </h2>
        <div className="text-slate-600 space-y-6">
          <p className="text-lg">
            When applying for exams conducted by the Insurance Institute of India (III), you must upload a photograph and signature that strictly adhere to their specified guidelines.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" /> Photograph Rules
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                  <span><strong>Format:</strong> .jpg or .jpeg only</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                  <span><strong>Maximum Size:</strong> 25 KB</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                  <span><strong>Dimensions:</strong> 133 pixels width x 152 pixels height</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                  <span><strong>Quality:</strong> Clear and recent passport-style photo</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" /> Signature Rules
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                  <span><strong>Format:</strong> .jpg or .jpeg only</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                  <span><strong>Maximum Size:</strong> 25 KB</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                  <span><strong>Dimensions:</strong> 152 pixels width x 140 pixels height</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                  <span><strong>Quality:</strong> Sign clearly with a black or dark blue pen on white paper</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </LandingPageTemplate>
  );
}
