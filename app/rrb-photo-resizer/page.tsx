import LandingPageTemplate from '@/components/LandingPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RRB Photo Resizer | Exact Size & KB Converter for Railway Exams',
  description: 'Resize your photo and signature for Railway RRB exams (NTPC, Group D, ALP). Get the exact 320x240 pixels and 30KB-70KB file size required for RRB applications.',
  alternates: {
    canonical: '/rrb-photo-resizer',
  },
};

export default function RRBPhotoResize() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://examresize.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": "https://examresize.online/#how-it-works"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "RRB Photo Resizer",
        "item": "https://examresize.online/rrb-photo-resizer"
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LandingPageTemplate
        title="RRB Photo Size Hub"
      description="Easily resize and compress your photo for all Railway Recruitment Board (RRB) exams. Get the exact 320x240 pixels and 30KB-70KB size required for RRB applications."
      keyword="RRB photo resizer"
      initialExamId="rrb"
      faqs={[
        {
          q: 'What is the required RRB photo size?',
          a: 'The Railway Recruitment Board (RRB) requires uploaded photos to be between 30KB and 70KB in size, with dimensions of 320x240 pixels (or 35x45 mm) in JPEG/JPG format.'
        },
        {
          q: 'What is the RRB signature size?',
          a: 'The RRB signature size must be between 30KB and 70KB, with dimensions of 140x60 pixels in JPEG/JPG format.'
        },
        {
          q: 'What background is allowed for RRB photo?',
          a: 'RRB strictly requires a plain white or light-colored background for your passport-size photo. Photos with dark or busy backgrounds may be rejected.'
        },
        {
          q: 'Can I use a selfie for RRB form?',
          a: 'No. Selfies are strictly prohibited and will lead to the rejection of your application. Ensure a straight-facing, professionally clicked photo.'
        },
        {
          q: 'What format is accepted for RRB uploads?',
          a: 'Only JPG and JPEG formats are accepted for both photo and signature uploads on the RRB portal.'
        },
        {
          q: 'What if my file is larger than the limit?',
          a: 'If your file is larger than 70KB, you can use our RRB photo resizer tool to automatically compress it to the required size without losing clarity.'
        }
      ]}
      relatedTools={[
        {
          title: 'RRB NTPC Photo Resizer',
          link: '/rrb-ntpc-photo-resizer',
          desc: 'Resize your photo and signature specifically for the RRB NTPC exam.'
        },
        {
          title: 'RRB ALP Photo Resizer',
          link: '/rrb-alp-photo-resizer',
          desc: 'Format your photo and signature for the RRB Assistant Loco Pilot (ALP) exam.'
        },
        {
          title: 'RRB Group D Photo Resizer',
          link: '/rrb-group-d-photo-resizer',
          desc: 'Get the exact photo and signature size required for RRB Group D applications.'
        }
      ]}
    >
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">RRB Photo & Signature Requirements Summary</h2>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Document Type</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Dimensions (Pixels)</th>
                  <th scope="col" className="px-6 py-4 font-semibold">File Size (KB)</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Format</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="px-6 py-4 font-medium text-slate-900">Passport Photo</td>
                  <td className="px-6 py-4">240(W) x 320(H) px</td>
                  <td className="px-6 py-4">30 KB - 70 KB</td>
                  <td className="px-6 py-4">JPG / JPEG</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-6 py-4 font-medium text-slate-900">Signature</td>
                  <td className="px-6 py-4">Min 140 x 60 px</td>
                  <td className="px-6 py-4">30 KB - 70 KB*</td>
                  <td className="px-6 py-4">JPG / JPEG</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-900">SC/ST Certificate (PDF)</td>
                  <td className="px-6 py-4">N/A</td>
                  <td className="px-6 py-4">Up to 500 KB</td>
                  <td className="px-6 py-4">PDF</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-500 mt-4 text-center">
            *Note: Group D signature size is 30 KB - 49 KB. Group D photo is captured via webcam, not uploaded. Always verify with the latest official notification.
          </p>
        </div>
      </section>
    </LandingPageTemplate>
    </>
  );
}
